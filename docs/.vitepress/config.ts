import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Svelte Clerk',
	description: 'Svelte Clerk Documentation',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Docs', link: '/spa/quickstart' }
		],

		sidebar: [
			{
				text: 'SPA',
				items: [
					{ text: 'Quickstart', link: '/spa/quickstart' },
					{ text: 'Components', link: '/spa/components' },
					{ text: 'Helpers', link: '/spa/helpers' }
				]
			},
			{
				text: 'SSR',
				items: [
					{ text: 'Quickstart', link: '/ssr/quickstart' },
					{ text: 'Helpers', link: '/ssr/helpers' }
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
