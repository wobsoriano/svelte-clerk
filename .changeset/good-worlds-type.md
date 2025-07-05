---
'svelte-clerk': minor
---

Introduce `verifyWebhook()` helper

Make sure to set the `CLERK_WEBHOOK_SIGNING_SECRET` environment variable in your SvelteKit project to use this helper.

Usage:

```ts
import { verifyWebhook } from 'svelte-clerk/webhooks';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
  try {
    const evt = await verifyWebhook(request);
    if (evt.type === 'user.created') {
      // Handle user creation
      console.log('New user created:', evt.data.id);
    }
  } catch (err) {
    // Invalid webhook signature
    return new Response('Webhook verification failed', { status: 400 });
  }
};
```
