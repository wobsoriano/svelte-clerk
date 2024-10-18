<script lang="ts">
	import clerkUI from '$lib/action.js';
	import type { UserButtonProps } from '@clerk/types';
	import ClerkLoaded from '$lib/components/control/ClerkLoaded.svelte';
	import { setContext, type Snippet } from 'svelte';
	import type { UserButtonContext } from './types';

	const { children: customMenuItems, ...props }: UserButtonProps & { children?: Snippet } =
		$props();

	let updatedProps = $state(props);

	setContext<UserButtonContext>('$$_userButton', {
		addCustomMenuItem(_, item) {
			updatedProps.customMenuItems = [...(updatedProps.customMenuItems || []), item];
		},
		addCustomPage(page) {
			updatedProps.userProfileProps = {
				...updatedProps.userProfileProps,
				customPages: [...(updatedProps.userProfileProps?.customPages || []), page]
			};
		}
	});
</script>

<ClerkLoaded>
	{#snippet children(clerk)}
		<div use:clerkUI={{ clerk, component: 'UserButton', props: updatedProps }}></div>
	{/snippet}
</ClerkLoaded>

{@render customMenuItems?.()}
