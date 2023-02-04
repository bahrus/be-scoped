import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {IScopeNavigator} from 'trans-render/lib/types';

export interface EndUserProps{
    assign: any;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    scope: EventTarget;
    nav: IScopeNavigator
}

export type Proxy = HTMLScriptElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export interface Actions{
    createScope(pp: PP): Promise<PPP>;
}