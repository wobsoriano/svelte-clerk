import _UserButton from './UserButton.svelte';
import UserButtonAction from './UserButtonAction.svelte';
import UserButtonLink from './UserButtonLink.svelte';
import UserButtonMenuItems from './UserButtonMenuItems.svelte';

// Temporary fix to "cannot be named" issue when building d.ts.
// See https://github.com/sveltejs/svelte/discussions/12481
type UserButtonType = typeof _UserButton & {
	MenuItems: typeof UserButtonMenuItems;
	Action: typeof UserButtonAction;
	Link: typeof UserButtonLink;
};

const UserButton: UserButtonType = Object.assign(_UserButton, {
	MenuItems: UserButtonMenuItems,
	Action: UserButtonAction,
	Link: UserButtonLink
});

export default UserButton;
