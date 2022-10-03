import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy} from './types';

export class BeScoping implements Actions{
    async intro(proxy: Proxy, self: Element){
        const {PropertyBag} = await import('trans-render/lib/PropertyBag.js');
        const pg = new PropertyBag();
        proxy.scope = pg.proxy;
        proxy.resolved = true;
    }
}

const tagName = 'be-scoping';

const ifWantsToBe = 'scoping';

const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            upgrade,
            ifWantsToBe,
            intro: 'intro'
        }
    },
    complexPropDefaults:{
        controller: BeScoping,
    }
});

register(ifWantsToBe, upgrade, tagName);