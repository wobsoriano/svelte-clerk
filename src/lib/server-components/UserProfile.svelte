<script lang="ts">
	import UserProfileClient from '$lib/client/interactive/UserProfile.svelte';
	import type { UserProfileProps } from '@clerk/shared/types';
	import { useRoutingProps } from '$lib/client/utils.svelte';
	import { usePathnameWithoutSplatRouteParams } from './usePathnameWithoutSplatRouteParams.svelte';

	const props: UserProfileProps = $props();
	const pathnameWithoutSplatRouteParams = usePathnameWithoutSplatRouteParams();

	const routingProps = useRoutingProps(
		'UserProfile',
		() => props,
		() => ({ path: pathnameWithoutSplatRouteParams.current })
	);
</script>

<UserProfileClient {...routingProps.current} />
