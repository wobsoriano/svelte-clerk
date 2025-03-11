import { env } from '$env/dynamic/private';

function getEnvVariable(name: string, defaultValue?: string): string | undefined {
	return name in env ? env[name] : defaultValue;
}

export function getDynamicPrivateEnvVariables() {
	return {
		apiVersion: getEnvVariable('CLERK_API_VERSION', 'v1'),
		secretKey: getEnvVariable('CLERK_SECRET_KEY'),
		jwtKey: getEnvVariable('CLERK_JWT_KEY')
	};
}
