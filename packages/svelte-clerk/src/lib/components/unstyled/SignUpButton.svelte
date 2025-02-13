<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { PropsWithChildren } from '$lib/types';
	import type { SignUpButtonProps } from '@clerk/types';

	const { mode, children, ...props }: PropsWithChildren<SignUpButtonProps> = $props();

	const ctx = useClerkContext();

	function signUp() {
		if (mode === 'modal') {
			return ctx.clerk?.openSignUp(props);
		}
		return ctx.clerk?.redirectToSignUp({
			...props,
			signUpFallbackRedirectUrl: props.fallbackRedirectUrl,
			signUpForceRedirectUrl: props.forceRedirectUrl
		});
	}
</script>

<button type="button" onclick={signUp}>
	{#if children}
		{@render children()}
	{:else}
		Sign up
	{/if}
</button>
