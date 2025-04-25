import { BreaseConfig, Page, BreasePageResponse, Collection, BreaseCollectionResponse, Navigation, BreaseNavigationResponse } from "../types/types"

const isServer = typeof window === 'undefined';

export class Brease {
  private readonly token: string
  private readonly apiUrl: string
  private readonly baseEnvironment: string
  private readonly baseProxyUrl: string

  constructor(config: BreaseConfig) {
    this.token = config.token
    this.apiUrl = config?.apiUrl || 'https://api.brease.io/v1'
    this.baseEnvironment = config.environment
    this.baseProxyUrl = config?.proxyUrl || '/api/brease'
  }

  // Server-side: Direct API call with token
  private async fetchServerData(url: string): Promise<any> {
    const response = await fetch(this.apiUrl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
    })
    return await response.json()
  }

  // Client-side: Call the proxy endpoint
  private async fetchClientData(endpoint: string, id: string): Promise<any> {
    const response = await fetch(`${this.baseProxyUrl}/${endpoint}?id=${encodeURIComponent(id)}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`)
    }
    return await response.json()
  }

  async getPage(pageId: string): Promise<Page> {
    if (isServer) {
      const response = (await this.fetchServerData(
        `/environments/${this.baseEnvironment}/pages/${pageId}`
      )) as BreasePageResponse
      if(response.message){
        throw new Error(response.message)
      } else {
        return response.data.page
      }
    } else {
      return await this.fetchClientData('page', pageId)
    }
  }

  async getCollection(collectionId: string): Promise<Collection> {
    if (isServer) {
      const response = (await this.fetchServerData(
        `/environments/${this.baseEnvironment}/collections/${collectionId}`
      )) as BreaseCollectionResponse
      if(response.message){
        throw new Error(response.message)
      } else {
        return response.data.collection
      }
    } else {
      return await this.fetchClientData('collection', collectionId)
    }
  }

  async getNavigation(navigationId: string): Promise<Navigation> {
    if (isServer) {
      const response = (await this.fetchServerData(
        `/environments/${this.baseEnvironment}/navigations/${navigationId}`
      )) as BreaseNavigationResponse
      if(response.message){
        throw new Error(response.message)
      } else {
        return response.data.navigation
      }
    } else {
      return await this.fetchClientData('navigation', navigationId)
    }
  }
}

const createBreaseStore = () => {
  let instance: Brease | null = null;
  let currentConfig: BreaseConfig | null = null;
  
  return {
    init: (config: BreaseConfig): Brease => {
      // Always create a new instance if config is different
      const configChanged = !currentConfig || 
        currentConfig.token !== config.token ||
        currentConfig.environment !== config.environment ||
        currentConfig.apiUrl !== config.apiUrl ||
        currentConfig.proxyUrl !== config.proxyUrl;
      
      if (!instance || configChanged) {
        instance = new Brease(config);
        currentConfig = { ...config };
      }
      
      return instance;
    },
    
    getInstance: (): Brease | null => {
      return instance;
    }
  };
};

// Create the store
const breaseStore = createBreaseStore();

/**
 * Initialize the Brease client.
 * Must be called with your API token and environment.
 * If called again with different credentials, it will reinitialize.
 */
export function init(config: BreaseConfig): Brease {
  return breaseStore.init(config);
}

/**
 * Get the Brease instance.
 * Throws an error if not initialized.
 */
export function getInstance(): Brease {
  const instance = breaseStore.getInstance();
  if (!instance) {
    throw new Error('Brease not initialized. Call init(config) first with your API token and environment.');
  }
  return instance;
}

export function getPage(pageId: string): Promise<Page> {
  return getInstance().getPage(pageId);
}

export function getCollection(collectionId: string): Promise<Collection> {
  return getInstance().getCollection(collectionId);
}

export function getNavigation(navigationId: string): Promise<Navigation> {
  return getInstance().getNavigation(navigationId);
}

// Removed all HMR handling code to prevent persistence issues