<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { ButtonProps, PropsWithChildren } from '$lib/types';
	import type { SignOutOptions } from '@clerk/types';

	const {
		sessionId,
		redirectUrl = '/',
		children,
		style,
		class: buttonClass,
		asChild
	}: PropsWithChildren<
		SignOutOptions,
		{
			signOut(): void;
		}
	> &
		ButtonProps = $props();

	const ctx = useClerkContext();

	function signOut() {
		if (!ctx.clerk) return;
		void ctx.clerk.signOut({ sessionId, redirectUrl });
	}
</script>

{#if asChild}
	{@render children?.({ signOut })}
{:else}
	<button type="button" {style} class={buttonClass} onclick={signOut}>
		{#if children}
			{@render children({ signOut })}
		{:else}
			Sign out
		{/if}
	</button>
{/if}
