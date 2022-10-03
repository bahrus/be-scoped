import { define } from 'be-decorated/be-decorated.js';
import { register } from "be-hive/register.js";
export class BeScoped {
    async intro(proxy, self) {
        const { PropertyBag } = await import('trans-render/lib/PropertyBag.js');
        const pg = new PropertyBag();
        proxy.scope = pg.proxy;
        proxy.resolved = true;
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
            intro: 'intro'
        }
    },
    complexPropDefaults: {
        controller: BeScoped,
    }
});
register(ifWantsToBe, upgrade, tagName);
