<script lang="ts">
	import type {
		CheckAuthorizationWithCustomPermissions,
		JwtPayload,
		ShowWhenCondition
	} from '@clerk/shared/types';
	import type { Snippet } from 'svelte';
	import { createCheckAuthorization } from '@clerk/shared/authorization';
	import { useClerkContext } from '$lib/context.js';

	const {
		when,
		children,
		fallback
	}: {
		when: ShowWhenCondition;
		children: Snippet;
		fallback?: Snippet;
	} = $props();

	const ctx = useClerkContext();

	const authorized = $derived.by(() => {
		if (!ctx.isLoaded) return null;

		const { userId } = ctx.auth;

		if (when === 'signed-out') {
			return !userId;
		}

		if (!userId) return false;

		if (when === 'signed-in') {
			return true;
		}

		const has = createCheckAuthorization({
			userId,
			orgId: ctx.auth.orgId,
			orgRole: ctx.auth.orgRole,
			orgPermissions: ctx.auth.orgPermissions,
			factorVerificationAge: ctx.auth.factorVerificationAge,
			features: ((ctx.auth.sessionClaims as JwtPayload | undefined)?.fea as string) || '',
			plans: ((ctx.auth.sessionClaims as JwtPayload | undefined)?.pla as string) || ''
		});

		if (typeof when === 'function') {
			return when(has);
		}

		return has(when);
	});
</script>

{#if authorized === null}
	<!-- loading -->
{:else if authorized}
	{@render children()}
{:else}
	{@render fallback?.()}
{/if}
