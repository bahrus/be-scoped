import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeScoped extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryPropReq: true,
            primaryProp: 'assign'
        };
    }
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
    #previousTS = new Map();
    async setKeyVal(key, val, tsKey = 'timestamp') {
        switch (typeof val) {
            case 'object':
                if (Array.isArray(val)) {
                    throw 'NI';
                }
                const ts = val[tsKey];
                if (ts !== undefined) {
                    if (this.#previousTS.has(key) && this.#previousTS.get(key) === ts)
                        return;
                    this.#previousTS.set(key, ts);
                }
                if (!val._isPropagating) {
                    const { PropertyBag } = await import('trans-render/lib/PropertyBag.js');
                    const pg = new PropertyBag();
                    const proxy = pg.proxy;
                    Object.assign(proxy, val);
                    this.scope[key] = val;
                }
                else {
                    Object.assign(this.scope[key], val);
                }
                break;
            default: {
                this.scope[key] = val;
            }
        }
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
