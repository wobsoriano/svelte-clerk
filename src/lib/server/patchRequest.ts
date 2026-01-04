/**
 * Patches request to avoid duplex issues with unidici
 * For more information, see:
 * https://github.com/nodejs/node/issues/46221
 * https://github.com/whatwg/fetch/pull/1457
 * @internal
 */
export function patchRequest(request: Request) {
	const clonedRequest = new Request(request.url, {
		headers: request.headers,
		method: request.method,
		redirect: request.redirect,
		cache: request.cache,
		signal: request.signal
	});

	// If duplex is not set, set it to 'half' to avoid duplex issues with unidici
	if (
		clonedRequest.method !== 'GET' &&
		clonedRequest.body !== null &&
		!('duplex' in clonedRequest)
	) {
		(clonedRequest as unknown as { duplex: 'half' }).duplex = 'half';
	}

	return clonedRequest;
}
