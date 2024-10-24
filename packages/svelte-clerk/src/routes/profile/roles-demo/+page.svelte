<script lang="ts">
	import { OrganizationSwitcher, Protect } from '$lib/components';
</script>

<OrganizationSwitcher />
<Protect role="org:admin">
	<div>You are an admin</div>
	{#snippet fallback()}
		You are not an admin
	{/snippet}
</Protect>
<Protect role="org:member">
	<div>You are a member</div>
	{#snippet fallback()}
		You are not a member
	{/snippet}
</Protect>
