import _UserButton from './UserButton.svelte';
import UserButtonAction from './UserButtonAction.svelte';
import UserButtonLink from './UserButtonLink.svelte';
import UserButtonMenuItems from './UserButtonMenuItems.svelte';
import UserButtonUserProfilePage from './UserButtonUserProfilePage.svelte';

// Temporary fix to "cannot be named" issue when building d.ts.
// See https://github.com/sveltejs/svelte/discussions/12481
type UserButtonType = typeof _UserButton & {
	MenuItems: typeof UserButtonMenuItems;
	Action: typeof UserButtonAction;
	Link: typeof UserButtonLink;
	UserProfilePage: typeof UserButtonUserProfilePage;
};

const UserButton: UserButtonType = Object.assign(_UserButton, {
	MenuItems: UserButtonMenuItems,
	Action: UserButtonAction,
	Link: UserButtonLink,
	UserProfilePage: UserButtonUserProfilePage
});

export default UserButton;
