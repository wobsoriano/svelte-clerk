<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignInRedirectOptions } from '@clerk/shared/types';

	type RedirectToSignInProps = SignInRedirectOptions;
	const props: RedirectToSignInProps = $props();

	const ctx = useClerkContext();

	$effect(() => {
		if (!ctx.clerk || !ctx.client) {
			return;
		}

		const hasActiveSessions = ctx.client.activeSessions && ctx.client.activeSessions.length > 0;

		if (ctx.session === null && hasActiveSessions) {
			void ctx.clerk.redirectToAfterSignOut();
		} else {
			void ctx.clerk.redirectToSignIn(props);
		}
	});
</script>
