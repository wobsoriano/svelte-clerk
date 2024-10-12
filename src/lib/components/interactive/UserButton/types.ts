import type { CustomMenuItem } from '@clerk/types';

export type UserButtonContext = {
	addCustomAction(
		item: Pick<CustomMenuItem, 'label' | 'onClick' | 'mountIcon' | 'unmountIcon'>
	): void;
	addCustomLink(
		item: Pick<CustomMenuItem, 'label' | 'href' | 'mountIcon' | 'unmountIcon'>
	): void;
};
