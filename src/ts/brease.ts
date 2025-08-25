import { BreaseConfig, Page, BreasePageResponse, Collection, BreaseCollectionResponse, Navigation, BreaseNavigationResponse, BreaseEntryResponse, Entry, BreaseRedirectsResponse, Redirect } from "../types/types"

type InitializationState = {
  status: 'uninitialized' | 'initializing' | 'initialized' | 'error';
  error?: Error;
  instance?: Brease;
};

// State management for initialization
let initializationState: InitializationState = {
  status: 'uninitialized'
};

export class Brease {
  private readonly token: string;
  private readonly apiUrl: string;
  private readonly baseEnvironment: string;
  private readonly baseProxyUrl: string;

  protected constructor(breaseConfig: BreaseConfig) {
    this.token = breaseConfig.token;
    this.apiUrl = breaseConfig?.apiUrl || 'https://api.brease.io/v1';
    this.baseEnvironment = breaseConfig.environment;
    this.baseProxyUrl = breaseConfig?.proxyUrl || '/api/brease';
  }

  /**
   * Create a new Brease instance.
   * This is used by framework-specific implementations.
   */
  static createInstance(config: BreaseConfig): Brease {
    return new Brease(config);
  }

  // Server-side: Direct API call with token
  private async fetchServerData(url: string): Promise<any> {
    const response = await fetch(this.apiUrl + url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return await response.json();
  }

  // Client-side: Call the proxy endpoint
  private async fetchClientData(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseProxyUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  }

  async getPageByID(pageId: string): Promise<Page> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/pages/${pageId}`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreasePageResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.page;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
      }
      throw new Error('Failed to fetch page: Unknown error');
    }
  }

  async getPageBySlug(pageSlug: string, locale?: string): Promise<Page> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale||'en'}&slug=${pageSlug}`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreasePageResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.page;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
      }
      throw new Error('Failed to fetch page: Unknown error');
    }
  }

  async getPageMetaBySlug(pageSlug: string, locale?: string): Promise<Page> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale||'en'}&slug=${pageSlug}&metaOnly=1`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreasePageResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.page;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page metadata: ${error.message}`);
      }
      throw new Error('Failed to fetch pag metadata: Unknown error');
    }
  }

  async getCollection(collectionId: string): Promise<Collection> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreaseCollectionResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.collection;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch collection: ${error.message}`);
      }
      throw new Error('Failed to fetch collection: Unknown error');
    }
  }

  async getEntryBySlug(collectionId: string, entrySlug:string, locale?: string): Promise<Entry> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}/entry?locale=${locale || 'en'}&slug=${entrySlug}`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreaseEntryResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.entry;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch entry: ${error.message}`);
      }
      throw new Error('Failed to fetch collection: Unknown error');
    }
  }

  async getEntryByID(collectionId: string, entryId:string, locale?: string): Promise<Entry> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}/entry/${entryId}?locale=${locale || 'en'}`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreaseEntryResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.entry;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch entry: ${error.message}`);
      }
      throw new Error('Failed to fetch collection: Unknown error');
    }
  }

  async getNavigation(navigationId: string): Promise<Navigation> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/navigations/${navigationId}`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreaseNavigationResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.navigation;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch navigation: ${error.message}`);
      }
      throw new Error('Failed to fetch navigation: Unknown error');
    }
  }

  async getRedirects(): Promise<Redirect[]> {
    const isServer = typeof window === 'undefined';
    const endpoint = `/environments/${this.baseEnvironment}/redirects`;
    
    try {
      if (isServer) {
        const response = (await this.fetchServerData(endpoint)) as BreaseRedirectsResponse;
        if (response.message) {
          throw new Error(response.message);
        }
        return response.data.redirects;
      } else {
        return await this.fetchClientData(endpoint);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch redirects: ${error.message}`);
      }
      throw new Error('Failed to fetch redirects: Unknown error');
    }
  }
}

/**
 * Initialize the Brease client.
 * Returns a promise that resolves when initialization is complete.
 */
export async function init(breaseConfig: BreaseConfig): Promise<void> {
  // If already initialized or initializing, return
  if (initializationState.status === 'initialized') {
    return;
  }
  
  if (initializationState.status === 'initializing') {
    throw new Error('Brease is already initializing');
  }

  try {
    initializationState = { status: 'initializing' };
    
    // Create new instance using the factory method
    const instance = Brease.createInstance(breaseConfig);
    
    // Update state
    initializationState = {
      status: 'initialized',
      instance
    };
  } catch (error) {
    initializationState = {
      status: 'error',
      error: error instanceof Error ? error : new Error(String(error))
    };
    throw error;
  }
}

/**
 * Get the initialization status of Brease
 */
export function getInitializationState(): InitializationState {
  return { ...initializationState };
}

/**
 * Get the Brease instance.
 * Throws if not initialized.
 */
export function getInstance(): Brease {
  if (initializationState.status !== 'initialized' || !initializationState.instance) {
    throw new Error(`Brease is not initialized (current status: ${initializationState.status}). Call init(config) first with your API token and environment.`);
  }
  
  return initializationState.instance;
}

// Helper functions that use the instance
export function getPageByID(pageId: string): Promise<Page> {
  return getInstance().getPageByID(pageId);
}

export function getPageBySlug(pageSlug: string, locale?: string): Promise<Page> {
  return getInstance().getPageBySlug(pageSlug, locale);
}

export function getCollection(collectionId: string): Promise<Collection> {
  return getInstance().getCollection(collectionId);
}

export function getEntryBySlug(collectionId: string, entrySlug: string, locale?: string): Promise<Entry> {
  return getInstance().getEntryBySlug(collectionId, entrySlug, locale);
}

export function getEntryByID(collectionId: string, entryId: string, locale?: string): Promise<Entry> {
  return getInstance().getEntryByID(collectionId, entryId, locale);
}

export function getNavigation(navigationId: string): Promise<Navigation> {
  return getInstance().getNavigation(navigationId);
}

export function getRedirects(): Promise<Redirect[]> {
  return getInstance().getRedirects();
}