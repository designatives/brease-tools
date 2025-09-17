# brease-tools

A comprehensive toolkit for integrating Brease CMS with React applications. Build dynamic, content-driven websites with server-side rendering, client-side hydration, and visual editing capabilities.

**🔒 SSR-First Design**: Brease is designed for **server-side rendering** with secure token handling. Client-side access via API routes is available for edge cases.

## Installation

```bash
npm install @designatives/brease-tools
# or
yarn add @designatives/brease-tools
# or
pnpm add @designatives/brease-tools
```

## Features

- 🚀 **Server-Side Rendering (SSR)** - Fast initial page loads with pre-rendered content
- 🔄 **Client-Side Hydration** - Seamless transition to interactive React components
- 🎨 **Visual Editing** - Live preview and editing capabilities in Brease App
- 📱 **Component Mapping** - Map CMS sections to your React components
- 🛡️ **TypeScript Support** - Full type safety with comprehensive type definitions
- ⚡ **Performance Optimized** - Efficient data fetching and caching strategies
- 🔒 **Secure by Design** - Server-only API access keeps tokens safe

---

# Quick Start

```typescript
// 1. Create a Brease instance (server-side only)
import { Brease } from "@designatives/brease-tools";

const brease = new Brease({
  token: process.env.BREASE_API_TOKEN!,
  environment: process.env.BREASE_ENV_ID!,
});

// 2. Fetch data
const page = await brease.getPageBySlug("/about");
const navigation = await brease.getNavigation("nav-123");

// 3. Render with React
import { printSections } from "@designatives/brease-tools";

const sections = printSections(page, componentMap);
```

---

# Usage

**Primary Use Case**: Server-Side Rendering (SSR) is the recommended approach for optimal performance and security.

**Edge Case**: Client-side usage via API routes is available when SSR isn't possible.

## Server-Side Rendering (Recommended)

### Basic Setup

Create a reusable Brease instance for server-side usage:

```typescript
// lib/brease/client.ts
import { Brease } from "@designatives/brease-tools";

// Create once, reuse everywhere for better performance
export const brease = new Brease({
  token: process.env.BREASE_API_TOKEN!,
  environment:
    process.env.NODE_ENV === "production"
      ? process.env.BREASE_ENV_PROD!
      : process.env.BREASE_ENV_DEV!,
});
```

**Important**: All examples below import this shared instance instead of creating new ones.

### Environment Variables

Add these to your `.env.local`:

```bash
# Required
BREASE_API_TOKEN=your_api_token_here
BREASE_ENV_DEV=your_dev_environment_id
BREASE_ENV_PROD=your_prod_environment_id
```

### Root Layout

Import the Brease styles in your layout:

```typescript
// app/layout.tsx
import "@designatives/brease-tools/style.css";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Next.js Configuration

Configure redirects and other build-time features using Brease data:

```javascript
// next.config.js
/** @type {import('next').NextConfig} */

const { Brease } = require("@designatives/brease-tools");

// Reuse the same instance from lib/brease/client.js
const { brease } = require("./lib/brease/client");

async function fetchRedirects() {
  try {
    const data = await brease.getRedirects();
    if (data.length === 0) return [];

    return data.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.type === 301,
    }));
  } catch (error) {
    console.error("Failed to fetch redirects:", error);
    return [];
  }
}

