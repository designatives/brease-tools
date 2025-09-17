export interface BreaseConfig {
  token: string
  apiUrl?: string
  environment: string
  proxyUrl?: string
}

export interface Page {
  uuid: string
  name: string
  slug: string
  sections: PageSection[]
  variables: any
  customCode: string | null
  openGraphUrl: string | null
  openGraphType: string
  openGraphImage: string | null
  openGraphTitle: string | null
  metaDescription: string | null
  openGraphDescription: string | null
}

export interface PageSection {
  type: string
  uuid: string
  page_section_uuid: string
  name: string
  elements: any
}

export interface Collection {
  uuid: string
  name: string
  entries: any[]
}

export interface Navigation {
  items: any[]
}

export interface Entry {
  uuid: string
  name: string
  slug: string
  elements: any
}

export interface Redirect {
  uuid: string
  source: string
  destination: string
  type: 301 | 302 | 307 | 308
}

export interface BreasePageResponse extends Response {
  data: {
    page: Page
  }
  message: string | null
}

export interface BreaseCollectionResponse extends Response {
  data: {
    collection: Collection
  }
  message: string | null
}

export interface BreaseEntryResponse extends Response {
  data: {
    entry: Entry
  }
  message: string | null
}

export interface BreaseNavigationResponse extends Response {
  data: {
    navigation: Navigation
  }
  message: string | null
}

export interface BreaseRedirectsResponse extends Response {
  data: {
    redirects: Redirect[]
  }
  message: string | null
}

// TypeScript/JS Utility Types
export interface ComponentRenderer {
  (data: any, extra?: any): HTMLElement;
}

export interface FilteredSection {
  component: ComponentRenderer;
  page_section_uuid: string;
  section_uuid: string;
  name: string;
  data: any;
}

export interface PrintSectionsOptions {
  container?: HTMLElement;
  optionalData?: any;
  enablePreview?: boolean;
}
