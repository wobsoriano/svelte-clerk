<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignUpRedirectOptions } from '@clerk/types';

	const props: SignUpRedirectOptions = $props();

	const ctx = useClerkContext();

	$effect(() => {
		void ctx.clerk?.redirectToSignUp(props);
	});
</script>
