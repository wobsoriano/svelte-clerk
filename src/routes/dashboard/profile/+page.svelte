<script lang="ts">
	import { SignedIn, SignedOut } from '$lib/components';
	import { useClerkContext } from '$lib';

	const ctx = useClerkContext();
</script>

<div>
	<h1>Profile</h1>
	<SignedIn>
		<style>
{`pre { padding: 8px; white-space: pre-wrap; word-break: break-word; }`}
		</style>

		<pre>{JSON.stringify(ctx.user, null, 2)}</pre>
	</SignedIn>
	<SignedOut>Signed out baby</SignedOut>
</div>
