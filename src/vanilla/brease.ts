import { EventEmitter } from 'events';
import { Brease } from '../ts/brease';
import type { BreaseConfig, Page, Collection, Navigation } from '../types/types';

type BreaseState = {
  status: 'uninitialized' | 'initializing' | 'initialized' | 'error';
  error?: Error;
};

class BreaseManager extends EventEmitter {
  private state: BreaseState = {
    status: 'uninitialized'
  };
  private instance: Brease | null = null;

  constructor() {
    super();
    this.setState = this.setState.bind(this);
    this.initialize = this.initialize.bind(this);
  }

  private setState(newState: Partial<BreaseState>) {
    this.state = { ...this.state, ...newState };
    this.emit('stateChange', this.state);
  }

  async initialize(config: BreaseConfig): Promise<void> {
    if (this.state.status === 'initialized') return;
    
    this.setState({ status: 'initializing' });
    
    try {
      this.instance = Brease.createInstance(config);
      this.setState({ status: 'initialized' });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      this.setState({ status: 'error', error: errorObj });
      throw errorObj;
    }
  }

  getState(): BreaseState {
    return { ...this.state };
  }

  async getPageByID(pageId: string): Promise<Page> {
    if (!this.instance) {
      throw new Error('Brease not initialized. Call initialize() first.');
    }
    return this.instance.getPageByID(pageId);
  }

  async getPageBySlug(pageSlug: string, locale?: string): Promise<Page> {
    if (!this.instance) {
      throw new Error('Brease not initialized. Call initialize() first.');
    }
    return this.instance.getPageBySlug(pageSlug, locale);
  }

  async getCollection(collectionId: string): Promise<Collection> {
    if (!this.instance) {
      throw new Error('Brease not initialized. Call initialize() first.');
    }
    return this.instance.getCollection(collectionId);
  }

  async getNavigation(navigationId: string): Promise<Navigation> {
    if (!this.instance) {
      throw new Error('Brease not initialized. Call initialize() first.');
    }
    return this.instance.getNavigation(navigationId);
  }
}

// Create and export singleton instance
export const brease = new BreaseManager();

// Export type-only
export type { BreaseState };

// Export helper functions that use the singleton
export const initialize = brease.initialize;
export const getPageByID = brease.getPageByID.bind(brease);
export const getPageBySlug = brease.getPageBySlug.bind(brease);
export const getCollection = brease.getCollection.bind(brease);
export const getNavigation = brease.getNavigation.bind(brease); 