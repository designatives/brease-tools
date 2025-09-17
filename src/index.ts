import './styles/index.css';

// Brease core
export { 
  Brease,
  getInitializationState, 
  init,
  getInstance, 
  getPageByID,
  getPageBySlug, 
  getCollection, 
  getEntryBySlug,
  getEntryByID,
  getNavigation,
  getRedirects,
  setBreasePreviewAttribute,
  getBreasePreviewScript,
  getBreasePreviewScriptContent,
} from './brease/brease';

// React UI components
export { SectionToolbar } from './ui/react/SectionToolbar';
export { BreaseEditButton } from './ui/react/SectionToolbar/SectionEditButton';

// TypeScript/JS UI components
export { createSectionToolbar, insertSectionToolbar } from './ui/ts/SectionToolbar';
export { createBreaseEditButton, insertBreaseEditButton } from './ui/ts/SectionToolbar/SectionEditButton';

// React utilities
export { printSections } from './utils/react/printSections';
export { filterSections } from './utils/react/filterSections';

// TypeScript/JS utilities
export { printSectionsTS } from './utils/ts/printSections';
export { filterSectionsTS } from './utils/ts/filterSections';

// Types
export type { 
  BreaseConfig, 
  Page,
  PageSection, 
  Collection, 
  Navigation,
  Redirect,
  Entry,
  BreasePageResponse, 
  BreaseCollectionResponse, 
  BreaseNavigationResponse ,
  BreaseRedirectsResponse,
  BreaseEntryResponse,
  ComponentRenderer,
  FilteredSection,
  PrintSectionsOptions
} from './brease/types';
export type { SectionToolbarData } from './ui/ts/SectionToolbar';