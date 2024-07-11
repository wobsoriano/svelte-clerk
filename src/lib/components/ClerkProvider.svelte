<script lang="ts">
import type { Snippet } from 'svelte'
import type { ClientResource, InitialState, Resources } from '@clerk/types'
import { deriveState } from '$lib/utils/deriveState.js'
import { clerkContext } from '$lib/utils/context.js'
import type { Clerk, ClerkInitOptions } from '$lib/utils/types.js'
import { loadClerkJsScript } from '$lib/utils/loadClerkJsScript.js'

const { children, initialState, ...clerkInitOptions }: ClerkInitOptions & {
  initialState?: InitialState,
  children: Snippet
} = $props()

let clerk = $state<Clerk | null>(null)
let isLoaded = $state(false)
let resources = $state<Resources>({
	client: {} as ClientResource,
	session: undefined,
	user: undefined,
	organization: undefined,
})

let derivedState = $derived(deriveState(isLoaded, resources, initialState))

let auth = $derived.by(() => {
  const { sessionId, userId, orgId, actor, orgRole, orgSlug, orgPermissions } = derivedState
  return { sessionId, userId, actor, orgId, orgRole, orgSlug, orgPermissions }
})
let client = $derived(resources.client)
let session = $derived(derivedState.session)
let user = $derived(derivedState.user)
let organization = $derived(derivedState.organization)

async function loadClerk() {
  await loadClerkJsScript(clerkInitOptions)
}

$effect(() => {
  loadClerk()
})

$effect(() => {
  // @ts-expect-error: Internal
  clerk?.__unstable__updateProps({ appearance: clerkInitOptions.appearance });
})

$effect(() => {
  // @ts-expect-error: Internal
  clerk?.__unstable__updateProps({ localization: clerkInitOptions.localization });
})

clerkContext.set({
  get clerk() {
    return clerk
  },
  get isLoaded() {
    return isLoaded
  },
  get auth() {
    return auth
  },
  get client() {
    return client
  },
  get session() {
    return session
  },
  get user() {
    return user
  },
  get organization() {
    return organization
  },
})
</script>

{@render children()}
