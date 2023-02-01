import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeScoped extends EventTarget {
    async init(pp) {
        const { PropertyBag } = await import('trans-render/lib/PropertyBag.js');
        const pg = new PropertyBag();
        const { assign, self } = pp;
        Object.assign(pg.proxy, assign);
        self.setAttribute('itemscope', '');
        return {
            scope: pg.proxy,
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
            virtualProps: ['assign'],
            proxyPropDefaults: {
                assign: {},
            }
        },
        actions: {
            init: 'assign',
        }
    },
    complexPropDefaults: {
        controller: BeScoped,
    }
});
register(ifWantsToBe, upgrade, tagName);
