<script lang="ts">
	import { getContext, onMount, mount, type Component, unmount } from 'svelte';
	import type { UserButtonContext } from './types';

	const { addCustomMenuItem } = getContext<UserButtonContext>('$$_userButtonMenuItems');

	const reorderItemsLabels = ['manageAccount', 'signOut'];
	type ReorderItemsLabels = (typeof reorderItemsLabels)[number];
	type BaseActionItem = { label: string; onclick: () => void; labelIcon: Component };

	const props: { label: ReorderItemsLabels } | BaseActionItem = $props();

	onMount(() => {
		let app: Record<string, unknown>;
		const isReorderItem = reorderItemsLabels.includes(props.label);

		if (isReorderItem) {
			addCustomMenuItem('action', {
				label: props.label
			});
			return;
		}

		const { label, onclick, labelIcon } = props as BaseActionItem;
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
			onClick: onclick
		});
	});
</script>
