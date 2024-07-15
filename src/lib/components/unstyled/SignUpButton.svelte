<script lang="ts">
	import { useClerkContext } from '$lib/context.js';
	import type { SignUpProps } from '@clerk/types';
	import type { Snippet } from 'svelte';

	let {
		mode,
		children,
		...props
	}: SignUpProps & {
		children?: Snippet;
		mode?: 'redirect' | 'modal' | undefined;
	} = $props();

	const ctx = useClerkContext();

	function signUp() {
		if (mode === 'modal') {
			return ctx.clerk?.openSignUp(props);
		}
		return ctx.clerk?.redirectToSignUp(props);
	}
</script>

<button type="button" onclick={signUp}>
	{#if children}
	    {@render children()}
    {:else}
        Sign up
    {/if}
</button>
