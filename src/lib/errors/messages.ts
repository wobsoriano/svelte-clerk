export const invalidStateError =
	'Invalid state. Feel free to submit a bug or reach out to support here: https://clerk.com/support';

export const unsupportedNonBrowserDomainOrProxyUrlFunction =
	'Unsupported usage of isSatellite, domain or proxyUrl. The usage of isSatellite, domain or proxyUrl as function is not supported in non-browser environments.';

export const useAuthHasRequiresRoleOrPermission =
	'Missing parameters. `has` from `auth` requires a permission or role key to be passed. Example usage: `has({permission: "org:posts:edit"})`';

export const noPathProvidedError = (componentName: string) =>
	`The <${componentName}/> component uses path-based routing by default unless a different routing strategy is provided using the \`routing\` prop. When path-based routing is used, you need to provide the path where the component is mounted on by using the \`path\` prop. Example: <${componentName} path={'/my-path'} />`;

export const incompatibleRoutingWithPathProvidedError = (componentName: string) =>
	`The \`path\` prop will only be respected when the Clerk component uses path-based routing. To resolve this error, pass \`routing='path'\` to the <${componentName}/> component, or drop the \`path\` prop to switch to hash-based routing. For more details please refer to our docs: https://clerk.com/docs`;
