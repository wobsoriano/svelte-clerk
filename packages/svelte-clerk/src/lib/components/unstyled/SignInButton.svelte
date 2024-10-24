<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignInProps } from '@clerk/types';
	import type { Snippet } from 'svelte';

	type SignInButtonProps = Pick<
		SignInProps,
		| 'fallbackRedirectUrl'
		| 'forceRedirectUrl'
		| 'signUpForceRedirectUrl'
		| 'signUpFallbackRedirectUrl'
	>;

	const {
		mode,
		children,
		...props
	}: SignInButtonProps & {
		children?: Snippet;
		mode?: 'redirect' | 'modal' | undefined;
	} = $props();

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
