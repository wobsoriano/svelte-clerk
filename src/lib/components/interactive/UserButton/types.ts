import type { CustomMenuItem } from '@clerk/types';

type ReorderItemLabel = 'manageAccount' | 'signOut';

type BaseActionItem = Pick<CustomMenuItem, 'label' | 'onClick' | 'mountIcon' | 'unmountIcon'>;
type BaseLinkItem = Pick<CustomMenuItem, 'label' | 'href' | 'mountIcon' | 'unmountIcon'>;

type ActionItem = { label: ReorderItemLabel } | BaseActionItem;

type LinkItem = BaseLinkItem;

type MenuItemType = 'action' | 'link';

export type UserButtonContext = {
	addCustomMenuItem<T extends MenuItemType>(
		type: T,
		item: T extends 'action' ? ActionItem : LinkItem
	): void;
};
