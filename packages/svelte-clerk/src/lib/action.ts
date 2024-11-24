import type { Action } from 'svelte/action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = any;

interface MountProps {
	mount: ((node: HTMLDivElement, props: AnyObject) => void) | undefined;
	unmount: ((node: HTMLDivElement) => void) | undefined;
	updateProps?: (props: AnyObject) => void;
	props?: AnyObject;
}

interface OpenProps {
	open: ((props: AnyObject) => void) | undefined;
	close: (() => void) | undefined;
	updateProps?: (props: AnyObject) => void;
	props?: AnyObject;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isMountProps = (props: any): props is MountProps => {
	return 'mount' in props;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOpenProps = (props: any): props is OpenProps => {
	return 'open' in props;
};

export const clerkUI: Action<HTMLDivElement, MountProps | OpenProps> = (node, props) => {
	if (isMountProps(props)) {
		props.mount?.(node, props.props);
	} else if (isOpenProps(props)) {
		props.open?.(props.props);
	}

	return {
		update: ({ props: updatedProps }) => {
			if (isMountProps(props)) {
				props.updateProps?.({ node, props: updatedProps });
			}
		},
		destroy: () => {
			if (isMountProps(props)) {
				props.unmount?.(node);
			} else if (isOpenProps(props)) {
				props.close?.();
			}
		}
	};
};

export default clerkUI;
