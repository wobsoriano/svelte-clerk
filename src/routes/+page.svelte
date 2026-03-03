<script lang="ts">
	import { Show } from '$lib/client';
</script>

<h1 class="text-2xl font-bold mb-5">Welcome</h1>
<p class="mb-5">A demo playground for Svelte 5 + Clerk. Go ahead and sign up or sign in!</p>

<Show when="signed-in">
	<p>You are signed in!</p>
</Show>

<Show when="signed-out">
	<p>You are not signed in!</p>
</Show>
