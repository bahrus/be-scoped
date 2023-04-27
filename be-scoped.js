import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeScoped extends BE {
    async hydrate(self) {
        const { assign, enhancedElement } = self;
        if (assign instanceof Object) {
            delete assign.scope;
        }
        const { CtxNav } = await import('trans-render/lib/CtxNav.js');
        const nav = new CtxNav(enhancedElement);
        const scope = nav.beScoped;
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
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
            isC: true
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            hydrate: 'isC'
        }
    },
    superclass: BeScoped
});
register(ifWantsToBe, upgrade, tagName);
