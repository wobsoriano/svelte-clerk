<script lang="ts">
	import OrganizationListClient from '$lib/client/interactive/OrganizationList.svelte';
	import type { OrganizationListProps } from '@clerk/shared/types';
	import { useRoutingProps } from '$lib/client/utils.svelte';
	import { usePathnameWithoutSplatRouteParams } from './usePathnameWithoutSplatRouteParams.svelte';

	const props: OrganizationListProps = $props();
	const pathnameWithoutSplatRouteParams = usePathnameWithoutSplatRouteParams();

	const routingProps = useRoutingProps(
		'OrganizationList',
		() => props,
		() => ({ path: pathnameWithoutSplatRouteParams.current })
	);
</script>

<OrganizationListClient {...routingProps.current} />
