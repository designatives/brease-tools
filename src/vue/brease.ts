import { ref, readonly } from '@vue/runtime-core';
import { Brease } from '../ts/brease';
import type { BreaseConfig, Page, Collection, Navigation } from '../types/types';

// Create reactive state
const status = ref<'uninitialized' | 'initializing' | 'initialized' | 'error'>('uninitialized');
const error = ref<Error | null>(null);

// Export readonly versions of state
export const breaseStatus = readonly(status);
export const breaseError = readonly(error);

let instance: Brease | null = null;

export async function initialize(config: BreaseConfig): Promise<void> {
  status.value = 'initializing';
  error.value = null;
  
  try {
    instance = Brease.createInstance(config);
    status.value = 'initialized';
  } catch (err) {
    const errorObj = err instanceof Error ? err : new Error(String(err));
    error.value = errorObj;
    status.value = 'error';
    throw errorObj;
  }
}

// Composable for accessing Brease state
export function useBrease() {
  return {
    status: breaseStatus,
    error: breaseError,
    initialize,
    getPageByID,
    getPageBySlug,
    getCollection,
    getNavigation,
  };
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