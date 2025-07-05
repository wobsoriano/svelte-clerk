import { verifyWebhook as _verifyWebhook  } from "@clerk/backend/webhooks";
import { env } from '$env/dynamic/private';

export * from '@clerk/backend/webhooks';

export function verifyWebhook(...args: Parameters<typeof _verifyWebhook>) {
  return _verifyWebhook(args[0], {
    signingSecret: env.CLERK_WEBHOOK_SIGNING_SECRET,
    ...args[1],
  })
}
