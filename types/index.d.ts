// Type definitions for @nuxtjs/auth 4.8
// Project: https://auth.nuxtjs.org
// Definitions by: Ruskin Constant 
//                Daniel Leal 
//                Nick Bolles 
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1

import Vue, { ComponentOptions } from 'vue';

export interface Storage {
  setUniversal(key: string, value: any, isJson?: boolean): string;
  getUniversal(key: string, isJson?: boolean): any;
      syncUniversal(key: string, defaultValue: any, isJson?: boolean): any;
  // Local State
  setState(key: string, val: any): string;
  getState(key: string): string;
  watchState(key: string, handler: (newValue: any) => void): any;
  // Cookies
  setCookie(key: string, val: any, options?: object): any;
  getCookie(key: string, isJson?: boolean): any;
  // Local Storage
  setLocalStorage(key: string, val: any, isJson?: boolean): any;
  getLocalStorage(key: string, isJson?: boolean): any;
}

export interface Auth {
  ctx: any;
  $state: any;
  $storage: Storage;
  user: Partial;
  loggedIn: boolean;
  loginWith(strategyName: string, ...args: any): Promise;
  login(...args: any): Promise;
  logout(): Promise;
  fetchUser(): Promise;
  fetchUserOnce(): Promise;
  hasScope(scopeName: string): boolean;
  setToken(strategyName: string, token?: string): string;
  getToken(strategyName: string): string;
  syncToken(strategyName: string): string;
  onError(handler: (error: Error, name: string, endpoint: any) => void): any;
  setUser(user?: Partial): any;
  reset(): Promise;
  redirect(name: string): any;
}

declare module 'vue/types/options' {
  interface ComponentOptions {
    auth?: boolean | string;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: Auth;
  }
}
