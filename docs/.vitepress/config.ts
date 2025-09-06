import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Svelte Clerk',
	description: 'Svelte Clerk Documentation',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Docs', link: '/kit/quickstart' }
		],

		sidebar: [
  		{
  			text: 'SvelteKit',
  			items: [
  				{ text: 'Quickstart', link: '/kit/quickstart' },
  				{ text: 'Helpers', link: '/kit/helpers' }
  			]
  		},
			{
				text: 'Svelte',
				items: [
					{ text: 'Quickstart', link: '/svelte/quickstart' },
					{ text: 'Components', link: '/svelte/components' },
					{ text: 'Helpers', link: '/svelte/helpers' }
				]
			},
			{
				text: 'Guides',
				items: [
					{ text: 'Read session and user data', link: '/guides/read-session-data' },
					{ text: 'Protect pages', link: '/guides/protect-pages' }
				]
			}
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/wobsoriano/svelte-clerk' }]
	}
});