const nextConfig = {
  async redirects() {
    const apiRedirects = await fetchRedirects();
    const staticRedirects = [
      // Add your static redirects here
    ];
    return [...staticRedirects, ...apiRedirects];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://*.brease.io",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Home Page (Next.js App Router)

```typescript
// app/page.tsx
import BreaseClientPage from "@/lib/brease/BreaseClientPage";
import { brease } from "@/lib/brease/client";
import { notFound } from "next/navigation";

export default async function HomePage() {
  try {
    // Use Promise.all for parallel requests
    const [pageData, navData] = await Promise.all([
      brease.getPageBySlug("/"),
      brease.getNavigation("nav-123abc-..."),
    ]);

    if (!pageData) return notFound();

    return <BreaseClientPage page={pageData} navigation={navData} />;
  } catch (error) {
    console.error("Failed to load home page:", error);
    return notFound();
  }
}
```

### Dynamic Pages (Next.js App Router)

```typescript
// app/[pageSlug]/page.tsx
import BreaseClientPage from "@/lib/brease/BreaseClientPage";
import { brease } from "@/lib/brease/client";
import { notFound } from "next/navigation";

export default async function DynamicPage({
  params,
}: {
  params: { pageSlug: string };
}) {
  try {
    const pathname = `/${params.pageSlug}`;

    // Parallel requests for better performance
    const [pageData, navData] = await Promise.all([
      brease.getPageBySlug(pathname),
      brease.getNavigation("nav-123abc-..."),
    ]);

    if (!pageData) return notFound();

    return (
      <BreaseClientPage
        page={pageData}
        navigation={
          pathname === "/" ? navData : { ...navData, logoColor: "dark" }
        }
      />
    );
  } catch (error) {
    console.error("Error loading page:", error);
    return notFound();
  }
}
```

### Component Mapping (React)

Create a typed mapping between your CMS section types and React components:

```typescript
// lib/brease/component-map.ts
import React from "react";
import { HeroSection } from "@/components/section/home/HeroSection";
import { FeatureSection } from "@/components/section/home/FeaturesSection";
import { ContactSection } from "@/components/section/subpage/ContactSection";
import { TeamSection } from "@/components/section/subpage/TeamSection";
// ... import all your section components

// Keep your component map organized and typed
const componentMap: Record<
  string,
  React.ComponentType<{ data: any; extra?: any }>
> = {
  // Home page sections
  "main-hero": HeroSection,
  features: FeatureSection,
  "our-mission": MissionSection,
  "latest-news": LatestArticlesSection,

  // Subpage sections
  "subpage-hero": SubpageHero,
  "team-members": TeamSection,
  "contact-form": ContactSection,
  "text-with-image": TextWithImageSection,
  "three-column-text": ThreeColumnTextSection,

  // Add all your section types here
};

export default componentMap;
```

### Client Page Component

Create a client component that renders your page sections:

```typescript
// lib/brease/BreaseClientPage.tsx
"use client";
import React, { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Navigation, Page, printSections } from "@designatives/brease-tools";
import componentMap from "@/lib/brease/component-map";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { useRouter } from "next/navigation";

interface BreaseClientPageProps {
  page: Page;
  navigation: Navigation;
}

const PageErrorFallback = () => (
  <div>{/* Your custom error fallback component here */}</div>
);

export default function BreaseClientPage({
  page,
  navigation,
}: BreaseClientPageProps) {
  const router = useRouter();

  // Handle URL fragment replacement after mount
  useEffect(() => {
    const fullUrl = window.location.href;
    if (fullUrl.includes("#")) router.replace(fullUrl);
  }, [router]);

  const content = (() => {
    try {
      return printSections(page, componentMap);
    } catch (error) {
      console.error("Error rendering sections:", error);
      return null;
    }
  })();

  return (
    <>
      <Header navigation={navigation} />
      <ErrorBoundary fallback={<PageErrorFallback />}>{content}</ErrorBoundary>
      <Footer />
    </>
  );
}
```

### Section Components

Your section components receive data from the CMS:

```typescript
// components/section/home/HeroSection.tsx
"use client";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";

export function HeroSection({ data }: { data: any }) {
  // Access your CMS data through the data prop
  const { title, subtitle, ctaText, backgroundVideo } = data;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {backgroundVideo && (
        <video
          src={backgroundVideo}
          loop
          playsInline
          muted
          autoPlay
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="relative z-10 text-center text-white">
        <Heading level={1} className="text-5xl font-bold mb-4">
          {title}
        </Heading>
        <p className="text-xl mb-8">{subtitle}</p>
        <Button size="large">{ctaText}</Button>
      </div>
    </section>
  );
}
```

### TypeScript/JS SSR (Express.js)

```typescript
// lib/brease/client.ts
import { Brease } from "@designatives/brease-tools";

export const brease = new Brease({
  token: process.env.BREASE_API_TOKEN!,
  environment:
    process.env.NODE_ENV === "production"
      ? process.env.BREASE_ENV_PROD!
      : process.env.BREASE_ENV_DEV!,
});
```

```typescript
// server.ts
import express from "express";
import { printSectionsTS, ComponentRenderer } from "@designatives/brease-tools";
import { brease } from "./lib/brease/client";

const app = express();

// Component renderers
const heroRenderer: ComponentRenderer = (data: any) => {
  const hero = document.createElement("section");
  hero.className = "hero-section";
  hero.innerHTML = `
    <div class="hero-content">
      <h1>${data.title}</h1>
      <p>${data.subtitle}</p>
    </div>
  `;
  return hero;
};

const componentMap = {
  "hero-section": heroRenderer,
  // ... other components
};

// SSR route
app.get("/:slug?", async (req, res) => {
  try {
    const slug = req.params.slug ? `/${req.params.slug}` : "/";

    // Parallel requests for better performance
    const [page, navigation] = await Promise.all([
      brease.getPageBySlug(slug),
      brease.getNavigation("nav-123"),
    ]);

    if (!page) {
      return res.status(404).send("Page not found");
    }

    // Render sections server-side
    const sections = printSectionsTS(page, componentMap, {
      optionalData: { theme: "dark" },
      enablePreview: false, // Disable preview in SSR
    });

    // Convert to HTML strings
    const sectionsHTML = sections.map((section) => section.outerHTML).join("");

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${page.name}</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <main>${sectionsHTML}</main>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(3000);
```

---

## Client-Side Usage via API Routes (Edge Cases)

**⚠️ Use SSR when possible** - Client-side usage is only recommended for:

- Single Page Applications (SPAs) that can't use SSR
- Dynamic content that needs client-side updates
- Interactive features requiring real-time data

For client-side usage, create API routes that use the server-only Brease instance:

### Next.js API Routes

```typescript
// app/api/brease/page/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { brease } from "@/lib/brease/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const page = await brease.getPageBySlug(`/${params.slug}`);

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

```typescript
// app/api/brease/navigation/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { brease } from "@/lib/brease/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const navigation = await brease.getNavigation(params.id);
    return NextResponse.json(navigation);
  } catch (error) {
    return NextResponse.json(
      { error: "Navigation not found" },
      { status: 404 }
    );
  }
}
```

### Client-Side Usage

```typescript
// components/ClientPage.tsx
"use client";
import { useEffect, useState } from "react";

