<script lang="ts">
	import { getContext, onMount, mount, type Component, unmount } from 'svelte';
	import type { UserButtonContext } from './types';

	const { addCustomMenuItem } = getContext<UserButtonContext>('$$_userButtonMenuItems');

	type BaseActionItem = { label: string; labelIcon: Component } & (
		| { onclick: () => void; open?: never }
		| { open: string; onclick?: never }
	);

	const props: { label: 'manageAccount' | 'signOut' } | BaseActionItem = $props();

	onMount(() => {
	    // Action is reordering default items
		if (props.label === 'manageAccount' || props.label === 'signOut') {
			addCustomMenuItem('action', {
				label: props.label
			});
			return;
		}

		const { label, onclick, open, labelIcon } = props as BaseActionItem;
		let app: Record<string, unknown>;

		addCustomMenuItem('action', {
			label,
			mountIcon(el) {
				app = mount(labelIcon, { target: el });
			},
			unmountIcon() {
				if (app) {
					unmount(app);
				}
			},
			...(onclick ? { onClick: onclick } : { open })
		});
	});
</script>
