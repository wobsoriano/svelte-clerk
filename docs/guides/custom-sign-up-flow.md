---
outline: deep
---

# Build a custom sign-up flow

If Clerk's prebuilt `<SignUp />` component doesn't meet your needs, you can use the `useSignUp()` hook to build a fully custom sign-up form.

This guide demonstrates email + password sign-up with email verification. For other strategies, see the [Clerk custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview).

## Email and password with verification

```svelte
<script lang="ts">
	import { useSignUp } from 'svelte-clerk/client';

	// Do not destructure to avoid losing reactivity
	const signUpState = useSignUp();

	let email = $state('');
	let password = $state('');
	let code = $state('');
	let verifying = $state(false);
	let pending = $state(false);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!signUpState.signUp) return;

		pending = true;
		try {
			await signUpState.signUp.create({
				emailAddress: email,
				password
			});

			// Send email verification code
			await signUpState.signUp.prepareEmailAddressVerification({
				strategy: 'email_code'
			});

			verifying = true;
		} finally {
			pending = false;
		}
	}

	async function handleVerify(e: SubmitEvent) {
		e.preventDefault();
		if (!signUpState.signUp) return;

		pending = true;
		try {
			await signUpState.signUp.attemptEmailAddressVerification({ code });

			if (signUpState.signUp.status === 'complete') {
				await signUpState.signUp.finalize({
					navigate: ({ session, decorateUrl }) => {
						if (session?.currentTask) {
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

{#if verifying}
	<form onsubmit={handleVerify}>
		<div>
			<label for="code">Verification code</label>
			<input id="code" type="text" bind:value={code} />
			{#if signUpState.errors.fields.code}
				<p class="error">{signUpState.errors.fields.code.message}</p>
			{/if}
		</div>

		{#if signUpState.errors.global}
			{#each signUpState.errors.global as err}
				<p class="error">{err.message}</p>
			{/each}
		{/if}

		<button type="submit" disabled={pending}>
			{pending ? 'Verifying...' : 'Verify'}
		</button>
	</form>
{:else}
	<form onsubmit={handleSubmit}>
		<div>
			<label for="email">Email</label>
			<input id="email" type="email" bind:value={email} />
			{#if signUpState.errors.fields.emailAddress}
				<p class="error">{signUpState.errors.fields.emailAddress.message}</p>
			{/if}
		</div>

		<div>
			<label for="password">Password</label>
			<input id="password" type="password" bind:value={password} />
			{#if signUpState.errors.fields.password}
				<p class="error">{signUpState.errors.fields.password.message}</p>
			{/if}
		</div>

		{#if signUpState.errors.global}
			{#each signUpState.errors.global as err}
				<p class="error">{err.message}</p>
			{/each}
		{/if}

		<button type="submit" disabled={pending}>
			{pending ? 'Signing up...' : 'Sign up'}
		</button>
	</form>
{/if}
```

## Next steps

- [Custom sign-in flow](/guides/custom-sign-in-flow) — build a custom sign-in form
- [Clerk custom flow guides](https://clerk.com/docs/guides/development/custom-flows/overview) — OTP, OAuth, email links, and more
