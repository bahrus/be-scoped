import { BE } from 'be-enhanced/BE.js';
import { PropertyBag } from 'trans-render/lib/PropertyBag.js';
export class BeScoped extends BE {
    async hydrate(self) {
        const { assign, enhancedElement } = self;
        if (assign instanceof Object) {
            delete assign.scope;
        }
        //const {CtxNav} = await import('trans-render/lib/CtxNav.js');
        //const nav = new CtxNav(enhancedElement);
        const pg = new PropertyBag();
        const scope = pg.proxy;
        //const scope = nav.beScoped;
        if (assign instanceof Object) {
            this.#skipInitAssign = true;
            Object.assign(scope, assign);
        }
        return {
            scope,
            //nav,
            resolved: true,
        };
    }
    #skipInitAssign = false;
    onAssign(self) {
        if (this.#skipInitAssign) {
            this.#skipInitAssign = false;
            return;
        }
        const { assign, scope } = self;
        Object.assign(scope, assign);
    }
    #previousTS = new Map();
    setKeyVal(key, val, tsKey = 'timestamp') {
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
                    //const {PropertyBag} = await import('trans-render/lib/PropertyBag.js');
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
