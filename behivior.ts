import {BeHive, EnhancementMountCnfg} from 'be-hive/be-hive.js';
import {MountObserver, MOSE} from 'mount-observer/MountObserver.js';

const base = 'be-scoped';
const emc: EnhancementMountCnfg = {
    base,
    map: {
        '0.0': 'eventName'
    },
    enhPropKey: 'beScoped',
    importEnh: async () => {
        const {BeScoped} = await import('./behance.js');
        return BeScoped;
    }
};

const mose = document.createElement('script') as MOSE<EnhancementMountCnfg>;
mose.id = base;
mose.synConfig = emc;

MountObserver.synthesize(document, BeHive, mose);



