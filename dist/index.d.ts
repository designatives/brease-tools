import React, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface BreaseConfig {
    token: string;
    apiUrl?: string;
    environment: string;
    proxyUrl?: string;
}
interface Page {
    uuid: string;
    name: string;
    slug: string;
    sections: PageSection[];
    variables: any;
    customCode: string | null;
    openGraphUrl: string | null;
    openGraphType: string;
    openGraphImage: string | null;
    openGraphTitle: string | null;
    metaDescription: string | null;
    openGraphDescription: string | null;
}
interface PageSection {
    type: string;
    uuid: string;
    page_section_uuid: string;
    name: string;
    elements: any;
}
interface Collection {
    uuid: string;
    name: string;
    entries: any[];
}
interface Navigation {
    items: any[];
}
interface Entry {
    uuid: string;
    name: string;
    slug: string;
    elements: any;
}
interface Redirect {
    uuid: string;
    source: string;
    destination: string;
    type: 301 | 302 | 307 | 308;
}
interface BreasePageResponse extends Response {
    data: {
        page: Page;
    };
    message: string | null;
}
interface BreaseCollectionResponse extends Response {
    data: {
        collection: Collection;
    };
    message: string | null;
}
interface BreaseEntryResponse extends Response {
    data: {
        entry: Entry;
    };
    message: string | null;
}
interface BreaseNavigationResponse extends Response {
    data: {
        navigation: Navigation;
    };
    message: string | null;
}
interface BreaseRedirectsResponse extends Response {
    data: {
        redirects: Redirect[];
    };
    message: string | null;
}

declare function printSections(page: Page, componentMap: Record<string, React.ComponentType<any>>, optionalData?: any): ReactNode[];

declare function SectionToolbar({ data }: {
    data: any;
}): react_jsx_runtime.JSX.Element;

interface BreaseEditButtonProps$1 {
    id: string;
}
declare const BreaseEditButton: ({ id }: BreaseEditButtonProps$1) => react_jsx_runtime.JSX.Element;

interface SectionToolbarData {
    name: string;
    uuid: string;
    [key: string]: any;
}
declare function createSectionToolbar(data: SectionToolbarData): HTMLDivElement;
declare function insertSectionToolbar(parent: HTMLElement, data: SectionToolbarData): HTMLDivElement;

interface BreaseEditButtonProps {
    id: string;
}
declare function createBreaseEditButton({ id }: BreaseEditButtonProps): HTMLButtonElement;
declare function insertBreaseEditButton(container: HTMLElement, id: string): HTMLButtonElement;

type InitializationState = {
    status: 'uninitialized' | 'initializing' | 'initialized' | 'error';
    error?: Error;
    instance?: Brease;
};
declare class Brease {
    private readonly token;
    private readonly apiUrl;
    private readonly baseEnvironment;
    private readonly baseProxyUrl;
    protected constructor(breaseConfig: BreaseConfig);
    /**
     * Create a new Brease instance.
     * This is used by framework-specific implementations.
     */
    static createInstance(config: BreaseConfig): Brease;
    private fetchServerData;
    private fetchClientData;
    getPageByID(pageId: string): Promise<Page>;
    getPageBySlug(pageSlug: string, locale?: string): Promise<Page>;
    getPageMetaBySlug(pageSlug: string, locale?: string): Promise<Page>;
    getCollection(collectionId: string): Promise<Collection>;
    getEntryBySlug(collectionId: string, entrySlug: string, locale?: string): Promise<Entry>;
    getNavigation(navigationId: string): Promise<Navigation>;
    getRedirects(): Promise<Redirect[]>;
}
/**
 * Initialize the Brease client.
 * Returns a promise that resolves when initialization is complete.
 */
declare function init(breaseConfig: BreaseConfig): Promise<void>;
/**
 * Get the initialization status of Brease
 */
declare function getInitializationState(): InitializationState;
/**
 * Get the Brease instance.
 * Throws if not initialized.
 */
declare function getInstance(): Brease;
declare function getPageByID(pageId: string): Promise<Page>;
declare function getPageBySlug(pageSlug: string, locale?: string): Promise<Page>;
declare function getCollection(collectionId: string): Promise<Collection>;
declare function getEntryBySlug(collectionId: string, entrySlug: string, locale?: string): Promise<Entry>;
declare function getNavigation(navigationId: string): Promise<Navigation>;
declare function getRedirects(): Promise<Redirect[]>;

/**
 * SSR-safe Brease utilities that don't rely on global state.
 * Each method creates its own client instance, making it safe for server-side rendering
 * where global state might not persist between requests.
 */
declare class BreaseSSR {
    private static createClient;
    /**
     * Get a page by its slug in SSR context
     */
    static getPageBySlug(config: BreaseConfig, pageSlug: string, locale?: string): Promise<Page>;
    /**
     * Get a page metadata by its slug in SSR context
     */
    static getPageMetaBySlug(config: BreaseConfig, pageSlug: string, locale?: string): Promise<Page>;
    /**
     * Get a page by its ID in SSR context
     */
    static getPageByID(config: BreaseConfig, pageId: string): Promise<Page>;
    /**
     * Get navigation data in SSR context
     */
    static getNavigation(config: BreaseConfig, navigationId: string): Promise<Navigation>;
    /**
     * Get collection data in SSR context
     */
    static getCollection(config: BreaseConfig, collectionId: string): Promise<Collection>;
    /**
     * Get an entry by its slug in SSR context
     */
    static getEntryBySlug(config: BreaseConfig, collectionId: string, entrySlug: string, locale?: string): Promise<Entry>;
    /**
     * Get redirects data in SSR context
     */
    static getRedirects(config: BreaseConfig): Promise<Redirect[]>;
}

export { Brease, type BreaseCollectionResponse, type BreaseConfig, BreaseEditButton, type BreaseEntryResponse, type BreaseNavigationResponse, type BreasePageResponse, type BreaseRedirectsResponse, BreaseSSR, type Collection, type Entry, type Navigation, type Page, type PageSection, type Redirect, SectionToolbar, type SectionToolbarData, createBreaseEditButton, createSectionToolbar, getCollection, getEntryBySlug, getInitializationState, getInstance, getNavigation, getPageByID, getPageBySlug, getRedirects, init, insertBreaseEditButton, insertSectionToolbar, printSections };
