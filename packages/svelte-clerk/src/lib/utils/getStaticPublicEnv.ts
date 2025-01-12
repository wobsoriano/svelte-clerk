import * as envPublic from '$env/static/public';

export function getStaticPublicEnv(name: `PUBLIC_${string}`, defaultValue = ''): string {
	// @ts-expect-error: Due to the way env vars work in SK, we need to make sure it exists before trying to access it
	return name in envPublic ? envPublic[name] : defaultValue;
}
