import React, { ReactNode } from 'react';
import { Page } from '../types/types';
import { SectionToolbar } from './ui/SectionToolbar';
import { filterSections } from './filterSections';

// Export as a named function declaration (not an arrow function or method)
export function printSections(page: Page, componentMap: Record<string, React.ComponentType<any>>): ReactNode[] {
  const sections = filterSections(page, componentMap);
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  //TODO: isIframe for now => handle actual auth here
  return sections?.map((section: any, index: number) => {
    if (section) {
      if (isInIframe) {
        //TODO: Hide navigations (next ver)
        // requestAnimationFrame(() => {
        //   const breaseNavigations = window.self.document.getElementsByTagName('nav');
        //   Array.from(breaseNavigations).forEach(nav => {
        //     nav.classList.add('brease-preview-hidden');
        //   })
        // })
        return React.createElement(
          'figure',
          { 
            key: index, 
            id: section.uuid,
            className: 'brease-section'
          },
          React.createElement(SectionToolbar, { data: section }),
          // Add overlays to disable interactivity
          React.createElement('div', {
            className: 'brease-preview-overlay',
          }),
          React.createElement(section.component, { data: section.data })
        );
      } else {
        return React.createElement(
          'figure',
          { 
            key: index, 
            id: section.uuid,
            className: 'brease-section'
          },
          React.createElement(section.component, { data: section.data })
        );
      }
    }
  });
}