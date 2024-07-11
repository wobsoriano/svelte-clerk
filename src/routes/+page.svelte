<script lang="ts">
	import { user, session } from '$lib/runes';

	$effect(() => {
		console.log('user', user.current);
		console.log('session', session.current);
	});
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
