import {BeScoped} from './be-scoped.js';
export {BeScoped} from './be-scoped.js';
import {def} from 'trans-render/lib/def.js';

await BeScoped.bootUp();

def('be-a-beacon', BeScoped);