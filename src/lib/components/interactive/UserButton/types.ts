import type { CustomMenuItem } from '@clerk/types';

type BaseItem = Pick<CustomMenuItem, 'label' | 'mountIcon' | 'unmountIcon'>;

type ActionItem = BaseItem & {
	onClick: CustomMenuItem['onClick'];
};

type LinkItem = BaseItem & {
	href: CustomMenuItem['href'];
};

type MenuItemType = 'action' | 'link';

export type UserButtonContext = {
	addCustomMenuItem<T extends MenuItemType>(
		type: T,
		item: T extends 'action' ? ActionItem : LinkItem
	): void;
};
