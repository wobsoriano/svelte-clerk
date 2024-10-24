<script lang="ts">
	import { getContext, onMount, mount, type Component, type Snippet, unmount } from 'svelte';
	import type { UserButtonContext } from './types';
	import Portal from '$lib/components/Portal.svelte';

	const { addCustomMenuItem } = getContext<UserButtonContext>('$$_userButtonMenuItems');

	const {
		label,
		href,
		labelIcon
	}: { label: string; href: string; labelIcon: Component | Snippet } = $props();

	onMount(() => {
		let app: Record<string, unknown>;
		addCustomMenuItem('link', {
			label,
			mountIcon(el) {
				app = mount(Portal, { target: el, props: { children: labelIcon as Snippet } });
			},
			unmountIcon() {
				if (app) {
					unmount(app);
				}
			},
			href
		});
	});
</script>
