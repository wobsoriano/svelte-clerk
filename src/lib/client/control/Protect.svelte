<script lang="ts">
	import type {
		CheckAuthorizationWithCustomPermissions,
		JwtPayload,
		ProtectProps
	} from '@clerk/types';
	import type { Snippet } from 'svelte';
	import { createCheckAuthorization } from '@clerk/shared/authorization';
	import { useClerkContext } from '$lib/context.js';

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
