import React, { ReactNode } from 'react';
import { Page } from '../types/types';
import { SectionToolbar } from './ui/SectionToolbar';
import { filterSections } from './filterSections';

// Export as a named function declaration (not an arrow function or method)
export function printSections(page: Page, componentMap: Record<string, React.ComponentType<any>>, optionalData?: any): ReactNode[] {
  const sections = filterSections(page, componentMap);
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  //TODO: isIframe for now => handle actual auth here
  if(isInIframe){
    // In preview mode toggle this data attribute for hiding elements
    const html = document.getElementsByTagName('html')[0];
    //@ts-ignore
    if (html) html.dataset.breasePreview = true;
  }
  return sections?.map((section: any, index: number) => {
    if (section) {
      if (isInIframe) {
        return React.createElement(
          'figure',
          { 
            key: index, 
            id: section.page_section_uuid,
            className: 'brease-section'
          },
          React.createElement(SectionToolbar, { data: section }),
          // Add overlays to disable interactivity
          React.createElement('div', {
            className: 'brease-preview-overlay',
          }),
          React.createElement(section.component, { data: section.data, extra: optionalData || null })
        );
      } else {
        return React.createElement(
          'figure',
          { 
            key: index, 
            id: section.page_section_uuid,
            className: 'brease-section'
          },
          React.createElement(section.component, { data: section.data, extra: optionalData || null})
        );
      }
    }
  });
}