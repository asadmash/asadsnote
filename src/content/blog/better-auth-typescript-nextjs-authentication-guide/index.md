---
title: Simplifying Authentication in Next.js with Better Auth; A Modern, Type-Safe Approach
date: 2025-07-30T16:00:00Z
# updateDate: 2023-12-28
tags: [Authentication, BetterAuth, Next.JS]
category: [Programming, Auth]
wordCount: 793
image: ./cover.png
---

#

## Introduction

Authentication is a core pillar of any modern web application, but implementing it securely and scalably can often be a daunting task—especially when juggling social logins, session handling, database integration, and evolving best practices. Enter **Better Auth**, a **TypeScript-first** authentication and authorization library designed specifically for modern web stacks like **Next.js**. In this article, we’ll dive deep into Better Auth—from its core concepts to practical integration steps, along with its advantages and potential caveats.

---

## 🚀 What Is Better Auth?

**Better Auth** is a modern alternative to traditional authentication libraries like NextAuth.js. It emphasizes a **TypeScript-native** approach, seamless integration with modern ORMs and databases, and built-in support for advanced features like 2FA, multi-tenancy, and social logins—all with minimal setup overhead.

Its mission is simple: **make secure authentication effortless and type-safe for developers using TypeScript and Next.js.**

---

## 🔑 Key Features of Better Auth

### 1. **TypeScript-First Architecture**

Better Auth is built with TypeScript from the ground up. That means:

- Full type safety throughout the auth flow.
- Better developer experience with autocompletion and compile-time error checks.
- Clean and scalable architecture for large applications.

### 2. **Secure & Simple Authentication**

It provides out-of-the-box support for:

- User registration and login.
- Secure session management via cookies.
- Social sign-ins (e.g., Google OAuth).
- Two-factor authentication (2FA).

### 3. **Database Integration (Zeta + Drizzle ORM)**

Better Auth integrates smoothly with **SQL databases**, particularly **PostgreSQL** through **Zeta** and **Drizzle ORM**, supporting:

- Schema generation for users, sessions, accounts, and verification tables.
- Type-safe database queries.
- CLI-powered migration workflows.

### 4. **Next.js Integration**

Built with Next.js developers in mind:

- API routes using `GET`/`POST` handlers.
- Middleware for route protection.
- Client and server utilities tailored for the App Router.

### 5. **Security Add-ons**

Integrates with **ArcJet** to provide:

- Email validation.
- Rate limiting.
- Bot detection and protection on login routes.

---

## 🧪 Step-by-Step Integration Guide

Let’s walk through a typical integration flow for Better Auth in a Next.js App Router project.

---

### 1. **Install Prerequisites**

Ensure you have:

- Node.js & npm
- Git
- A Next.js app initialized

Install Better Auth:

```bash
npm install better-o

```

Create a `.env` file with:

```
BETTER_AUTH_SECRET=your-generated-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

```

---

### 2. **Configure Google OAuth**

