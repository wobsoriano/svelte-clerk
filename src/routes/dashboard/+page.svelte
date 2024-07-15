<script lang="ts">
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props()
</script>

<div>
	<h1>Dashboard</h1>
	<p>
		Welcome, {data.user.id}
	</p>
</div>
