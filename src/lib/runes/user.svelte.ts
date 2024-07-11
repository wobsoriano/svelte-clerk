import { clerkContext } from '$lib/utils/context.js'
import type { UserResource } from '@clerk/types'

type UseUserReturn =
  | { isLoaded: false, isSignedIn: undefined, user: undefined }
  | { isLoaded: true, isSignedIn: false, user: null }
  | { isLoaded: true, isSignedIn: true, user: UserResource }

export const user = $derived.by<UseUserReturn>(() => {
  const { user } = clerkContext.get()

  if (user === undefined)
    return { isLoaded: false, isSignedIn: undefined, user: undefined }

  if (user === null)
    return { isLoaded: true, isSignedIn: false, user: null }

  return { isLoaded: true, isSignedIn: true, user }
})
