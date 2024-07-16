<script lang="ts">
	import { useClerkContext } from '$lib/context.js';

	const ctx = useClerkContext();

	$effect(() => {
		void ctx.clerk?.redirectToOrganizationProfile();
	});
</script>
