import React from "react"
import { Page } from "../types/types"

export function filterSections(page: Page, componentMap: Record<string, React.ComponentType<any>>) {
  return page.sections.map((section) => {
    if (componentMap[section.type]) {
      return {
        component: componentMap[section.type],
        page_section_uuid: section.page_section_uuid,
        section_uuid: section.uuid,
        name: section.name,
        data: section.elements
      }
    }
    return null
  })
}