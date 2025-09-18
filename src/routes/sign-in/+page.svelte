<script lang="ts">
	import { SignIn } from '$lib/client';
</script>

<SignIn>
	{#snippet fallback()}
		<div>Loading sign in</div>
	{/snippet}
</SignIn>
