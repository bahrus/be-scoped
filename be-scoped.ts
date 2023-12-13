import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP} from './types';
import {register} from 'be-hive/register.js';
import {PropertyBag} from 'trans-render/lib/PropertyBag.js';

export class BeScoped extends BE<AP, Actions> implements Actions{

    static  override get beConfig(){
        return {
            parse: true,
            primaryPropReq: true,
            primaryProp: 'assign',
            stateProp: 'scope'
        } as BEConfig<AP>
    }
    async hydrate(self: this): ProPAP {
        const {assign, enhancedElement} = self;
        if(assign instanceof Object){
            delete assign.scope;
        }
        //const {CtxNav} = await import('trans-render/lib/CtxNav.js');
        //const nav = new CtxNav(enhancedElement);
        const pg = new PropertyBag();
        const scope = pg.proxy;
        //const scope = nav.beScoped;
        if(assign instanceof Object){
            this.#skipInitAssign = true;
            Object.assign(scope!, assign);
        }
        
        return {
            scope,
            //nav,
            resolved: true,
        } as PAP;     
    }
    #skipInitAssign = false;
    onAssign(self: this){
        if(this.#skipInitAssign){
            this.#skipInitAssign = false;
            return;
        }
        const {assign, scope} = self;
        Object.assign(scope, assign); 
    }

    #previousTS = new Map<string, string | number>();
    setKeyVal(key: string, val: any, tsKey  = 'timestamp'){
        switch(typeof val){
            case 'object':
                if(Array.isArray(val)){
                    throw 'NI';
                }
                const ts = val[tsKey];
                if(ts !== undefined){
                    if(this.#previousTS.has(key) && this.#previousTS.get(key) === ts) return;
                    this.#previousTS.set(key, ts);
                }
                if(!val._isPropagating){
                    //const {PropertyBag} = await import('trans-render/lib/PropertyBag.js');
                    const pg = new PropertyBag();
                    const proxy = pg.proxy;
                    Object.assign(proxy, val);
                    (<any>this.scope)[key] = val;
                }else{
                    Object.assign((<any>this.scope)[key], val);
                }

                break;
            default:{
                (<any>this.scope)[key] = val;
            }
        }
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
            isC: true
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            hydrate: 'isC',
            onAssign: {
                ifAllOf: ['assign', 'resolved']
            },
        }
    },
    superclass: BeScoped
});

register(ifWantsToBe, upgrade, tagName);