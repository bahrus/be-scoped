// @ts-check
import { propInfo, rejected, resolved } from 'be-enhanced/cc.js';
import { BE } from 'be-enhanced/BE.js';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-scoped/types' */;

//const sym = Symbol.for('q9jJhtnAZEaOOLZ0+b8cLA');
/**
 * @implements {Actions}
 * 
 */
class BeScoped extends BE {

    /**
     * @type {BEConfig<AP & BEAllProps, Actions & IEnhancement>}
     */
    static config = {
        propInfo:{
            names: {},
            parsedNames: {},
            emc: {},
        },
        compacts:{
            when_names_changes_call_parse: 0,
            when_parsedNames_changes_call_hydrate: 0,
        },
        positractions: [resolved, rejected],
    }

    de = de;

    /**
     * 
     * @param {AP & BEAllProps} self 
     * @returns 
     */
    async parse(self) {
        const {splitRefs} = await import('mount-observer/refid/splitRefs.js');
        const { names } = self;
        const parsedNames = splitRefs(names);
        return /** @type {PAP}*/({
            parsedNames
        });
    }

    /**
     * 
     * @param {AP & BEAllProps} self 
     * @returns 
     */
    async hydrate(self) {
        const {upSearch} = await import('trans-render/lib/upSearch.js');
        const {getCount} = await import('trans-render/dss/tref/getCount.js');
        const { parsedNames, enhancedElement, emc } = self;
        const {base} = emc;
        for(const name of parsedNames) {
            const cssQuery = `[itemscope="${name}"]`;
            const el = upSearch(enhancedElement, cssQuery);
            if(!el){
                throw 404;
            }
            if(!enhancedElement.id){
                enhancedElement.id = `${base}-${getCount(base + '')}`;
            }
            let itemref = el.getAttribute('itemref') || '';
            itemref += ' ' + enhancedElement.id;
            el.setAttribute('itemref', itemref.trim());
        }
        return /** @type {PAP}*/({
            resolved: true,
        });
    }
    retire(self) {
        throw new Error('Method not implemented.');
    }
}

await BeScoped.bootUp();
export { BeScoped };
export default BeScoped;