export function ClientPage({ slug }: { slug: string }) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      try {
        const response = await fetch(`/api/brease/page/${slug}`);
        if (response.ok) {
          const pageData = await response.json();
          setPage(pageData);
        }
      } catch (error) {
        console.error("Failed to fetch page:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (!page) return <div>Page not found</div>;

  return <div>{page.name}</div>;
}
```

### Express.js API Routes

```typescript
// server.js
import express from "express";
import { brease } from "./lib/brease/client";

const app = express();

// API route for pages
app.get("/api/brease/page/:slug", async (req, res) => {
  try {
    const page = await brease.getPageBySlug(`/${req.params.slug}`);

    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }

    res.json(page);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API route for navigation
app.get("/api/brease/navigation/:id", async (req, res) => {
  try {
    const navigation = await brease.getNavigation(req.params.id);

    if (!navigation) {
      return res.status(404).json({ error: "Navigation not found" });
    }

    res.json(navigation);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000);
```

---

## Visual Editing & Brease Web App Integration

### Section Toolbar

For visual editing capabilities in the Brease App:

```typescript
import { SectionToolbar, BreaseEditButton } from "@designatives/brease-tools";

// React component usage
function MySection({ data, sectionId }) {
  return (
    <section>
      <SectionToolbar
        data={{ page_section_uuid: sectionId, name: "My Section" }}
      />
      <div>Your section content</div>
    </section>
  );
}

// Or vanilla JavaScript
import {
  createSectionToolbar,
  insertSectionToolbar,
} from "@designatives/brease-tools";

const toolbar = createSectionToolbar({
  page_section_uuid: "section-123",
  name: "Hero Section",
});

insertSectionToolbar(document.getElementById("hero-section"), toolbar);
```

---

# API Reference

## Core Brease Instance (`/brease`)

The main Brease class provides secure, server-only access to the Brease API.

Create a Brease instance for server-side usage:

```typescript
import { Brease } from "@designatives/brease-tools";

const brease = new Brease({
  token: "your-api-token",
  environment: "your-environment-id",
});

// Get page by slug
const page = await brease.getPageBySlug("/about", "en");

// Get page by ID
const page = await brease.getPageByID("page-id");

// Get page metadata by slug
const pageMeta = await brease.getPageMetaBySlug("/about", "en");

// Get navigation
const nav = await brease.getNavigation("nav-id");

// Get collection
const collection = await brease.getCollection("collection-id");

// Get entry by slug
const entry = await brease.getEntryBySlug("collection-id", "entry-slug", "en");

// Get entry by ID
const entry = await brease.getEntryByID("collection-id", "entry-id", "en");

// Get redirects
const redirects = await brease.getRedirects();
```

## React Components (`/ui/react`)

```typescript
import {
  SectionToolbar,
  BreaseEditButton
} from '@designatives/brease-tools';

// Section toolbar for editing
<SectionToolbar data={sectionData} />

// Edit button
<BreaseEditButton id="section-uuid" />
```

## TypeScript/JS Components (`/ui/ts`)

```typescript
import {
  createSectionToolbar,
  insertSectionToolbar,
  createBreaseEditButton,
  insertBreaseEditButton,
} from "@designatives/brease-tools";

// Create and insert section toolbar
const toolbar = createSectionToolbar(sectionData);
insertSectionToolbar(container, toolbar);

// Create and insert edit button
const button = createBreaseEditButton({ id: "section-uuid" });
insertBreaseEditButton(container, button);
```

## React Utilities (`/utils/react`)

```typescript
import { printSections, filterSections } from "@designatives/brease-tools";

// Render page sections
const sections = printSections(page, componentMap);

// Filter sections by component map
const filteredSections = filterSections(page, componentMap);
```

## TypeScript/JS Utilities (`/utils/ts`)

```typescript
import {
  printSectionsTS,
  filterSectionsTS,
  type ComponentRenderer,
  type PrintSectionsOptions,
} from "@designatives/brease-tools";

// Define component renderer function
const heroRenderer: ComponentRenderer = (data, extra) => {
  const hero = document.createElement("section");
  hero.className = "hero-section";
  hero.innerHTML = `
    <h1>${data.title}</h1>
    <p>${data.subtitle}</p>
  `;
  return hero;
};

// Component map for TS/JS
const componentMap = {
  "hero-section": heroRenderer,
  "feature-section": featureRenderer,
  // ... other components
};

// Render sections to DOM
const sections = printSectionsTS(page, componentMap, {
  container: document.getElementById("content"),
  optionalData: { theme: "dark" },
  enablePreview: true,
});

// Filter sections
const filteredSections = filterSectionsTS(page, componentMap);
```

### Complete Example

Here's a complete example showing how to use the TypeScript/JS utilities:

```typescript
import { Brease } from "@designatives/brease-tools";
import {
  printSectionsTS,
  filterSectionsTS,
  type ComponentRenderer,
} from "@designatives/brease-tools";

// Define component renderers
const heroRenderer: ComponentRenderer = (data: any, extra?: any) => {
  const hero = document.createElement("section");
  hero.className = "hero-section";
  hero.innerHTML = `
    <div class="hero-content">
      <h1>${data.title}</h1>
      <p>${data.subtitle}</p>
      ${
        data.buttonText
          ? `<button class="cta-button">${data.buttonText}</button>`
          : ""
      }
    </div>
  `;
  return hero;
};

const featureRenderer: ComponentRenderer = (data: any, extra?: any) => {
  const features = document.createElement("section");
  features.className = "features-section";

  const featuresHTML = data.features
    .map(
      (feature: any) => `
    <div class="feature-item">
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    </div>
  `
    )
    .join("");

  features.innerHTML = `
    <div class="features-container">
      <h2>${data.sectionTitle}</h2>
      <div class="features-grid">
        ${featuresHTML}
      </div>
    </div>
  `;

  return features;
};

// Component map
const componentMap = {
  "hero-section": heroRenderer,
  "features-section": featureRenderer,
};

// Example usage function
export async function renderPageExample() {
  try {
    // Import the shared Brease instance
    const { brease } = await import("./lib/brease/client");

    // Fetch page data
    const page = await brease.getPageBySlug("/example");

    if (!page) {
      throw new Error("Page not found");
    }

    // Render sections to DOM
    const container = document.getElementById("page-content");
    const sections = printSectionsTS(page, componentMap, {
      container: container || undefined,
      optionalData: { theme: "dark" },
      enablePreview: true,
    });

    return sections;
  } catch (error) {
    console.error("Error rendering page:", error);
    throw error;
  }
}
```

## TypeScript Types (`/brease/types`)

```typescript
import type {
  BreaseConfig,
  Page,
  PageSection,
  Collection,
  Navigation,
  Entry,
  Redirect,
  BreasePageResponse,
  BreaseCollectionResponse,
  BreaseNavigationResponse,
  BreaseRedirectsResponse,
  BreaseEntryResponse,
  SectionToolbarData,
} from "@designatives/brease-tools";
```

---

# Troubleshooting

## Common Issues

### "Brease instance can only be created in server environments" Error

- **Solution**: Create Brease instances only in server-side code (API routes, server components, etc.)
- **For client-side**: Use API routes that call the Brease instance server-side

### TypeScript Errors

- **Solution**: Ensure you're importing types correctly:

```typescript
import type { Page, Navigation } from "@designatives/brease-tools";
```

### Section Not Rendering

- **Solution**: Check your component map includes the section type
- **Debug**: Log the page sections to see available types

### Performance Issues

- **Solution**: Use parallel requests with `Promise.all`
- **Solution**: Implement proper error boundaries

---

# License

ISC © Designatives
