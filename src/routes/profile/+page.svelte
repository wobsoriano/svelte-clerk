<script lang="ts">
	import { UserProfile } from '$lib/client';
	import { mount, onMount, unmount, type Snippet } from 'svelte';
	import type { CustomPage } from '@clerk/types';
	import Portal from '$lib/client/Portal.svelte';
	import CustomPageComponent from '../../components/CustomPage.svelte';

	let customPages = $state<CustomPage[]>([]);

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
			unmount: () => {
				if (page) {
					unmount(page);
				}
			}
		});
	});
</script>

<UserProfile {customPages} />
