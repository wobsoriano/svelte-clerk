<script type="ts">
	import { UserButton } from '$lib/components';
	import { auth } from '$lib/runes';
</script>

<div>
	<UserButton />
	<div>
		user id: {auth.current.userId}
	</div>
</div>
