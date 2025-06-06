import type { Action } from 'svelte/action';

type AnyObject = any;

interface MountProps {
	mount: (node: HTMLDivElement, props: AnyObject) => void;
	unmount: (node: HTMLDivElement) => void;
	updateProps: (props: AnyObject) => void;
	props?: AnyObject;
}

interface OpenProps {
	open: (props: AnyObject) => void;
	close: () => void;
	props?: AnyObject;
}

const isMountProps = (props: AnyObject): props is MountProps => {
	return 'mount' in props;
};

const isOpenProps = (props: AnyObject): props is OpenProps => {
	return 'open' in props;
};

/**
 * Used to orchestrate mounting of Clerk components in a host Svelte application.
 * Components are rendered into a specific DOM node using mount/unmount methods provided by the Clerk class.
 */
export const clerkHostRenderer: Action<HTMLDivElement, MountProps | OpenProps> = (node, props) => {
	if (isMountProps(props)) {
		props.mount(node, props.props);
	} else if (isOpenProps(props)) {
		props.open(props.props);
	}

	return {
		update: ({ props: updatedProps }) => {
			if (isMountProps(props)) {
				props.updateProps({ node, props: updatedProps });
			}
		},
		destroy: () => {
			if (isMountProps(props)) {
				props.unmount(node);
			} else if (isOpenProps(props)) {
				props.close();
			}
		}
	};
};
