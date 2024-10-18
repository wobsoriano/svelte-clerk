<script lang="ts">
	import { getContext, onMount, mount, type Snippet, unmount, type Component } from 'svelte';
	import type { UserButtonContext } from './types';
	import Portal from '$lib/components/Portal.svelte';

	const { addCustomPage } = getContext<UserButtonContext>('$$_userButton');

	const {
		children,
		labelIcon,
		label,
		url
	}: { children: Snippet; labelIcon: Snippet | Component; label: string; url: string } = $props();

	onMount(() => {
		let labelIconApp: Record<string, unknown>;
		let mainApp: Record<string, unknown>;

		addCustomPage({
			label,
			url,
			mountIcon(el) {
				labelIconApp = mount(Portal, { target: el, props: { children: labelIcon as Snippet } });
			},
			unmountIcon() {
				if (labelIconApp) {
					unmount(labelIconApp);
				}
			},
			mount(el) {
				mainApp = mount(Portal, { target: el, props: { children } });
			},
			unmount() {
				if (mainApp) {
					unmount(mainApp);
				}
			}
		});
	});
</script>
