import { BeHive } from 'be-hive/be-hive.js';
import { MountObserver } from 'mount-observer/MountObserver.js';
const base = 'be-scoped';
export const emc = {
    base,
    map: {
        '0.0': {
            instanceOf: 'Object',
            mapsTo: 'assign'
        }
    },
    enhPropKey: 'beScoped',
    importEnh: async () => {
        const { BeScoped } = await import('./behance.js');
        return BeScoped;
    }
};
const mose = document.createElement('script');
mose.id = base;
mose.synConfig = emc;
MountObserver.synthesize(document, BeHive, mose);
