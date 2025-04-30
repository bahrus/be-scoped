import {BeHive, EMC, MountObserver, seed} from 'be-hive/be-hive.js';

export const emc: EMC = {
    base: 'be-scoped',
    map: {
        '0.0': {
            instanceOf: 'Object',
            mapsTo: 'assign'
        }
    },
    enhPropKey: 'beScoped',
    importEnh: async () => {
        const {BeScoped} = await import('./be-scoped.js');
        return BeScoped;
    }
};

const mose = seed(emc);

MountObserver.synthesize(document, BeHive, mose);



