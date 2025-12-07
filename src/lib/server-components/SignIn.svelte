<script lang="ts">
	import SignInClient from '$lib/client/interactive/SignIn.svelte';
	import type { SignInProps } from '@clerk/shared/types';
	import { useRoutingProps } from '$lib/client/utils.svelte';
	import { usePathnameWithoutSplatRouteParams } from './usePathnameWithoutSplatRouteParams.svelte';

	const props: SignInProps = $props();
	const pathnameWithoutSplatRouteParams = usePathnameWithoutSplatRouteParams();

	const routingProps = useRoutingProps(
		'SignIn',
		() => props,
		() => ({ path: pathnameWithoutSplatRouteParams.current })
	);
</script>

<SignInClient {...routingProps.current} />
