<script lang="ts">
	import { SignedIn, useClerkContext, UserProfile } from '$lib/index.js';
	import { mount, onMount, unmount, type Snippet } from 'svelte';
	import type { CustomPage } from '@clerk/shared/types';
	import Portal from '$lib/client/Portal.svelte';
	import CustomPageComponent from '../../components/CustomPage.svelte';

	let customPages = $state<CustomPage[]>([]);

	const ctx = useClerkContext();

	onMount(() => {
		let page: Record<string, unknown>;

		customPages.push({
			url: 'custom-page',
			label: 'Custom Page',
			mountIcon: (el) => {
				el.innerHTML = '👋';
			},
			unmountIcon: (el) => {
				if (el) {
					el.innerHTML = '';
				}
			},
			mount: (el) => {
				page = mount(Portal, {
					target: el,
					props: { children: CustomPageComponent as unknown as Snippet }
				});
			},
			unmount: (el) => {
				if (el && page) {
					unmount(page);
				}
			}
		});
	});
</script>

<SignedIn>
	<UserProfile {customPages} />
	<p>User ID: {ctx.user?.emailAddresses[0].emailAddress}</p>
</SignedIn>
