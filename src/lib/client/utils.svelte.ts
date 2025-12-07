import { errorThrower } from '$lib/errors/errorThrower';
import {
	incompatibleRoutingWithPathProvidedError,
	noPathProvidedError
} from '$lib/errors/messages';
import type { RoutingOptions } from '@clerk/shared/types';
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

type MaybeGetter<T> = T | (() => T);

const toValue = <T>(value: MaybeGetter<T>) => {
	if (typeof value === 'function') {
		return (value as () => T)();
	}

	return value;
};

export const useRoutingProps = <T extends RoutingOptions>(
	componentName: string,
	props: MaybeGetter<T>,
	routingOptions?: MaybeGetter<RoutingOptions>
) => {
	const result = $derived.by(() => {
		const propsValue = toValue(props) || {};
		const routingOptionsValue = toValue(routingOptions);

		const path = propsValue.path || routingOptionsValue?.path;
		const routing = propsValue.routing || routingOptionsValue?.routing || 'path';

		if (routing === 'path') {
			if (!path) {
				return errorThrower.throw(noPathProvidedError(componentName));
			}

			return {
				...routingOptionsValue,
				...propsValue,
				routing: 'path'
			};
		}

		if (propsValue.path) {
			return errorThrower.throw(incompatibleRoutingWithPathProvidedError(componentName));
		}

		return {
			...routingOptionsValue,
			...propsValue,
			path: undefined
		};
	});

	return {
		get current() {
			return result;
		}
	};
};
