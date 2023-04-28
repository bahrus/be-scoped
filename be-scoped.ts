import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP} from './types';
import {register} from 'be-hive/register.js';

export class BeScoped extends BE<AP, Actions> implements Actions{

    static  override get beConfig(){
        return {
            parse: true,
            primaryPropReq: true,
            primaryProp: 'assign'
        } as BEConfig
    }
    async hydrate(self: this): ProPAP {
        const {assign, enhancedElement} = self;
        if(assign instanceof Object){
            delete assign.scope;
        }
        const {CtxNav} = await import('trans-render/lib/CtxNav.js');
        const nav = new CtxNav(enhancedElement);
        const scope = nav.beScoped;
        Object.assign(scope!, assign);
        return {
            scope,
            nav,
            resolved: true,
        } as PAP;     
    }
}

export interface BeScoped extends AllProps{}

const tagName = 'be-scoped';
const ifWantsToBe = 'scoped';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config:{
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