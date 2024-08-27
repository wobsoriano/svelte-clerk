<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignUpProps } from '@clerk/types';
	import type { Snippet } from 'svelte';

	type SignUpUnsafeMetadata = {
		[k: string]: unknown;
	};

	type SignUpButtonProps = {
		unsafeMetadata?: SignUpUnsafeMetadata;
	} & Pick<
		SignUpProps,
		| 'fallbackRedirectUrl'
		| 'forceRedirectUrl'
		| 'signInForceRedirectUrl'
		| 'signInFallbackRedirectUrl'
	>;

	const {
		mode,
		children,
		...props
	}: SignUpButtonProps & {
		children?: Snippet;
		mode?: 'redirect' | 'modal' | undefined;
	} = $props();

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
