<script lang="ts">
	import { getContext, setContext, type Snippet } from 'svelte';
	import type { UserButtonContext } from './types';

	const context = getContext<UserButtonContext>('$$_userButton');
	const { children }: { children: Snippet } = $props();

	// Hack so that actions and links only work inside `<UserButton.MenuItems />` component.
	setContext<UserButtonContext>('$$_userButtonMenuItems', context);
</script>

{@render children()}
