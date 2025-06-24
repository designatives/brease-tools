export interface BreaseConfig {
  token: string
  apiUrl?: string
  environment: string
  proxyUrl?: string
}

export interface Page {
  name: string
  sections: PageSection[]
  customCode: string | null,
  openGraphUrl: string | null,
  openGraphType: string,
  openGraphImage: string | null,
  openGraphTitle: string | null,
  metaDescription: string | null,
  openGraphDescription: string | null
}

export interface PageSection {
  type: string
  uuid: string
  page_section_uuid: string
  name: string
  elements: []
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
  elements: any[]
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
