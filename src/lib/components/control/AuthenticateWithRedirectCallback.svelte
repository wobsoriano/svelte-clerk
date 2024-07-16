<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { HandleOAuthCallbackParams } from '@clerk/types';

	const props: HandleOAuthCallbackParams = $props();

	const ctx = useClerkContext();

	$effect(() => {
		void ctx.clerk?.handleRedirectCallback(props);
	});
</script>
