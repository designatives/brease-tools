import { Page, ComponentRenderer, FilteredSection, PrintSectionsOptions } from "../../brease/types";
import { createSectionToolbar } from "../../ui/ts/SectionToolbar";
import { filterSectionsTS } from "./filterSections";

export function printSectionsTS(
  page: Page, 
  componentMap: Record<string, ComponentRenderer>,
  options: PrintSectionsOptions = {}
): HTMLElement[] {
  const { container, optionalData, enablePreview = true } = options;
  const sections = filterSectionsTS(page, componentMap);
  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
  
  const renderedSections: HTMLElement[] = [];
  
  sections.forEach((section: FilteredSection | null, index: number) => {
    if (section) {
      // Create main section container
      const sectionElement = document.createElement('figure');
      sectionElement.id = section.page_section_uuid;
      sectionElement.className = 'brease-section';
      
      // Add preview mode elements if in iframe and preview is enabled
      if (isInIframe && enablePreview) {
        // Create and add section toolbar
        const toolbar = createSectionToolbar({
          page_section_uuid: section.page_section_uuid,
          name: section.name,
          uuid: section.section_uuid
        });
        sectionElement.appendChild(toolbar);
        
        // Add preview overlay
        const overlay = document.createElement('div');
        overlay.className = 'brease-preview-overlay';
        sectionElement.appendChild(overlay);
      }
      
      // Render the component content
      const componentElement = section.component(section.data, optionalData || null);
      sectionElement.appendChild(componentElement);
      
      // Add to container if provided
      if (container) {
        container.appendChild(sectionElement);
      }
      
      renderedSections.push(sectionElement);
    }
  });
  
  return renderedSections;
}

