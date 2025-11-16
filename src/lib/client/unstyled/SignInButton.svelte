<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { ButtonProps, PropsWithChildren } from '$lib/types';
	import type { SignInButtonProps } from '@clerk/shared/types';
	import type { Snippet } from 'svelte';

	const {
		mode,
		children,
		style,
		class: buttonClass,
		asChild,
		...props
	}: PropsWithChildren<
		SignInButtonProps,
		{
			signIn(): void;
		}
	> &
		ButtonProps = $props();

	const ctx = useClerkContext();

	function signIn() {
		if (!ctx.clerk) return;

		if (mode === 'modal') {
			void ctx.clerk.openSignIn(props);
			return;
		}

		void ctx.clerk.redirectToSignIn({
			...props,
			signInFallbackRedirectUrl: props.fallbackRedirectUrl,
			signInForceRedirectUrl: props.forceRedirectUrl
		});
	}
</script>

{#if asChild}
	{@render children?.({ signIn })}
{:else}
	<button type="button" {style} class={buttonClass} onclick={signIn}>
		{#if children}
			{@render children({ signIn })}
		{:else}
			Sign in
		{/if}
	</button>
{/if}
