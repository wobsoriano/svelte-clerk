import _UserButton from './UserButton.svelte';
import UserButtonAction from './UserButtonAction.svelte';
import UserButtonLink from './UserButtonLink.svelte';

const UserButton = Object.assign(_UserButton, {
	Action: UserButtonAction,
	Link: UserButtonLink
});

export default UserButton;
