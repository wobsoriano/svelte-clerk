import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'e2e',
	use: {
		headless: true
	},
	projects: [
		{
			name: 'setup Clerk',
			testMatch: /global\.setup\.ts/
		},
		{
			name: 'chromium with Clerk',
			use: { ...devices['Desktop Chrome'] },
			dependencies: ['setup Clerk']
		}
	]
});
