<script lang="ts">
	import SignUpClient from '$lib/client/interactive/SignUp.svelte';
	import type { SignUpProps } from '@clerk/shared/types';
	import { useRoutingProps } from '$lib/client/utils.svelte';
	import { usePathnameWithoutSplatRouteParams } from './usePathnameWithoutSplatRouteParams.svelte';

	const props: SignUpProps = $props();
	const pathnameWithoutSplatRouteParams = usePathnameWithoutSplatRouteParams();

	const routingProps = useRoutingProps(
		'SignUp',
		() => props,
		() => ({ path: pathnameWithoutSplatRouteParams.current })
	);
</script>

<SignUpClient {...routingProps.current} />
