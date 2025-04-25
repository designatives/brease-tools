import { BreaseConfig, Page, BreasePageResponse, Collection, BreaseCollectionResponse, Navigation, BreaseNavigationResponse } from "../types/types"

const isServer = typeof window === 'undefined';

// Store the config in a global variable that can be accessed by both server and client
let globalConfig: BreaseConfig | null = null;
let serverInstance: Brease | null = null;
let clientInstance: Brease | null = null;

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

/**
 * Initialize the Brease client.
 * This only needs to be called once in your app's root layout.
 * The same configuration will be used for both server and client components.
 */
export function init(config: BreaseConfig): Brease {
  // Save the config globally
  globalConfig = config;
  
  if (isServer) {
    // Server-side initialization
    serverInstance = new Brease(config);
    return serverInstance;
  } else {
    // Client-side initialization
    if (!clientInstance) {
      clientInstance = new Brease(config);
    }
    return clientInstance;
  }
}

/**
 * Get the Brease instance.
 * Will auto-initialize with the config if previously initialized in the app.
 */
export function getInstance(): Brease {
  if (isServer) {
    // Server-side: Return the server instance or initialize if needed
    if (!serverInstance && globalConfig) {
      serverInstance = new Brease(globalConfig);
    }
    
    if (!serverInstance) {
      throw new Error('Brease not initialized on server. Call init(config) first in your root layout with your API token and environment.');
    }
    
    return serverInstance;
  } else {
    // Client-side: Return client instance or initialize if config is available
    if (!clientInstance && globalConfig) {
      clientInstance = new Brease(globalConfig);
    }
    
    if (!clientInstance) {
      throw new Error('Brease not initialized on client. Call init(config) first in your root layout with your API token and environment.');
    }
    
    return clientInstance;
  }
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