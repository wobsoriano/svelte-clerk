<script lang="ts">
	import { getUser } from '$lib/getUser.remote';
</script>

{#await getUser() then user}
	<h1>Welcome, {user.firstName} {user.lastName}</h1>
{/await}
