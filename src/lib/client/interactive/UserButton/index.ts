import _UserButton from './UserButton.svelte';
import UserButtonAction from './UserButtonAction.svelte';
import UserButtonLink from './UserButtonLink.svelte';
import UserButtonMenuItems from './UserButtonMenuItems.svelte';
import UserButtonUserProfilePage from './UserButtonUserProfilePage.svelte';

const UserButton = Object.assign(_UserButton, {
	MenuItems: UserButtonMenuItems,
	Action: UserButtonAction,
	Link: UserButtonLink,
	UserProfilePage: UserButtonUserProfilePage
});

export default UserButton;
