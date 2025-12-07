<script lang="ts">
	import OrganizationProfileClient from '$lib/client/interactive/OrganizationProfile.svelte';
	import type { OrganizationProfileProps } from '@clerk/shared/types';
	import { useRoutingProps } from '$lib/client/utils.svelte';
	import { usePathnameWithoutSplatRouteParams } from './usePathnameWithoutSplatRouteParams.svelte';

	const props: OrganizationProfileProps = $props();
	const pathnameWithoutSplatRouteParams = usePathnameWithoutSplatRouteParams();

	const routingProps = useRoutingProps(
		'OrganizationProfile',
		() => props,
		() => ({ path: pathnameWithoutSplatRouteParams.current })
	);
</script>

<OrganizationProfileClient {...routingProps.current} />
