import * as envPrivate from '$env/static/private';

function getEnvVariable(name: string, defaultValue?: string): string | undefined {
	// @ts-expect-error: Due to the way env vars work in SK, we need to make sure it exists before trying to access it
	return name in envPrivate ? envPrivate[name] : defaultValue;
}

export function getStaticPrivateEnvVariables() {
	return {
		apiVersion: getEnvVariable('CLERK_API_VERSION', 'v1'),
		secretKey: getEnvVariable('CLERK_SECRET_KEY'),
		jwtKey: getEnvVariable('CLERK_JWT_KEY')
	};
}
