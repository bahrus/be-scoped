import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps{
    assign: any;
}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    scope: EventTarget;
}

export type Proxy = HTMLScriptElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export interface Actions{
    init(pp: PP): Promise<PPP>;
}