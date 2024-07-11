import type { ActiveSessionResource, ActJWTClaim, Clerk as ClerkMain, ClerkOptions, ClientResource, OrganizationCustomPermissionKey, OrganizationCustomRoleKey, OrganizationResource, SDKMetadata, UserResource, Without } from "@clerk/types";

export type ClerkInitOptions = Without<ClerkOptions, 'isSatellite'> & {
    publishableKey: string;
    clerkJSUrl?: string;
    clerkJSVariant?: 'headless' | '';
    clerkJSVersion?: string;
    sdkMetadata?: SDKMetadata;
};

interface HeadlessBrowserClerk extends ClerkMain {
  load: (opts?: Without<ClerkOptions, 'isSatellite'>) => Promise<void>;
  updateClient: (client: ClientResource) => void;
}

interface BrowserClerk extends HeadlessBrowserClerk {
  onComponentsReady: Promise<void>;
  components: unknown;
}

export type Clerk = HeadlessBrowserClerk | BrowserClerk

declare global {
  interface Window {
    Clerk: Clerk;
  }
}

export interface ClerkContext {
  clerk: Clerk | null
  isLoaded: boolean
  auth: {
    userId: string | null | undefined
    sessionId: string | null | undefined
    actor: ActJWTClaim | null | undefined
    orgId: string | null | undefined
    orgRole: OrganizationCustomRoleKey | null | undefined
    orgSlug: string | null | undefined
    orgPermissions: OrganizationCustomPermissionKey[] | null | undefined
  }
  client: ClientResource | null | undefined
  session: ActiveSessionResource | null | undefined
  user: UserResource | null | undefined
  organization: OrganizationResource | null | undefined
}
