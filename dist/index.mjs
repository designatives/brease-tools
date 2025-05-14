// src/react/printSections.ts
import React2 from "react";

// src/react/ui/SectionToolbar/SectionEditButton/index.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
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
  const buttonRef = React.useRef(null);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref: buttonRef,
      className: "brease-edit-button",
      children: "Edit"
    }
  );
};

// src/react/ui/SectionToolbar/index.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function SectionToolbar({ data }) {
  return /* @__PURE__ */ jsxs("div", { className: "brease-section-toolbar", children: [
    /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2("span", { className: "brease-section-title", children: data.name }) }),
    /* @__PURE__ */ jsx2("div", { className: "brease-toolbar-actions", children: /* @__PURE__ */ jsx2(BreaseEditButton, { id: data.uuid }) })
  ] });
}

// src/react/filterSections.ts
function filterSections(page, componentMap) {
  return page.sections.map((section) => {
    if (componentMap[section.type]) {
      return {
        component: componentMap[section.type],
        uuid: section.uuid,
        name: section.name,
        data: section.elements
      };
    }
    return null;
  });
}

// src/react/printSections.ts
function printSections(page, componentMap) {
  const sections = filterSections(page, componentMap);
  const isInIframe = typeof window !== "undefined" && window.self !== window.top;
  return sections?.map((section, index) => {
    if (section) {
      if (isInIframe) {
        return React2.createElement(
          "figure",
          {
            key: index,
            id: section.uuid,
            className: "brease-section"
          },
          React2.createElement(SectionToolbar, { data: section }),
          // Add overlays to disable interactivity
          React2.createElement("div", {
            className: "brease-preview-overlay"
          }),
          React2.createElement(section.component, { data: section.data })
        );
      } else {
        return React2.createElement(
          "figure",
          {
            key: index,
            id: section.uuid,
            className: "brease-section"
          },
          React2.createElement(section.component, { data: section.data })
        );
      }
    }
  });
}

// src/ts/ui/SectionToolbar/SectionEditButton/index.ts
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

// src/ts/ui/SectionToolbar/index.ts
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
  const editButton = createBreaseEditButton({ id: data.uuid });
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

// src/ts/brease.ts
var INSTANCE_KEY = Symbol.for("brease.instance");
var getGlobalThis = () => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw new Error("Unable to locate global object");
};
var Brease = class {
  constructor(breaseConfig) {
    this.token = breaseConfig.token;
    this.apiUrl = breaseConfig?.apiUrl || "https://api.brease.io/v1";
    this.baseEnvironment = breaseConfig.environment;
    this.baseProxyUrl = breaseConfig?.proxyUrl || "/api/brease";
  }
  // Server-side: Direct API call with token
  async fetchServerData(url) {
    const response = await fetch(this.apiUrl + url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    });
    return await response.json();
  }
  // Client-side: Call the proxy endpoint
  async fetchClientData(endpoint) {
    const response = await fetch(`${this.baseProxyUrl}/${endpoint}}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  }
  async getPageByID(pageId) {
    const isServer = typeof window === "undefined";
    const endpoint = `/environments/${this.baseEnvironment}/pages/${pageId}`;
    if (isServer) {
      const response = await this.fetchServerData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      } else {
        return response.data.page;
      }
    } else {
      return await this.fetchClientData(endpoint);
    }
  }
  async getPageBySlug(pageSlug, locale) {
    const isServer = typeof window === "undefined";
    const endpoint = `/environments/${this.baseEnvironment}/page?locale=${locale || "en"}&slug=${pageSlug}`;
    if (isServer) {
      const response = await this.fetchServerData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      } else {
        return response.data.page;
      }
    } else {
      return await this.fetchClientData(endpoint);
    }
  }
  async getCollection(collectionId) {
    const isServer = typeof window === "undefined";
    const endpoint = `/environments/${this.baseEnvironment}/collections/${collectionId}`;
    if (isServer) {
      const response = await this.fetchServerData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      } else {
        return response.data.collection;
      }
    } else {
      return await this.fetchClientData(endpoint);
    }
  }
  async getNavigation(navigationId) {
    const isServer = typeof window === "undefined";
    const endpoint = `/environments/${this.baseEnvironment}/navigations/${navigationId}`;
    if (isServer) {
      const response = await this.fetchServerData(endpoint);
      if (response.message) {
        throw new Error(response.message);
      } else {
        return response.data.navigation;
      }
    } else {
      return await this.fetchClientData(endpoint);
    }
  }
};
function init(breaseConfig) {
  const globalObj = getGlobalThis();
  const instance = new Brease(breaseConfig);
  globalObj[INSTANCE_KEY] = {
    instance,
    config: breaseConfig
  };
  return instance;
}
function getInstance() {
  const globalObj = getGlobalThis();
  const breaseGlobal = globalObj[INSTANCE_KEY];
  if (!breaseGlobal?.instance) {
    throw new Error("Brease not initialized. Call init(config) first with your API token and environment.");
  }
  return breaseGlobal.instance;
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
function getNavigation(navigationId) {
  return getInstance().getNavigation(navigationId);
}
export {
  Brease,
  BreaseEditButton,
  SectionToolbar,
  createBreaseEditButton,
  createSectionToolbar,
  getCollection,
  getInstance,
  getNavigation,
  getPageByID,
  getPageBySlug,
  init,
  insertBreaseEditButton,
  insertSectionToolbar,
  printSections
};
