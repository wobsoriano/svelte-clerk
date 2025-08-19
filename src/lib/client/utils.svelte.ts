import { untrack } from 'svelte';

export const watch = (deps: () => any, cb: () => void) => {
	let first = true;

	$effect(() => {
		deps();

		if (first) {
			first = false;
			return;
		}

		return untrack(cb);
	});
};
