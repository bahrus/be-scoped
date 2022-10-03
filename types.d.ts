import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps{

}

export interface VirtualProps extends EndUserProps, MinimalProxy{
    scope: EventTarget;
}

export type Proxy = HTMLScriptElement & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy
}

export type PP = ProxyProps;

export interface Actions{
    intro(proxy: Proxy, self: Element): void;
}