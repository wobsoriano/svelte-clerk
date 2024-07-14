<script lang="ts">
	import { clerkContext } from '$lib/utils/context.js';
	import type { SignUpProps } from '@clerk/types';
	import type { Snippet } from 'svelte';

	let {
		mode,
		children,
		...props
	}: SignUpProps & {
		children: Snippet<[string]>;
		mode?: 'redirect' | 'modal' | undefined;
	} = $props();

	function signUp() {
		const { clerk } = clerkContext.get();
		if (mode === 'modal') {
			return clerk?.openSignUp(props);
		}
		return clerk?.redirectToSignUp(props);
	}
</script>

<button type="button" onclick={signUp}>
	{@render children('Sign up')}
</button>
