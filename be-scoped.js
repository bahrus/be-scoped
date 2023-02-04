import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeScoped extends EventTarget {
    async createScope(pp) {
        const { assign, self } = pp;
        delete assign.scope;
        const { ScopeNavigator } = await import('trans-render/lib/ScopeNavigator.js');
        const nav = new ScopeNavigator(self);
        const scope = nav.scope;
        Object.assign(scope, assign);
        return {
            scope,
            nav,
            resolved: true,
        };
    }
}
const tagName = 'be-scoped';
const ifWantsToBe = 'scoped';
const upgrade = '*';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            virtualProps: ['assign', 'scope', 'nav', 'isC'],
            primaryProp: 'assign',
            primaryPropReq: true,
            proxyPropDefaults: {
                isC: true,
            }
        },
        actions: {
            createScope: {
                ifAllOf: ['isC'],
                ifNoneOf: ['scope'],
            }
        }
    },
    complexPropDefaults: {
        controller: BeScoped,
    }
});
register(ifWantsToBe, upgrade, tagName);
