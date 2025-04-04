<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div>This is a page that has a universal load function</div>
<p>{JSON.stringify(data.auth)}</p>
