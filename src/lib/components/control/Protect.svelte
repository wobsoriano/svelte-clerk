<script lang="ts">
	import type {
		CheckAuthorization,
		CheckAuthorizationWithCustomPermissions,
		OrganizationCustomPermissionKey,
		OrganizationCustomRoleKey
	} from '@clerk/types';
	import type { Snippet } from 'svelte';
	import { useClerkContext } from '$lib/context.js';

	type ProtectProps =
		| {
				condition?: never;
				role: OrganizationCustomRoleKey;
				permission?: never;
		  }
		| {
				condition?: never;
				role?: never;
				permission: OrganizationCustomPermissionKey;
		  }
		| {
				condition: (has: CheckAuthorizationWithCustomPermissions) => boolean;
				role?: never;
				permission?: never;
		  }
		| {
				condition?: never;
				role?: never;
				permission?: never;
		  };

	const {
		role,
		condition,
		permission,
		children,
		fallback
	}: ProtectProps & {
		children: Snippet;
		fallback?: Snippet;
	} = $props();

	const ctx = useClerkContext();

	const isAuthorized = $derived.by(() => {
		const { userId } = ctx.auth;

		if (!userId) return false;

		const has = ctx.session!.checkAuthorization;

		if (typeof condition === 'function') {
			return condition(has);
		}

		if (role || permission) {
			return has({ role, permission } as Parameters<CheckAuthorization>[0]);
		}

		return true;
	});
</script>

{#if isAuthorized}
	{@render children()}
{:else}
	{@render fallback?.()}
{/if}
