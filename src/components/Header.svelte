<script lang="ts">
	import { UserButton } from '$lib/client';
	import { useClerkContext } from '$lib';
	import Icon from './Icon.svelte';
	const ctx = useClerkContext();

	let {
		selectedLocale = $bindable(),
		onLocaleChange
	}: { selectedLocale: 'en' | 'fr'; onLocaleChange: () => void } = $props();
</script>

<nav class="flex items-center justify-between px-6 py-4 mb-5 bg-blue-700">
	<div class="flex items-center">
		<a href="/" class="text-lg font-bold text-white uppercase"> Clerk App </a>
	</div>
	<div class="flex items-center text-white">
		<select
			bind:value={selectedLocale}
			onchange={onLocaleChange}
			class="bg-blue-600 text-white px-3 py-2 rounded-md mr-4"
		>
			<option value="en">en</option>
			<option value="fr">fr</option>
		</select>
		{#if !ctx.auth.userId}
			<a href="/sign-in" class="text-gray-300 hover:text-white mr-4"> Sign In </a>
			<a href="/sign-up" class="text-gray-300 hover:text-white mr-4"> Sign Up </a>
		{:else}
			<a href="/profile" class="text-gray-300 hover:text-white mr-4"> Profile </a>
		{/if}
		<div class="ml-auto">
			<UserButton afterSignOutUrl="/">
				<UserButton.MenuItems>
					<!-- <UserButton.Action label="signOut" onclick={() => {}} /> -->
					<UserButton.Action label="Help" labelIcon={Icon} open="help" />
					<UserButton.Action
						label="Open chat"
						onclick={() => {
							console.log('init chat');
						}}
					>
						{#snippet labelIcon()}
							<Icon />
						{/snippet}
					</UserButton.Action>
					<UserButton.Link label="Profile" href="/profile" labelIcon={Icon} />
				</UserButton.MenuItems>
				<UserButton.UserProfilePage label="Help" url="help">
					{#snippet labelIcon()}
						<Icon />
					{/snippet}
					<div>
						<h1>Help Page</h1>
						<p>This is the custom help page</p>
					</div>
				</UserButton.UserProfilePage>
			</UserButton>
		</div>
	</div>
</nav>
