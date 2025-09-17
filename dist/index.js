"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Brease: () => Brease,
  BreaseEditButton: () => BreaseEditButton,
  SectionToolbar: () => SectionToolbar,
  createBreaseEditButton: () => createBreaseEditButton,
  createSectionToolbar: () => createSectionToolbar,
  filterSections: () => filterSections,
  filterSectionsTS: () => filterSectionsTS,
  getBreasePreviewScript: () => getBreasePreviewScript,
  getBreasePreviewScriptContent: () => getBreasePreviewScriptContent,
  getCollection: () => getCollection,
  getEntryByID: () => getEntryByID,
  getEntryBySlug: () => getEntryBySlug,
  getInitializationState: () => getInitializationState,
  getInstance: () => getInstance,
  getNavigation: () => getNavigation,
  getPageByID: () => getPageByID,
  getPageBySlug: () => getPageBySlug,
  getRedirects: () => getRedirects,
  init: () => init,
  insertBreaseEditButton: () => insertBreaseEditButton,
  insertSectionToolbar: () => insertSectionToolbar,
  printSections: () => printSections,
  printSectionsTS: () => printSectionsTS,
  setBreasePreviewAttribute: () => setBreasePreviewAttribute
});
module.exports = __toCommonJS(index_exports);

// src/brease/brease.ts
var initializationState = {
  status: "uninitialized"
};
var Brease = class _Brease {
  constructor(breaseConfig) {
    this.token = breaseConfig.token;
    this.apiUrl = breaseConfig?.apiUrl || "https://api.brease.io/v1";
    this.baseEnvironment = breaseConfig.environment;
  }
  /**
   * Create a new Brease instance.
   * This is used by framework-specific implementations.
   */
  static createInstance(config) {
    return new _Brease(config);
  }
  // Direct API call with token (server-only)
  async fetchData(url) {
    const response = await fetch(this.apiUrl + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    return await response.json();
  }
  async getPageByID(pageId) {
    const endpoint = `/environments/${this.baseEnvironment}/pages/${pageId}`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.page;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
      }
      throw new Error("Failed to fetch page: Unknown error");
    }
  }
  async getPageBySlug(pageSlug, locale) {
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale || "en"}&slug=${pageSlug}`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.page;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page: ${error.message}`);
      }
      throw new Error("Failed to fetch page: Unknown error");
    }
  }
  async getPageMetaBySlug(pageSlug, locale) {
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale || "en"}&slug=${pageSlug}&metaOnly=1`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.page;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch page metadata: ${error.message}`);
      }
      throw new Error("Failed to fetch page metadata: Unknown error");
    }
  }
  async getCollection(collectionId) {
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.collection;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch collection: ${error.message}`);
      }
      throw new Error("Failed to fetch collection: Unknown error");
    }
  }
  async getEntryBySlug(collectionId, entrySlug, locale) {
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}/entry?locale=${locale || "en"}&slug=${entrySlug}`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.entry;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch entry: ${error.message}`);
      }
      throw new Error("Failed to fetch entry: Unknown error");
    }
  }
  async getEntryByID(collectionId, entryId, locale) {
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}/entry/${entryId}?locale=${locale || "en"}`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.entry;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch entry: ${error.message}`);
      }
      throw new Error("Failed to fetch entry: Unknown error");
    }
  }
  async getNavigation(navigationId) {
    const endpoint = `/environments/${this.baseEnvironment}/navigations/${navigationId}`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.navigation;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch navigation: ${error.message}`);
      }
      throw new Error("Failed to fetch navigation: Unknown error");
    }
  }
  async getRedirects() {
    const endpoint = `/environments/${this.baseEnvironment}/redirects`;
    try {
      const response = await this.fetchData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      }
      return response.data.redirects;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch redirects: ${error.message}`);
      }
      throw new Error("Failed to fetch redirects: Unknown error");
    }
  }
};
async function init(breaseConfig) {
  if (initializationState.status === "initialized") {
    return;
  }
  if (initializationState.status === "initializing") {
    throw new Error("Brease is already initializing");
  }
  try {
    initializationState = { status: "initializing" };
    const instance = Brease.createInstance(breaseConfig);
    initializationState = {
      status: "initialized",
      instance
    };
  } catch (error) {
    initializationState = {
      status: "error",
      error: error instanceof Error ? error : new Error(String(error))
    };
    throw error;
  }
}
function getInitializationState() {
  return { ...initializationState };
}
function getInstance() {
  if (initializationState.status !== "initialized" || !initializationState.instance) {
    throw new Error(`Brease is not initialized (current status: ${initializationState.status}). Call init(config) first with your API token and environment.`);
  }
  return initializationState.instance;
}
function getPageByID(pageId) {
  return getInstance().getPageByID(pageId);
}
function getPageBySlug(pageSlug, locale) {
  return getInstance().getPageBySlug(pageSlug, locale);
}
function getCollection(collectionId) {
  return getInstance().getCollection(collectionId);
}
function getEntryBySlug(collectionId, entrySlug, locale) {
  return getInstance().getEntryBySlug(collectionId, entrySlug, locale);
}
function getEntryByID(collectionId, entryId, locale) {
  return getInstance().getEntryByID(collectionId, entryId, locale);
}
function getNavigation(navigationId) {
  return getInstance().getNavigation(navigationId);
}
function getRedirects() {
  return getInstance().getRedirects();
}
function setBreasePreviewAttribute() {
  const isInIframe = typeof window !== "undefined" && window.self !== window.top;
  if (isInIframe) {
    const html = document.getElementsByTagName("html")[0];
    if (html) {
      html.dataset.breasePreview = true;
    }
  }
}
function getBreasePreviewScript() {
  return `
    (function() {
      const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
      if (isInIframe) {
        // In preview mode toggle this data attribute for hiding elements
        const html = document.getElementsByTagName('html')[0];
        if (html) {
          //@ts-ignore
          html.dataset.breasePreview = true;
        }
      }
    })();
  `;
}
function getBreasePreviewScriptContent() {
  return `
    const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
    if (isInIframe) {
      // In preview mode toggle this data attribute for hiding elements
      const html = document.getElementsByTagName('html')[0];
      if (html) {
        //@ts-ignore
        html.dataset.breasePreview = true;
      }
    }
  `;
}

// src/ui/react/SectionToolbar/SectionEditButton/index.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
function BreaseAction(action, data) {
  if (typeof window !== "undefined" && window.parent) {
    window.parent.postMessage(
      {
        action,
        data: {
          ...data,
          scrollY: window.scrollY
        }
      },
      "*"
    );
  }
}
var BreaseEditButton = ({ id }) => {
  const buttonRef = import_react.default.useRef(null);
  import_react.default.useEffect(() => {
    const handleClick = () => {
      BreaseAction("BreaseEditSection", { uuid: id });
    };
    const button = buttonRef.current;
    if (button) {
      button.addEventListener("click", handleClick);
    }
    return () => {
      if (button) {
        button.removeEventListener("click", handleClick);
      }
    };
  }, [id]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      ref: buttonRef,
      className: "brease-edit-button",
      children: "Edit"
    }
  );
};

// src/ui/react/SectionToolbar/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function SectionToolbar({ data }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "brease-section-toolbar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "brease-section-title", children: data.name }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "brease-toolbar-actions", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BreaseEditButton, { id: data.page_section_uuid }) })
  ] });
}

// src/ui/ts/SectionToolbar/SectionEditButton/index.ts
function BreaseAction2(action, data) {
  if (typeof window !== "undefined" && window.parent) {
    window.parent.postMessage(
      {
        action,
        data: {
          ...data,
          scrollY: window.scrollY
        }
      },
      "*"
    );
  }
}
function createBreaseEditButton({ id }) {
  const button = document.createElement("button");
  button.textContent = "Edit";
  button.className = "brease-edit-button";
  button.addEventListener("click", () => {
    BreaseAction2("BreaseEditSection", { uuid: id });
  });
  return button;
}
function insertBreaseEditButton(container, id) {
  const button = createBreaseEditButton({ id });
  container.appendChild(button);
  return button;
}

// src/ui/ts/SectionToolbar/index.ts
function createSectionToolbar(data) {
  const container = document.createElement("div");
  container.className = "brease-section-toolbar";
  const titleContainer = document.createElement("div");
  const title = document.createElement("span");
  title.className = "brease-section-title";
  title.textContent = data.name;
  titleContainer.appendChild(title);
  const actionsContainer = document.createElement("div");
  actionsContainer.className = "brease-toolbar-actions";
  const editButton = createBreaseEditButton({ id: data.page_section_uuid });
  actionsContainer.appendChild(editButton);
  container.appendChild(titleContainer);
  container.appendChild(actionsContainer);
  return container;
}
function insertSectionToolbar(parent, data) {
  const toolbar = createSectionToolbar(data);
  parent.appendChild(toolbar);
  return toolbar;
}

// src/utils/react/printSections.ts
var import_react2 = __toESM(require("react"));

// src/utils/react/filterSections.ts
function filterSections(page, componentMap) {
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

// src/utils/react/printSections.ts
function printSections(page, componentMap, optionalData) {
  const sections = filterSections(page, componentMap);
  const isInIframe = typeof window !== "undefined" && window.self !== window.top;
  return sections?.map((section, index) => {
    if (section) {
      if (isInIframe) {
        return import_react2.default.createElement(
          "figure",
          {
            key: index,
            id: section.page_section_uuid,
            className: "brease-section"
          },
          import_react2.default.createElement(SectionToolbar, { data: section }),
          // Add overlays to disable interactivity
          import_react2.default.createElement("div", {
            className: "brease-preview-overlay"
          }),
          import_react2.default.createElement(section.component, { data: section.data, extra: optionalData || null })
        );
      } else {
        return import_react2.default.createElement(
          "figure",
          {
            key: index,
            id: section.page_section_uuid,
            className: "brease-section"
          },
          import_react2.default.createElement(section.component, { data: section.data, extra: optionalData || null })
        );
      }
    }
  });
}

// src/utils/ts/filterSections.ts
function filterSectionsTS(page, componentMap) {
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

// src/utils/ts/printSections.ts
function printSectionsTS(page, componentMap, options = {}) {
  const { container, optionalData, enablePreview = true } = options;
  const sections = filterSectionsTS(page, componentMap);
  const isInIframe = typeof window !== "undefined" && window.self !== window.top;
  const renderedSections = [];
  sections.forEach((section, index) => {
    if (section) {
      const sectionElement = document.createElement("figure");
      sectionElement.id = section.page_section_uuid;
      sectionElement.className = "brease-section";
      if (isInIframe && enablePreview) {
        const toolbar = createSectionToolbar({
          page_section_uuid: section.page_section_uuid,
          name: section.name,
          uuid: section.section_uuid
        });
        sectionElement.appendChild(toolbar);
        const overlay = document.createElement("div");
        overlay.className = "brease-preview-overlay";
        sectionElement.appendChild(overlay);
      }
      const componentElement = section.component(section.data, optionalData || null);
      sectionElement.appendChild(componentElement);
      if (container) {
        container.appendChild(sectionElement);
      }
      renderedSections.push(sectionElement);
    }
  });
  return renderedSections;
}
