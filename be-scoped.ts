import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP} from './types';

export class BeScoped extends EventTarget implements Actions{

    async createScope(pp: PP): Promise<PPP>{
        const {assign, self} = pp;
        delete assign.scope;
        const {ScopeNavigator} = await import('trans-render/lib/ScopeNavigator.js');
        const nav = new ScopeNavigator(self);
        const scope = nav.scope;
        Object.assign(scope!, assign);
        return {
            scope,
            nav,
            resolved: true,
        } as PPP;
    }

}

const tagName = 'be-scoped';

const ifWantsToBe = 'scoped';

const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            virtualProps: ['assign', 'scope', 'nav'],
            primaryProp: 'assign',
            primaryPropReq: true,
            proxyPropDefaults: {
                assign: {},
            }
        },
        actions: {
            createScope:{
                ifAllOf: ['assign'],
                ifNoneOf: ['scope'],
            }
        }
    },
    complexPropDefaults:{
        controller: BeScoped,
    }
});

register(ifWantsToBe, upgrade, tagName);