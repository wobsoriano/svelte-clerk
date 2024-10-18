import type { CustomMenuItem, CustomPage } from '@clerk/types';

type ReorderItemLabel = 'manageAccount' | 'signOut';

type BaseActionItem = Pick<CustomMenuItem, 'label' | 'mountIcon' | 'unmountIcon'>;
type BaseLinkItem = Pick<CustomMenuItem, 'label' | 'href' | 'mountIcon' | 'unmountIcon'>;

type ActionItem =
	| { label: ReorderItemLabel }
	| (BaseActionItem & { open: string; onClick?: never })
	| (BaseActionItem & { onClick: CustomMenuItem['onClick']; open?: never });

type LinkItem = BaseLinkItem;

type MenuItemType = 'action' | 'link';

export type UserButtonContext = {
	addCustomMenuItem<T extends MenuItemType>(
		type: T,
		item: T extends 'action' ? ActionItem : LinkItem
	): void;
	addCustomPage(page: CustomPage): void;
};
