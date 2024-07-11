<script lang="ts">
	import { clerkContext } from '$lib/utils/context.js';
	import type { SignInProps } from '@clerk/types';
	import type { Snippet } from 'svelte';

	let {
		mode,
		children,
		...props
	}: SignInProps & {
		children: Snippet<[string]>;
		mode?: 'redirect' | 'modal' | undefined;
	} = $props();

	function signIn() {
		const { clerk } = clerkContext.get();
		if (mode === 'modal') {
			return clerk?.openSignIn(props);
		}
		return clerk?.redirectToSignIn(props);
	}
</script>

<button type="button" onclick={signIn}>
	{@render children('Sign in')}
</button>
