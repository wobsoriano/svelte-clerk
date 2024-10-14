<script lang="ts">
	import { getContext, onMount, mount, type Component, type Snippet, unmount } from 'svelte';
	import type { UserButtonContext } from './types';

	const { addCustomMenuItem } = getContext<UserButtonContext>('$$_userButtonMenuItems');

	const {
		label,
		onclick,
		labelIcon
	}: { children?: Snippet; label: string; onclick?: () => void; labelIcon?: Component } = $props();

	onMount(() => {
		let app: Record<string, unknown>;
		addCustomMenuItem('action', {
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
