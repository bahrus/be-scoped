//import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
//import {IScopeNavigator} from 'trans-render/lib/types';
import {IEnhancement} from 'trans-render/be/types';
import { ICtxNav } from 'trans-render/lib/types';

export interface EndUserProps extends IEnhancement{
    assign?: any;
}

export interface AllProps extends EndUserProps{
    scope: EventTarget & {[key: string]: any};
    attached: boolean;
    nav: ICtxNav;
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>

export interface Actions{
    hydrate(self: this): ProPAP;
    setKeyVal(key: string, val: any, tsKey?: string): void;
    onAssign(self: this): void;
}