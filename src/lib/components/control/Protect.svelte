<script lang="ts">
	import type {
		CheckAuthorizationWithCustomPermissions,
		OrganizationCustomPermissionKey,
		OrganizationCustomRoleKey
	} from '@clerk/types';
	import ClerkLoaded from './ClerkLoaded.svelte';
	import type { Snippet } from 'svelte';
	import { auth } from '$lib/runes/index.js';

	type ProtectProps =
		| {
				condition?: never;
				role: OrganizationCustomRoleKey;
				permission?: never;
				children: Snippet;
				fallback: Snippet;
		  }
		| {
				condition?: never;
				role?: never;
				permission: OrganizationCustomPermissionKey;
				children: Snippet;
				fallback: Snippet;
		  }
		| {
				condition: (has: CheckAuthorizationWithCustomPermissions) => boolean;
				role?: never;
				permission?: never;
				children: Snippet;
				fallback: Snippet;
		  }
		| {
				condition?: never;
				role?: never;
				permission?: never;
				children: Snippet;
				fallback: Snippet;
		  };

	const { role, condition, permission, children, fallback }: ProtectProps = $props();

	const isAuthorized = $derived.by(() => {
		const { userId, has } = auth.current;

		if (!userId) return false;

		if (typeof condition === 'function') {
			return condition(has);
		}

		if (role || permission) {
			// @ts-expect-error: Fix types later
			return has({ role, permission });
		}

		return true;
	});
</script>

<ClerkLoaded>
	{#if isAuthorized}
		{@render children()}
	{:else}
		{@render fallback()}
	{/if}
</ClerkLoaded>
