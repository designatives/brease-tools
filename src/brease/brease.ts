import { BreaseConfig, Page, BreasePageResponse, Collection, BreaseCollectionResponse, Navigation, BreaseNavigationResponse, BreaseEntryResponse, Entry, BreaseRedirectsResponse, Redirect } from "./types"

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

  constructor(breaseConfig: BreaseConfig) {
    this.token = breaseConfig.token;
    this.apiUrl = breaseConfig?.apiUrl || 'https://api.brease.io/v1';
    this.baseEnvironment = breaseConfig.environment;
  }

  /**
   * Create a new Brease instance.
   * This is used by framework-specific implementations.
   */
  static createInstance(config: BreaseConfig): Brease {
    return new Brease(config);
  }

  // Direct API call with token (server-only)
  private async fetchData(url: string): Promise<any> {
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

  async getPageByID(pageId: string): Promise<Page> {
    const endpoint = `/environments/${this.baseEnvironment}/pages/${pageId}`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreasePageResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.page;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
      }
      throw new Error('Failed to fetch page: Unknown error');
    }
  }

  async getPageBySlug(pageSlug: string, locale?: string): Promise<Page> {
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale||'en'}&slug=${pageSlug}`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreasePageResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.page;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
      }
      throw new Error('Failed to fetch page: Unknown error');
    }
  }

  async getPageMetaBySlug(pageSlug: string, locale?: string): Promise<Page> {
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale||'en'}&slug=${pageSlug}&metaOnly=1`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreasePageResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.page;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page metadata: ${error.message}`);
      }
      throw new Error('Failed to fetch page metadata: Unknown error');
    }
  }

  async getCollection(collectionId: string): Promise<Collection> {
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreaseCollectionResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.collection;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch collection: ${error.message}`);
      }
      throw new Error('Failed to fetch collection: Unknown error');
    }
  }

  async getEntryBySlug(collectionId: string, entrySlug:string, locale?: string): Promise<Entry> {
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}/entry?locale=${locale || 'en'}&slug=${entrySlug}`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreaseEntryResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.entry;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch entry: ${error.message}`);
      }
      throw new Error('Failed to fetch entry: Unknown error');
    }
  }

  async getEntryByID(collectionId: string, entryId:string, locale?: string): Promise<Entry> {
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}/entry/${entryId}?locale=${locale || 'en'}`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreaseEntryResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.entry;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch entry: ${error.message}`);
      }
      throw new Error('Failed to fetch entry: Unknown error');
    }
  }

  async getNavigation(navigationId: string): Promise<Navigation> {
    const endpoint = `/environments/${this.baseEnvironment}/navigations/${navigationId}`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreaseNavigationResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.navigation;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch navigation: ${error.message}`);
      }
      throw new Error('Failed to fetch navigation: Unknown error');
    }
  }

  async getRedirects(): Promise<Redirect[]> {
    const endpoint = `/environments/${this.baseEnvironment}/redirects`;
    
    try {
      const response = (await this.fetchData(endpoint)) as BreaseRedirectsResponse;
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.redirects;
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

// Export the iframe detection and data attribute setting logic
export function setBreasePreviewAttribute(): void {
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  if (isInIframe) {
    // In preview mode toggle this data attribute for hiding elements
    const html = document.getElementsByTagName('html')[0];
    if (html) {
      //@ts-ignore
      html.dataset.breasePreview = true;
    }
  }
}

// Function that returns the script content as a string for next/script
export function getBreasePreviewScript(): string {
  return `
    (function() {
      const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
      if (isInIframe) {
        // In preview mode toggle this data attribute for hiding elements
        const html = document.getElementsByTagName('html')[0];
        if (html) {
          //@ts-ignore
          html.dataset.breasePreview = true;
        }
      }
    })();
  `;
}

// Function that returns the script content as a string for plain JS
export function getBreasePreviewScriptContent(): string {
  return `
    const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
    if (isInIframe) {
      // In preview mode toggle this data attribute for hiding elements
      const html = document.getElementsByTagName('html')[0];
      if (html) {
        //@ts-ignore
        html.dataset.breasePreview = true;
      }
    }
  `;
}