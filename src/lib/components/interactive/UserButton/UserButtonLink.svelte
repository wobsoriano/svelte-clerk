<script lang="ts">
	import { getContext, onMount, mount, type Component, type Snippet, unmount } from 'svelte';
	import type { UserButtonContext } from './types';

	const { addCustomLink } = getContext<UserButtonContext>('$$_userButton');

	const {
		label,
		href,
		labelIcon
	}: { children?: Snippet; label: string; href: string; labelIcon?: Component } = $props();

	onMount(() => {
		let app: Record<string, unknown>;
		addCustomLink({
			label,
			mountIcon(el) {
				app = mount(labelIcon as any, { target: el });
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
