import React, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface BreaseConfig {
    token: string;
    apiUrl?: string;
    environment: string;
    proxyUrl?: string;
}
interface Page {
    name: string;
    sections: PageSection[];
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
    name: string;
    elements: [];
}
interface Collection {
    name: string;
    entries: any[];
}
interface Navigation {
    items: any[];
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
interface BreaseNavigationResponse extends Response {
    data: {
        navigation: Navigation;
    };
    message: string | null;
}

declare function printSections(page: Page, componentMap: Record<string, React.ComponentType<any>>): ReactNode[];

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

declare class Brease {
    private readonly token;
    private readonly apiUrl;
    private readonly baseEnvironment;
    private readonly baseProxyUrl;
    constructor(config: BreaseConfig);
    private fetchServerData;
    private fetchClientData;
    getPage(pageId: string): Promise<Page>;
    getCollection(collectionId: string): Promise<Collection>;
    getNavigation(navigationId: string): Promise<Navigation>;
}
/**
 * Initialize the Brease client.
 * Must be called with your API token and environment.
 * If called again with different credentials, it will reinitialize.
 */
declare function init(config: BreaseConfig): Brease;
/**
 * Get the Brease instance.
 * Throws an error if not initialized.
 */
declare function getInstance(): Brease;
declare function getPage(pageId: string): Promise<Page>;
declare function getCollection(collectionId: string): Promise<Collection>;
declare function getNavigation(navigationId: string): Promise<Navigation>;

export { Brease, type BreaseCollectionResponse, type BreaseConfig, BreaseEditButton, type BreaseNavigationResponse, type BreasePageResponse, type Collection, type Navigation, type Page, type PageSection, SectionToolbar, type SectionToolbarData, createBreaseEditButton, createSectionToolbar, getCollection, getInstance, getNavigation, getPage, init, insertBreaseEditButton, insertSectionToolbar, printSections };
