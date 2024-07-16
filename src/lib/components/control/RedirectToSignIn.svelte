<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignInRedirectOptions } from '@clerk/types';

	const props: SignInRedirectOptions = $props();

	const ctx = useClerkContext();

	$effect(() => {
		if (!ctx.clerk) return;

		const { client, session } = ctx.clerk;

		const hasActiveSessions = client?.activeSessions && client.activeSessions.length > 0;

		if (session === null && hasActiveSessions) {
			void ctx.clerk?.redirectToAfterSignOut();
		} else {
			void ctx.clerk?.redirectToSignIn(props);
		}
	});
</script>
