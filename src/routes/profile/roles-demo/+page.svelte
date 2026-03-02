<script lang="ts">
	import { OrganizationSwitcher, Show } from '$lib/index.js';
</script>

<OrganizationSwitcher />
<Show when={{ role: 'org:admin' }}>
	<div>You are an admin</div>
	{#snippet fallback()}
		You are not an admin
	{/snippet}
</Show>
<Show when={{ role: 'org:member' }}>
	<div>You are a member</div>
	{#snippet fallback()}
		You are not a member
	{/snippet}
</Show>
