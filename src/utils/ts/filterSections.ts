import { Page, ComponentRenderer, FilteredSection } from "../../brease/types";

export function filterSectionsTS(
  page: Page, 
  componentMap: Record<string, ComponentRenderer>
): (FilteredSection | null)[] {
  return page.sections.map((section) => {
    if (componentMap[section.type]) {
      return {
        component: componentMap[section.type],
        page_section_uuid: section.page_section_uuid,
        section_uuid: section.uuid,
        name: section.name,
        data: section.elements
      };
    }
    return null;
  });
}
