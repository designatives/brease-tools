import { BreaseConfig, Page, BreasePageResponse, Collection, BreaseCollectionResponse, Navigation, BreaseNavigationResponse } from "../types/types"

// Symbol for caching the instance on module exports
const INSTANCE_KEY = Symbol.for('brease.instance');

interface GlobalWithSymbol {
  [INSTANCE_KEY]?: {
    instance: Brease;
    config: BreaseConfig;
  };
}

// This pattern ensures a true singleton across module loads
const getGlobalThis = (): GlobalWithSymbol => {
  if (typeof globalThis !== 'undefined') return globalThis as GlobalWithSymbol;
  if (typeof self !== 'undefined') return self as any as GlobalWithSymbol;
  if (typeof window !== 'undefined') return window as any as GlobalWithSymbol;
  if (typeof global !== 'undefined') return global as GlobalWithSymbol;
  throw new Error('Unable to locate global object');
};

export class Brease {
  private readonly token: string
  private readonly apiUrl: string
  private readonly baseEnvironment: string
  private readonly baseProxyUrl: string

  constructor(breaseConfig: BreaseConfig) {
    this.token = breaseConfig.token
    this.apiUrl = breaseConfig?.apiUrl || 'https://api.brease.io/v1'
    this.baseEnvironment = breaseConfig.environment
    this.baseProxyUrl = breaseConfig?.proxyUrl || '/api/brease'
  }

  // Server-side: Direct API call with token
  private async fetchServerData(url: string): Promise<any> {
    const response = await fetch(this.apiUrl + url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
    })
    return await response.json()
  }

  // Client-side: Call the proxy endpoint
  private async fetchClientData(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseProxyUrl}/${endpoint}}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
    }
    return await response.json()
  }

  async getPageByID(pageId: string): Promise<Page> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/pages/${pageId}`
    if (isServer) {
      const response = (await this.fetchServerData(endpoint)) as BreasePageResponse
      if(response.message){
        throw new Error(response.message)
      } else {
        return response.data.page
      }
    } else {
      return await this.fetchClientData(endpoint)
    }
  }

  async getPageBySlug(pageSlug: string, locale?: string): Promise<Page> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale||'en'}&slug=${pageSlug}`
    if (isServer) {
      const response = (await this.fetchServerData(endpoint)) as BreasePageResponse
      if(response.message){
        throw new Error(response.message)
      } else {
        return response.data.page
      }
    } else {
      return await this.fetchClientData(endpoint)
    }
  }

  async getCollection(collectionId: string): Promise<Collection> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}`
    if (isServer) {
      const response = (await this.fetchServerData(endpoint)) as BreaseCollectionResponse
      if(response.message){
        throw new Error(response.message)
      } else {
        return response.data.collection
      }
    } else {
      return await this.fetchClientData(endpoint)
    }
  }

  async getNavigation(navigationId: string): Promise<Navigation> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/navigations/${navigationId}`
    if (isServer) {
      const response = (await this.fetchServerData(endpoint)) as BreaseNavigationResponse
      if(response.message){
        throw new Error(response.message)
      } else {
        return response.data.navigation
      }
    } else {
      return await this.fetchClientData(endpoint)
    }
  }
}

/**
 * Initialize the Brease client.
 * This only needs to be called once in your app's root layout.
 */
export function init(breaseConfig: BreaseConfig): Brease {
  const globalObj = getGlobalThis();
  
  // Create a new instance and store it globally
  const instance = new Brease(breaseConfig);
  
  // Store in a global Symbol registry for better cross-module sharing
  globalObj[INSTANCE_KEY] = {
    instance,
    config: breaseConfig
  };
  
  return instance;
}

/**
 * Get the Brease instance.
 */
export function getInstance(): Brease {
  const globalObj = getGlobalThis();
  const breaseGlobal = globalObj[INSTANCE_KEY];
  
  if (!breaseGlobal?.instance) {
    throw new Error('Brease not initialized. Call init(config) first with your API token and environment.');
  }
  
  return breaseGlobal.instance;
}

export function getPageByID(pageId: string): Promise<Page> {
  return getInstance().getPageByID(pageId);
}

export function getPageBySlug(pageSlug: string, locale?: string): Promise<Page> {
  return getInstance().getPageBySlug(pageSlug, locale);
}

export function getCollection(collectionId: string): Promise<Collection> {
  return getInstance().getCollection(collectionId);
}

export function getNavigation(navigationId: string): Promise<Navigation> {
  return getInstance().getNavigation(navigationId);
}