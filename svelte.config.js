import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	},
	preprocess: vitePreprocess(),
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};

export default config;
