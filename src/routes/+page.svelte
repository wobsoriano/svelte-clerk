<script lang="ts">
	import { SignedIn, SignedOut, SignInButton, UserButton } from '$lib/components';
</script>

<div style="font-family: system-ui, sans-serif; line-height: 1.4; text-align: center;">
	<h1>Hello Clerk!</h1>
	<SignedIn>
		<UserButton />
	</SignedIn>
	<SignedOut>
		<SignInButton mode="modal" />
	</SignedOut>
</div>
