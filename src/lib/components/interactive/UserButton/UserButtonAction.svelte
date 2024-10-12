<script lang="ts">
	import { getContext, onMount, mount, type Component, type Snippet, unmount } from 'svelte';
	import type { UserButtonContext } from './types';

	const { addCustomAction } = getContext<UserButtonContext>('$$_userButton');

	const {
		label,
		onclick,
		labelIcon
	}: { children?: Snippet; label: string; onclick: () => void; labelIcon?: Component } = $props();

	onMount(() => {
		let app: Record<string, unknown>;
		addCustomAction({
			label,
			mountIcon(el) {
				app = mount(labelIcon as any, { target: el });
			},
			unmountIcon() {
				if (app) {
					unmount(app);
				}
			},
			onClick: onclick
		});
	});
</script>
