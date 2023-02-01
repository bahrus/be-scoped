import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP} from './types';

export class BeScoped extends EventTarget implements Actions{

    async init(pp: PP): Promise<PPP>{
        const {PropertyBag} = await import('trans-render/lib/PropertyBag.js');
        const pg = new PropertyBag();
        const {assign, self} = pp;
        Object.assign(pg.proxy, assign);
        self.setAttribute('itemscope', '');
        return {
            scope: pg.proxy,
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
            virtualProps: ['assign'],
            proxyPropDefaults: {
                assign: {},
            }
        },
        actions: {
            init: 'assign',
        }
    },
    complexPropDefaults:{
        controller: BeScoped,
    }
});

register(ifWantsToBe, upgrade, tagName);