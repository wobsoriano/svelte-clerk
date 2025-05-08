<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { ButtonProps, PropsWithChildren } from '$lib/types';
	import type { SignUpButtonProps } from '@clerk/types';

	const {
		mode,
		children,
		style,
		class: buttonClass,
		asChild,
		...props
	}: PropsWithChildren<
		SignUpButtonProps,
		{
			signUp(): void;
		}
	> &
		ButtonProps = $props();

	const ctx = useClerkContext();

	function signUp() {
		if (!ctx.clerk) return;
		if (mode === 'modal') {
			void ctx.clerk.openSignUp(props);
			return;
		}
		void ctx.clerk.redirectToSignUp({
			...props,
			signUpFallbackRedirectUrl: props.fallbackRedirectUrl,
			signUpForceRedirectUrl: props.forceRedirectUrl
		});
	}
</script>

{#if asChild}
	{@render children?.({ signUp })}
{:else}
	<button type="button" {style} class={buttonClass} onclick={signUp}>
		{#if children}
			{@render children({ signUp })}
		{:else}
			Sign up
		{/if}
	</button>
{/if}
