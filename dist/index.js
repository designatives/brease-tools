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
  getCollection: () => getCollection,
  getInstance: () => getInstance,
  getNavigation: () => getNavigation,
  getPage: () => getPage,
  init: () => init,
  insertBreaseEditButton: () => insertBreaseEditButton,
  insertSectionToolbar: () => insertSectionToolbar,
  printSections: () => printSections
});
module.exports = __toCommonJS(index_exports);

// src/react/printSections.ts
var import_react2 = __toESM(require("react"));

// src/react/ui/SectionToolbar/SectionEditButton/index.tsx
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

// src/react/ui/SectionToolbar/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function SectionToolbar({ data }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "brease-section-toolbar", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "brease-section-title", children: data.name }) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "brease-toolbar-actions", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BreaseEditButton, { id: data.uuid }) })
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
        return import_react2.default.createElement(
          "figure",
          {
            key: index,
            id: section.uuid,
            className: "brease-section"
          },
          import_react2.default.createElement(SectionToolbar, { data: section }),
          // Add overlays to disable interactivity
          import_react2.default.createElement("div", {
            className: "brease-preview-overlay"
          }),
          import_react2.default.createElement(section.component, { data: section.data })
        );
      } else {
        return import_react2.default.createElement(
          "figure",
          {
            key: index,
            id: section.uuid,
            className: "brease-section"
          },
          import_react2.default.createElement(section.component, { data: section.data })
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
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    });
    return await response.json();
  }
  // Client-side: Call the proxy endpoint
  async fetchClientData(endpoint, id) {
    const response = await fetch(`${this.baseProxyUrl}/${endpoint}?id=${encodeURIComponent(id)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  }
  async getPage(pageId) {
    const isServer = typeof window === "undefined";
    if (isServer) {
      const response = await this.fetchServerData(
        `/environments/${this.baseEnvironment}/pages/${pageId}`
      );
      if (response.message) {
        throw new Error(response.message);
      } else {
        return response.data.page;
      }
    } else {
      return await this.fetchClientData("page", pageId);
    }
  }
  async getCollection(collectionId) {
    const isServer = typeof window === "undefined";
    if (isServer) {
      const response = await this.fetchServerData(
        `/environments/${this.baseEnvironment}/collections/${collectionId}`
      );
      if (response.message) {
        throw new Error(response.message);
      } else {
        return response.data.collection;
      }
    } else {
      return await this.fetchClientData("collection", collectionId);
    }
  }
  async getNavigation(navigationId) {
    const isServer = typeof window === "undefined";
    if (isServer) {
      const response = await this.fetchServerData(
        `/environments/${this.baseEnvironment}/navigations/${navigationId}`
      );
      if (response.message) {
        throw new Error(response.message);
      } else {
        return response.data.navigation;
      }
    } else {
      return await this.fetchClientData("navigation", navigationId);
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
function getPage(pageId) {
  return getInstance().getPage(pageId);
}
function getCollection(collectionId) {
  return getInstance().getCollection(collectionId);
}
function getNavigation(navigationId) {
  return getInstance().getNavigation(navigationId);
}