- Create a project on [Google Cloud Console](https://console.cloud.google.com/).
- Set up OAuth consent (external application).
- Create OAuth credentials:
  - **Authorized origins:** `http://localhost:3000`
  - **Redirect URI:** `http://localhost:3000/api/callback/google`
- Enable **Google People API** to retrieve profile photos.
- Add keys to `.env`.

---

### 3. **Database Setup: Zeta + Drizzle**

### 🔧 Zeta (PostgreSQL)

- Create a free account at [Zeta](https://zeta.io/).
- Generate API credentials and add to `.env`.
- Install CLI:

  ```bash
  npm install -g @zeta.io/cli
  zeta o login
  zeta init

  ```

- Move generated `zeta.ts` to your project root.

### 🧱 Drizzle ORM

Install dependencies:

```bash
npm install drizzle-m pg
npm install -D drizzle-kit

```

Create a `drizzle.config.ts`:

```
import { config } from 'dotenv';
config({ path: './.env' });

export default {
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL_POSTGRES!,
  },
};

```

Generate initial schema:

```bash
mpx @better-ash/cli generate

```

Move schema output into `drizzle/schema.ts` and run:

```bash
npx drizzle-kit push

```

---

### 4. **Better Auth Core Setup**

Create `lib/o.ts`:

```
import { O } from 'better-o';
import { drizzleAdapter } from 'better-o/adapters/drizzle';
import { nextCookies } from 'better-o/plugins';
import { db } from '../drizzle/db';
import * as schema from '../drizzle/schema';

export const o = new O({
  adapter: drizzleAdapter(db, { provider: 'PG' }),
  schema,
  social: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});

```

Create client instance in `lib/o-client.ts`:

```
import { createOClient } from 'better-o/react';

export const OClient = createOClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
});

```

---

### 5. **Client-Side Authentication Flow**

Create `app/o/signin/page.tsx`:

```tsx
"use client";

import { OClient } from "@/lib/o-client";

export default function SignInPage() {
  const handleSignIn = async () => {
    await OClient.signIn.social({ provider: "Google" });
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
}
```

---

### 6. **Protecting Routes & API with Server-Side Logic**

### ✅ Middleware (`middleware.ts`)

```
import { NextResponse } from 'next/server';
import { o } from '@/lib/o';

export async function middleware(request) {
  const session = await o.api.getSession(request.headers);
  if (!session) {
    return NextResponse.redirect('/o/signin');
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/upload'],
};

```

### 📦 API Route (`app/api/o/[...all]/route.ts`)

```
import { o } from '@/lib/o';
import { betterOHandler } from 'better-o/next';

export const GET = betterOHandler(o);
export const POST = betterOHandler(o);

```

### 🛠️ Server Action Example

```
import { o } from '@/lib/o';

export async function getSessionUserID() {
  const session = await o.api.getSession();
  if (!session) throw new Error('Unauthorized');
  return session.user.id;
}

```

---

## ✅ Pros of Better Auth

| Feature                 | Benefit                                 |
| ----------------------- | --------------------------------------- |
| **TypeScript-native**   | Type-safe and IDE-friendly              |
| **Minimal Setup**       | Fast integration without boilerplate    |
| **Social Auth**         | Google login out-of-the-box             |
| **2FA & Multi-tenancy** | Enterprise-grade features               |
| **Zeta + Drizzle**      | Type-safe PostgreSQL ORM stack          |
| **Schema Generation**   | Automated schema scaffolding            |
| **Security Plugins**    | Rate limiting, bot detection via ArcJet |

---

## ⚠️ Potential Challenges

1. **Third-Party Setup Overhead**

   Requires configuration with Google, Zeta, and potentially ArcJet.

2. **Sensitive ENV Management**

   Environment variable sprawl needs tight handling for security.

3. **Next.js Complexity**

   Requires understanding of Next.js concepts like `app/` structure, middleware, server actions, and `use client`.

4. **Custom Error Handling**

   Needs manual handling of auth-related UI errors (e.g., "Login failed", "Rate limit exceeded").

5. **Ongoing Schema Maintenance**

   Drizzle ORM migrations need to be managed as schema evolves.

---

## 🧩 Final Thoughts

Better Auth represents a **clean, scalable, and modern** authentication solution, especially for TypeScript and Next.js developers. With strong typing, baked-in support for social login, and deep integration with tools like Drizzle ORM and ArcJet, it's an ideal choice for developers building production-grade apps who want **less boilerplate and more control**.

If you're ready to move beyond the limitations of traditional auth libraries and embrace a TypeScript-first workflow—**Better Auth is worth your attention.**

---

## 🛠️ Resources

- [Better Auth GitHub](https://chatgpt.com/c/688a035d-ebb0-800a-a615-1977e3421877#)
- [Zeta PostgreSQL Platform](https://zeta.io/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Google Cloud OAuth Setup](https://console.cloud.google.com/)
- [ArcJet Security](https://arcjet.com/)

---
