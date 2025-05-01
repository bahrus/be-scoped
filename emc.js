// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP, AllProps, AP} from './ts-refs/be-scoped/types' */;

/**
 * @type {EMC<any, AP>}
 */
export const emc = {
    base: 'be-scoped',
    map:  {
        '0.0': {
            instanceOf: 'String',
            mapsTo: 'names',
        }
    },
    enhPropKey: 'beScoped',
    importEnh: async () => {
        const { BeScoped } = 
        /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./be-scoped.js'));
        return BeScoped;
    }
};