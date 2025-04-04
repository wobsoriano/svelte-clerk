<script lang="ts">
	import type { UserButtonProps } from '@clerk/types';
	import ClerkLoaded from '$lib/client/control/ClerkLoaded.svelte';
	import { onDestroy, setContext, type Snippet } from 'svelte';
	import type { UserButtonContext } from './types';
	import { useClerkContext } from '$lib/context';

	const { children: customMenuItems, ...props }: UserButtonProps & { children?: Snippet } =
		$props();

	let el = $state<HTMLDivElement | null>(null);
	let isMounted = $state(false);
	let updatedProps = $state(props);

	const context = useClerkContext();

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

	$effect(() => {
		if (el && context.clerk) {
			if (isMounted) {
				// @ts-expect-error: Internal API
				context.clerk.__unstable__updateProps({ node: el, props: updatedProps });
			} else {
				context.clerk.mountUserButton(el, props);
				isMounted = true;
			}
		}
	});

	onDestroy(() => {
		if (isMounted) {
			context.clerk?.unmountUserButton(el!);
		}
	});
</script>

<ClerkLoaded>
	<div bind:this={el}></div>
</ClerkLoaded>

{@render customMenuItems?.()}
