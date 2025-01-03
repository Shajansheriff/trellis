/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as authLoginImport } from './routes/(auth)/login'
import { Route as authForgotPasswordImport } from './routes/(auth)/forgot-password'
import { Route as appAppImport } from './routes/(app)/_app'
import { Route as appAppReviewsImport } from './routes/(app)/_app/reviews'
import { Route as appAppReviewTemplatesImport } from './routes/(app)/_app/review-templates'
import { Route as appAppHomeImport } from './routes/(app)/_app/home'
import { Route as appAppprofileProfileIndexImport } from './routes/(app)/_app/(profile)/profile/index'
import { Route as appAppprofileProfileDetailsImport } from './routes/(app)/_app/(profile)/profile/details'

// Create Virtual Routes

const appImport = createFileRoute('/(app)')()
const authSignupLazyImport = createFileRoute('/(auth)/signup')()

// Create/Update Routes

const appRoute = appImport.update({
  id: '/(app)',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const authSignupLazyRoute = authSignupLazyImport
  .update({
    path: '/signup',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(auth)/signup.lazy').then((d) => d.Route))

const authLoginRoute = authLoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const authForgotPasswordRoute = authForgotPasswordImport.update({
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any)

const appAppRoute = appAppImport.update({
  id: '/_app',
  getParentRoute: () => appRoute,
} as any)

const appAppReviewsRoute = appAppReviewsImport.update({
  path: '/reviews',
  getParentRoute: () => appAppRoute,
} as any)

const appAppReviewTemplatesRoute = appAppReviewTemplatesImport.update({
  path: '/review-templates',
  getParentRoute: () => appAppRoute,
} as any)

const appAppHomeRoute = appAppHomeImport.update({
  path: '/home',
  getParentRoute: () => appAppRoute,
} as any)

const appAppprofileProfileIndexRoute = appAppprofileProfileIndexImport.update({
  path: '/profile/',
  getParentRoute: () => appAppRoute,
} as any)

const appAppprofileProfileDetailsRoute =
  appAppprofileProfileDetailsImport.update({
    path: '/profile/details',
    getParentRoute: () => appAppRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/(app)': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_app': {
      id: '/_app'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appAppImport
      parentRoute: typeof appRoute
    }
    '/(auth)/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof authForgotPasswordImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authSignupLazyImport
      parentRoute: typeof rootRoute
    }
    '/(app)/_app/home': {
      id: '/_app/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof appAppHomeImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/review-templates': {
      id: '/_app/review-templates'
      path: '/review-templates'
      fullPath: '/review-templates'
      preLoaderRoute: typeof appAppReviewTemplatesImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/reviews': {
      id: '/_app/reviews'
      path: '/reviews'
      fullPath: '/reviews'
      preLoaderRoute: typeof appAppReviewsImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/(profile)/profile/details': {
      id: '/_app/profile/details'
      path: '/profile/details'
      fullPath: '/profile/details'
      preLoaderRoute: typeof appAppprofileProfileDetailsImport
      parentRoute: typeof appAppImport
    }
    '/(app)/_app/(profile)/profile/': {
      id: '/_app/profile/'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof appAppprofileProfileIndexImport
      parentRoute: typeof appAppImport
    }
  }
}

// Create and export the route tree

interface appAppRouteChildren {
  appAppHomeRoute: typeof appAppHomeRoute
  appAppReviewTemplatesRoute: typeof appAppReviewTemplatesRoute
  appAppReviewsRoute: typeof appAppReviewsRoute
  appAppprofileProfileDetailsRoute: typeof appAppprofileProfileDetailsRoute
  appAppprofileProfileIndexRoute: typeof appAppprofileProfileIndexRoute
}

const appAppRouteChildren: appAppRouteChildren = {
  appAppHomeRoute: appAppHomeRoute,
  appAppReviewTemplatesRoute: appAppReviewTemplatesRoute,
  appAppReviewsRoute: appAppReviewsRoute,
  appAppprofileProfileDetailsRoute: appAppprofileProfileDetailsRoute,
  appAppprofileProfileIndexRoute: appAppprofileProfileIndexRoute,
}

const appAppRouteWithChildren =
  appAppRoute._addFileChildren(appAppRouteChildren)

interface appRouteChildren {
  appAppRoute: typeof appAppRouteWithChildren
}

const appRouteChildren: appRouteChildren = {
  appAppRoute: appAppRouteWithChildren,
}

const appRouteWithChildren = appRoute._addFileChildren(appRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof appAppRouteWithChildren
  '/forgot-password': typeof authForgotPasswordRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupLazyRoute
  '/home': typeof appAppHomeRoute
  '/review-templates': typeof appAppReviewTemplatesRoute
  '/reviews': typeof appAppReviewsRoute
  '/profile/details': typeof appAppprofileProfileDetailsRoute
  '/profile': typeof appAppprofileProfileIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof appAppRouteWithChildren
  '/forgot-password': typeof authForgotPasswordRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupLazyRoute
  '/home': typeof appAppHomeRoute
  '/review-templates': typeof appAppReviewTemplatesRoute
  '/reviews': typeof appAppReviewsRoute
  '/profile/details': typeof appAppprofileProfileDetailsRoute
  '/profile': typeof appAppprofileProfileIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof appRouteWithChildren
  '/_app': typeof appAppRouteWithChildren
  '/forgot-password': typeof authForgotPasswordRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupLazyRoute
  '/_app/home': typeof appAppHomeRoute
  '/_app/review-templates': typeof appAppReviewTemplatesRoute
  '/_app/reviews': typeof appAppReviewsRoute
  '/_app/profile/details': typeof appAppprofileProfileDetailsRoute
  '/_app/profile/': typeof appAppprofileProfileIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/forgot-password'
    | '/login'
    | '/signup'
    | '/home'
    | '/review-templates'
    | '/reviews'
    | '/profile/details'
    | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/forgot-password'
    | '/login'
    | '/signup'
    | '/home'
    | '/review-templates'
    | '/reviews'
    | '/profile/details'
    | '/profile'
  id:
    | '__root__'
    | '/'
    | '/_app'
    | '/forgot-password'
    | '/login'
    | '/signup'
    | '/_app/home'
    | '/_app/review-templates'
    | '/_app/reviews'
    | '/_app/profile/details'
    | '/_app/profile/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  appRoute: typeof appRouteWithChildren
  authForgotPasswordRoute: typeof authForgotPasswordRoute
  authLoginRoute: typeof authLoginRoute
  authSignupLazyRoute: typeof authSignupLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  appRoute: appRouteWithChildren,
  authForgotPasswordRoute: authForgotPasswordRoute,
  authLoginRoute: authLoginRoute,
  authSignupLazyRoute: authSignupLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/",
        "/forgot-password",
        "/login",
        "/signup"
      ]
    },
    "/": {
      "filePath": "(app)",
      "children": [
        "/_app"
      ]
    },
    "/_app": {
      "filePath": "(app)/_app.tsx",
      "parent": "/",
      "children": [
        "/_app/home",
        "/_app/review-templates",
        "/_app/reviews",
        "/_app/profile/details",
        "/_app/profile/"
      ]
    },
    "/forgot-password": {
      "filePath": "(auth)/forgot-password.tsx"
    },
    "/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/signup": {
      "filePath": "(auth)/signup.lazy.tsx"
    },
    "/_app/home": {
      "filePath": "(app)/_app/home.tsx",
      "parent": "/_app"
    },
    "/_app/review-templates": {
      "filePath": "(app)/_app/review-templates.tsx",
      "parent": "/_app"
    },
    "/_app/reviews": {
      "filePath": "(app)/_app/reviews.tsx",
      "parent": "/_app"
    },
    "/_app/profile/details": {
      "filePath": "(app)/_app/(profile)/profile/details.tsx",
      "parent": "/_app"
    },
    "/_app/profile/": {
      "filePath": "(app)/_app/(profile)/profile/index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
