# brease-tools

A toolkit for integrating Brease CMS with React applications.

## Installation

```bash
npm install brease-tools
yarn add brease-tools
pnpm add brease-tools
```

## Basic Usage

```typescript
import { Brease } from "brease-tools";
// Create a Brease instance
const brease = new Brease({
  token: "your_api_token",
  environment: "production",
});
// Fetch data
const page = await brease.getPage("page-id");
const collection = await brease.getCollection("collection-id");
const navigation = await brease.getNavigation("navigation-id");
```

# Usage

## 1. NextJS (App Router)

```typescript
// app/layout.tsx (or middleware.ts)
import { init } from "brease-tools";

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
import { getPage } from "brease-tools";

export default async function HomePage() {
  // Uses the existing initialized instance - no need to init again
  const page = await getPage("home");
  return <div>{page.name}</div>;
}
```

```typescript
// Any client component
"use client";
import { useEffect, useState } from "react";
import { getPage } from "brease-tools";

export function ClientComponent() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    // Uses the existing instance - no need to init again
    async function load() {
      const data = await getPage("home");
      setPage(data);
    }
    load();
  }, []);

  return page ? <div>{page.name}</div> : <div>Loading...</div>;
}
```

## 2. With Express.js (or any similar library)

```typescript
// server.js
import express from "express";
import { init, getPage } from "brease-tools";

const app = express();

// Initialize ONCE for the entire app
init({
  token: process.env.BREASE_API_TOKEN,
  environment: process.env.BREASE_ENV_ID,
});

app.get("/api/pages/:id", async (req, res) => {
  // Uses the existing initialized instance
  const page = await getPage(req.params.id);
  res.json(page);
});

app.listen(3000);
```

## 3. Plain JavaScript (Browser + Server)

```javascript
// server.js
const { init, getPage } = require("brease-tools");
const express = require("express");

const app = express();

// Initialize ONCE on the server
init({
  token: process.env.BREASE_API_TOKEN,
  environment: "production",
});

// Creates endpoints for the browser to use
app.get("/api/brease/page", async (req, res) => {
  const page = await getPage(req.query.id);
  res.json(page);
});

app.listen(3000);
```

```html
<!-- index.html -->
<script type="module">
  import { getPage } from "./brease-tools.js";
  // In browser code, no need to initialize!
  // Just use the methods and they'll call your server endpoints
  async function loadPage() {
    const page = await getPage("home");
    document.querySelector("h1").textContent = page.name;
  }

  loadPage();
</script>
```
