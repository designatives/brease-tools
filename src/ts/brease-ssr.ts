import { Brease } from './brease'
import type { BreaseConfig, Page, Collection, Navigation, Entry, Redirect } from '../types/types'

/**
 * SSR-safe Brease utilities that don't rely on global state.
 * Each method creates its own client instance, making it safe for server-side rendering
 * where global state might not persist between requests.
 */
export class BreaseSSR {
  private static createClient(config: BreaseConfig): Brease {
    return Brease.createInstance(config)
  }

  /**
   * Get a page by its slug in SSR context
   */
  static async getPageBySlug(
    config: BreaseConfig, 
    pageSlug: string, 
    locale?: string
  ): Promise<Page> {
    const client = this.createClient(config)
    return client.getPageBySlug(pageSlug, locale)
  }

  /**
   * Get a page metadata by its slug in SSR context
   */
  static async getPageMetaBySlug(
    config: BreaseConfig, 
    pageSlug: string, 
    locale?: string
  ): Promise<Page> {
    const client = this.createClient(config)
    return client.getPageMetaBySlug(pageSlug, locale)
  }

  /**
   * Get a page by its ID in SSR context
   */
  static async getPageByID(config: BreaseConfig, pageId: string): Promise<Page> {
    const client = this.createClient(config)
    return client.getPageByID(pageId)
  }

  /**
   * Get navigation data in SSR context
   */
  static async getNavigation(config: BreaseConfig, navigationId: string): Promise<Navigation> {
    const client = this.createClient(config)
    return client.getNavigation(navigationId)
  }

  /**
   * Get collection data in SSR context
   */
  static async getCollection(config: BreaseConfig, collectionId: string): Promise<Collection> {
    const client = this.createClient(config)
    return client.getCollection(collectionId)
  }

  /**
   * Get an entry by its slug in SSR context
   */
  static async getEntryBySlug(
    config: BreaseConfig, 
    collectionId: string, 
    entrySlug: string, 
    locale?: string
  ): Promise<Entry> {
    const client = this.createClient(config)
    return client.getEntryBySlug(collectionId, entrySlug, locale)
  }

  /**
   * Get redirects data in SSR context
   */
  static async getRedirects(config: BreaseConfig): Promise<Redirect[]> {
    const client = this.createClient(config)
    return client.getRedirects()
  }
} 