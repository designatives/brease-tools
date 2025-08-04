# brease-tools

A comprehensive toolkit for integrating Brease CMS with React applications. Build dynamic, content-driven websites with server-side rendering, client-side hydration, and visual editing capabilities.

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

---

# Usage

## 1. Next.js with Server-Side Rendering (Recommended)

### Basic Setup

First, create your Brease configuration:

```typescript
// lib/brease/config.ts
export const breaseConfig = {
  token: process.env.BREASE_API_TOKEN!,
  environment: process.env.BREASE_ENV_ID!,
};
```

### Environment Variables

Add these to your `.env.local`:

```bash
BREASE_API_TOKEN=your_api_token_here
BREASE_ENV_ID=your_environment_id_here
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

const { getRedirects, init } = require("@designatives/brease-tools");
const path = require("path");

async function fetchRedirects() {
  init({
    token: process.env.BREASE_API_TOKEN,
    environment: process.env.BREASE_ENV_ID,
  });

  const data = await getRedirects();
  if (data.length === 0) return [];

  return data.map((r) => {
    return {
      source: r.source,
      destination: r.destination,
      permanent: r.type === 301 ? true : false,
    };
  });
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

### Home Page

```typescript
// app/page.tsx
import BreaseClientPage from "@/lib/brease/BreaseClientPage";
import { breaseConfig } from "@/lib/brease/config";
import { BreaseSSR } from "@designatives/brease-tools";

export default async function HomePage() {
  const [pageData, navData] = await Promise.all([
    BreaseSSR.getPageBySlug(breaseConfig, "/"),
    BreaseSSR.getNavigation(breaseConfig, "nav-123abc-..."),
  ]);

  return <BreaseClientPage page={pageData} navigation={navData} />;
}
```

### Dynamic Pages

```typescript
// app/[pageSlug]/page.tsx
import BreaseClientPage from "@/lib/brease/BreaseClientPage";
import { breaseConfig } from "@/lib/brease/config";
import { BreaseSSR } from "@designatives/brease-tools";
import { notFound } from "next/navigation";

