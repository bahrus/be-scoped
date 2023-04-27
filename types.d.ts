//import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
//import {IScopeNavigator} from 'trans-render/lib/types';
import {IBE} from 'be-enhanced/types';
import { ICtxNav } from 'trans-render/lib/types';

export interface EndUserProps extends IBE{
    assign?: any;
}

export interface AllProps extends EndUserProps{
    scope: EventTarget;
    isC: boolean;
    nav: ICtxNav;
}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>

export interface Actions{
    hydrate(self: this): ProPAP;
}