import { writable } from 'svelte/store';
import { Brease } from '../ts/brease';
import type { BreaseConfig, Page, Collection, Navigation } from '../types/types';

// Create Svelte stores for state management
export const breaseStore = writable<{
  status: 'uninitialized' | 'initializing' | 'initialized' | 'error';
  error?: Error;
}>({
  status: 'uninitialized'
});

let instance: Brease | null = null;

export async function initialize(config: BreaseConfig): Promise<void> {
  breaseStore.set({ status: 'initializing' });
  
  try {
    instance = Brease.createInstance(config);
    breaseStore.set({ status: 'initialized' });
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    breaseStore.set({ status: 'error', error: errorObj });
    throw error;
  }
}

// Helper functions
export async function getPageByID(pageId: string): Promise<Page> {
  if (!instance) {
    throw new Error('Brease not initialized. Call initialize() first.');
  }
  return instance.getPageByID(pageId);
}

export async function getPageBySlug(pageSlug: string, locale?: string): Promise<Page> {
  if (!instance) {
    throw new Error('Brease not initialized. Call initialize() first.');
  }
  return instance.getPageBySlug(pageSlug, locale);
}

export async function getCollection(collectionId: string): Promise<Collection> {
  if (!instance) {
    throw new Error('Brease not initialized. Call initialize() first.');
  }
  return instance.getCollection(collectionId);
}

export async function getNavigation(navigationId: string): Promise<Navigation> {
  if (!instance) {
    throw new Error('Brease not initialized. Call initialize() first.');
  }
  return instance.getNavigation(navigationId);
} 