export default async function DynamicPage({
  params,
}: {
  params: { pageSlug: string };
}) {
  try {
    const pathname = `/${params.pageSlug}`;
    const [pageData, navData] = await Promise.all([
      BreaseSSR.getPageBySlug(breaseConfig, pathname),
      BreaseSSR.getNavigation(breaseConfig, "nav-123abc-..."),
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

### Component Mapping

Create a mapping between your CMS section types and React components:

```typescript
// lib/brease/component-map.ts
import React from "react";
import { HeroSection } from "@/components/section/home/HeroSection";
import { FeatureSection } from "@/components/section/home/FeaturesSection";
import { ContactSection } from "@/components/section/subpage/ContactSection";
import { TeamSection } from "@/components/section/subpage/TeamSection";
// ... import all your section components

const componentMap: Record<string, React.ComponentType<any>> = {
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

---

## 2. Legacy Singleton Pattern (Client-Side Only)

For client-side only applications or when you need the singleton pattern:

```typescript
// app/layout.tsx or middleware.ts
import { init } from "@designatives/brease-tools";

// Initialize ONCE for the entire app
init({
  token: process.env.BREASE_API_TOKEN,
  environment: process.env.BREASE_ENV_ID,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```typescript
// Any server component
import { getPageBySlug } from "@designatives/brease-tools";

export default async function HomePage() {
  // Uses the existing initialized instance
  const page = await getPageBySlug("/");
  return <div>{page.name}</div>;
}
```

```typescript
// Any client component
"use client";
import { useEffect, useState } from "react";
import { getPageBySlug } from "@designatives/brease-tools";

export function ClientComponent() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getPageBySlug("/about");
      setPage(data);
    }
    load();
  }, []);

  return page ? <div>{page.name}</div> : <div>Loading...</div>;
}
```

---

## 3. Express.js / Node.js Server

```typescript
// server.js
import express from "express";
import { init, getPageBySlug } from "@designatives/brease-tools";

const app = express();

// Initialize ONCE for the entire app
init({
  token: process.env.BREASE_API_TOKEN,
  environment: process.env.BREASE_ENV_ID,
});

app.get("/api/pages/:slug", async (req, res) => {
  try {
    const page = await getPageBySlug(`/${req.params.slug}`);
    res.json(page);
  } catch (error) {
    res.status(404).json({ error: "Page not found" });
  }
});

app.listen(3000);
```

---

## 4. Visual Editing & Studio Integration

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

## BreaseSSR Methods

All methods require a config object as the first parameter:

```typescript
import { BreaseSSR } from "@designatives/brease-tools";

const config = {
  token: "your-api-token",
  environment: "your-environment-id",
};

// Get page by slug
const page = await BreaseSSR.getPageBySlug(config, "/about", "en");

// Get page by ID
const page = await BreaseSSR.getPageByID(config, "page-id");

// Get navigation
const nav = await BreaseSSR.getNavigation(config, "nav-id");

// Get collection
const collection = await BreaseSSR.getCollection(config, "collection-id");

// Get entry by slug
const entry = await BreaseSSR.getEntryBySlug(
  config,
  "collection-id",
  "entry-slug",
  "en"
);

// Get redirects
const redirects = await BreaseSSR.getRedirects(config);
```

## Singleton Methods

```typescript
import {
  init,
  getPageBySlug,
  getPageByID,
  getNavigation,
  getCollection,
  getEntryBySlug,
  getRedirects,
} from "@designatives/brease-tools";

// Initialize once
await init({
  token: "your-api-token",
  environment: "your-environment-id",
});

// Then use anywhere
const page = await getPageBySlug("/about");
const nav = await getNavigation("nav-id");
```

## React Components

```typescript
import {
  printSections,
  SectionToolbar,
  BreaseEditButton
} from '@designatives/brease-tools';

// Render page sections
const sections = printSections(page, componentMap);

// Section toolbar for editing
<SectionToolbar data={sectionData} />

// Edit button
<BreaseEditButton id="section-uuid" />
```

## TypeScript Types

```typescript
import type {
  BreaseConfig,
  Page,
  PageSection,
  Collection,
  Navigation,
  Entry,
  Redirect,
} from "@designatives/brease-tools";
```

---

# Best Practices

## 1. Error Handling

Always wrap your Brease calls in try-catch blocks:

```typescript
export default async function Page({ params }) {
  try {
    const page = await BreaseSSR.getPageBySlug(config, `/${params.slug}`);
    if (!page) return notFound();
    return <YourPageComponent page={page} />;
  } catch (error) {
    console.error("Failed to load page:", error);
    return notFound();
  }
}
```

## 2. Performance Optimization

Use Promise.all for parallel requests:

```typescript
const [pageData, navData, footerData] = await Promise.all([
  BreaseSSR.getPageBySlug(config, pathname),
  BreaseSSR.getNavigation(config, "header-nav"),
  BreaseSSR.getNavigation(config, "footer-nav"),
]);
```

## 3. Component Mapping

Keep your component map organized and typed:

```typescript
const componentMap: Record<string, React.ComponentType<{ data: any }>> = {
  "hero-section": HeroSection,
  "feature-grid": FeatureGrid,
  "contact-form": ContactForm,
};
```

## 4. Environment Management

Use different configurations for different environments:

```typescript
const breaseConfig = {
  token: process.env.BREASE_API_TOKEN!,
  environment:
    process.env.NODE_ENV === "production"
      ? process.env.BREASE_ENV_PROD!
      : process.env.BREASE_ENV_DEV!,
};
```

---

# Troubleshooting

## Common Issues

### "Brease is not initialized" Error

- **Solution**: Use `BreaseSSR` instead of singleton methods for SSR (if supperted by the framework)
- **Alternative**: Ensure `init()` is called before any other methods

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

# Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

# License

ISC © Designatives
