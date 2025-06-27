<script lang="ts">
	import type {
		Autocomplete,
		CheckAuthorizationWithCustomPermissions,
		JwtPayload,
		OrganizationCustomPermissionKey,
		OrganizationCustomRoleKey
	} from '@clerk/types';
	import type { Snippet } from 'svelte';
	import { createCheckAuthorization } from '@clerk/shared/authorization';
	import { useClerkContext } from '$lib/context.js';

	type ProtectProps =
		| {
				condition?: never;
				role: OrganizationCustomRoleKey;
				permission?: never;
				feature?: never;
				plan?: never;
		  }
		| {
				condition?: never;
				role?: never;
				feature?: never;
				plan?: never;
				permission: OrganizationCustomPermissionKey;
		  }
		| {
				condition: (has: CheckAuthorizationWithCustomPermissions) => boolean;
				role?: never;
				permission?: never;
				feature?: never;
				plan?: never;
		  }
		| {
				condition?: never;
				role?: never;
				permission?: never;
				feature: Autocomplete<`user:${string}` | `org:${string}`>;
				plan?: never;
		  }
		| {
				condition?: never;
				role?: never;
				permission?: never;
				feature?: never;
				plan: Autocomplete<`user:${string}` | `org:${string}`>;
		  }
		| {
				condition?: never;
				role?: never;
				permission?: never;
				feature?: never;
				plan?: never;
		  };

	const {
		role,
		condition,
		permission,
		feature,
		plan,
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

		const has = createCheckAuthorization({
			userId,
			orgId: ctx.auth.orgId,
			orgRole: ctx.auth.orgRole,
			orgPermissions: ctx.auth.orgPermissions,
			factorVerificationAge: ctx.auth.factorVerificationAge,
			features: ((ctx.auth.sessionClaims as JwtPayload | undefined)?.fea as string) || '',
			plans: ((ctx.auth.sessionClaims as JwtPayload | undefined)?.pla as string) || ''
		});

		if (typeof condition === 'function') {
			return condition(has);
		}

		if (role || permission || feature || plan) {
			return has({
				role,
				permission,
				feature,
				plan
			} as Parameters<CheckAuthorizationWithCustomPermissions>[0]);
		}

		return true;
	});
</script>

{#if isAuthorized}
	{@render children()}
{:else}
	{@render fallback?.()}
{/if}
