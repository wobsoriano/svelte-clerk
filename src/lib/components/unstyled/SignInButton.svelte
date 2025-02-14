<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { PropsWithChildren } from '$lib/types';
	import type { SignInButtonProps } from '@clerk/types';

	const { mode, children, ...props }: PropsWithChildren<SignInButtonProps> = $props();

	const ctx = useClerkContext();

	function signIn() {
		if (mode === 'modal') {
			return ctx.clerk?.openSignIn(props);
		}
		return ctx.clerk?.redirectToSignIn({
			...props,
			signInFallbackRedirectUrl: props.fallbackRedirectUrl,
			signInForceRedirectUrl: props.forceRedirectUrl
		});
	}
</script>

<button type="button" onclick={signIn}>
	{#if children}
		{@render children()}
	{:else}
		Sign in
	{/if}
</button>
