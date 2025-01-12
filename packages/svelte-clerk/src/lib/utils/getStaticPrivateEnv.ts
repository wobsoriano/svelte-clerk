import * as envPrivate from '$env/static/private';

export function getStaticPrivateEnv(name: string, defaultValue = ''): string {
	// @ts-expect-error: Due to the way env vars work in SK, we need to make sure it exists before trying to access it
	return name in envPrivate ? envPrivate[name] : defaultValue;
}
