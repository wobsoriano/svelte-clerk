---
outline: deep
---

# Build a custom sign-in flow

If Clerk's prebuilt `<SignIn />` component doesn't meet your needs, you can use the `useSignIn()` hook to build a fully custom sign-in form.

This guide demonstrates email + password sign-in. For other strategies (OTP, OAuth, email links, MFA), see the [Clerk custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview).

## Email and password

```svelte
<script lang="ts">
	import { useSignIn } from 'svelte-clerk/client';

	const { signIn, errors } = useSignIn();

	let email = $state('');
	let password = $state('');
	let pending = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!signIn) return;

		pending = true;
		try {
			await signIn.create({
				identifier: email,
				password
			});

			// If sign-in is complete, finalize to set the active session
			if (signIn.status === 'complete') {
				await signIn.finalize({
					navigate: ({ session, decorateUrl }) => {
						if (session?.currentTask) {
							// Handle pending session tasks
							console.log(session.currentTask);
							return;
						}
						window.location.href = decorateUrl('/');
					}
				});
			}
		} finally {
			pending = false;
		}
	}
</script>

<form onsubmit={handleSubmit}>
	<div>
		<label for="email">Email</label>
		<input id="email" type="email" bind:value={email} />
		{#if errors.fields.identifier}
			<p class="error">{errors.fields.identifier.message}</p>
		{/if}
	</div>

	<div>
		<label for="password">Password</label>
		<input id="password" type="password" bind:value={password} />
		{#if errors.fields.password}
			<p class="error">{errors.fields.password.message}</p>
		{/if}
	</div>

	{#if errors.global}
		{#each errors.global as err}
			<p class="error">{err.message}</p>
		{/each}
	{/if}

	<button type="submit" disabled={pending}>
		{pending ? 'Signing in...' : 'Sign in'}
	</button>
</form>
```

## Next steps

- [Custom sign-up flow](/guides/custom-sign-up-flow) — build a custom sign-up form
- [Clerk custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview) — OTP, OAuth, email links, and more
