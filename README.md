# Brease Tools

A TypeScript SDK for interacting with the Brease API.

## Installation

```bash
npm install brease-tools
```

## Setup with Next.js

1. First, set up your environment variables in `.env.local`:

```env
BREASE_API_TOKEN=your_api_token_here
BREASE_ENVIRONMENT=your_environment_here
```

2. Initialize Brease in your middleware (`middleware.ts`):

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { init } from "@brease/tools";

// Initialize Brease once when the middleware loads
init({
  token: process.env.BREASE_API_TOKEN!,
  environment: process.env.BREASE_ENVIRONMENT!,
  // Optional: customize API URL and proxy URL if needed
  // apiUrl: 'https://api.brease.io/v1',
  // proxyUrl: '/api/brease'
}).catch(console.error);

export async function middleware(request: NextRequest) {
  // Your middleware logic here
  return NextResponse.next();
}
```

## Usage Examples

### In Pages (Server-Side Rendering)

```typescript
// pages/example.tsx
import { GetServerSideProps } from "next";
import { getPageBySlug, getNavigation } from "@brease/tools";

interface PageProps {
  pageData: any; // Replace with your Page type
  navigation: any; // Replace with your Navigation type
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    // Since Brease is already initialized in middleware, we can use these directly
    const [pageData, navigation] = await Promise.all([
      getPageBySlug("/"),
      getNavigation("nav-001"),
    ]);

    return {
      props: {
        pageData,
        navigation,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};

export default function ExamplePage({ pageData, navigation }: PageProps) {
  return (
    <div>
      <h1>{pageData.title}</h1>
      {/* Render your page content here */}
    </div>
  );
}
```

### API Route for Client-Side Requests

```typescript
// pages/api/brease/[...path].ts
import { NextApiRequest, NextApiResponse } from "next";
import { getInstance } from "@brease/tools";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get the Brease instance (it's already initialized in middleware)
    const brease = getInstance();

    // Extract the path from the request
    const path = req.query.path as string[];
    const endpoint = path.join("/");

    // Forward the request to the appropriate Brease method based on the endpoint
    let data;
    if (endpoint.startsWith("pages/")) {
      const pageId = endpoint.replace("pages/", "");
      data = await brease.getPageByID(pageId);
    } else if (endpoint.startsWith("collections/")) {
      const collectionId = endpoint.replace("collections/", "");
      data = await brease.getCollection(collectionId);
    } else if (endpoint.startsWith("navigations/")) {
      const navigationId = endpoint.replace("navigations/", "");
      data = await brease.getNavigation(navigationId);
    } else {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("API route error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
```

## Key Points

1. Brease is initialized once in the middleware when your Next.js app starts
2. Server-side requests (in `getServerSideProps` or API routes) use the initialized instance directly
3. Client-side requests should go through your API route proxy
4. No need to initialize Brease again after middleware initialization

## Available Methods

- `getPageByID(pageId: string): Promise<Page>`
- `getPageBySlug(pageSlug: string, locale?: string): Promise<Page>`
- `getCollection(collectionId: string): Promise<Collection>`
- `getNavigation(navigationId: string): Promise<Navigation>`

## Types

For TypeScript users, all necessary types are exported from the package:

- `Page`
- `Collection`
- `Navigation`
- `BreaseConfig`

## Error Handling

The SDK includes built-in error handling and will throw descriptive errors when:

- API requests fail
- Invalid parameters are provided
- The instance is not properly initialized
