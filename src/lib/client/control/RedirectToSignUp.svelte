<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignUpRedirectOptions } from '@clerk/shared/types';

	type RedirectToSignUpProps = SignUpRedirectOptions;
	const props: RedirectToSignUpProps = $props();

	const ctx = useClerkContext();

	$effect(() => {
		if (!ctx.clerk) {
			return;
		}

		void ctx.clerk.redirectToSignUp(props);
	});
</script>
