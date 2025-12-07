import { page } from '$app/state';

export const usePathnameWithoutSplatRouteParams = () => {
	const { params, url } = $derived(page);
	const pathname = $derived(url.pathname);

	// Get the catch-all/splat route param
	const paramKeys = $derived(Object.keys(params));
	const splatRouteParam = $derived(
		paramKeys.length > 0 ? params[paramKeys[0] as keyof typeof params] || '' : ''
	);

	// Remove the splat route param from the pathname
	const pathWithoutSplat = $derived(
		splatRouteParam ? pathname.replace(`/${splatRouteParam}`, '') : pathname
	);

	const path = $derived(pathWithoutSplat.replace(/\/$/, '').replace(/^\//, '').trim());

	const finalPath = $derived(`/${path}`);

	return {
		get current() {
			return finalPath;
		}
	};
};
