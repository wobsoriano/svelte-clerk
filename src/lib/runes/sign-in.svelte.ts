import { clerkContext } from '$lib/utils/context.js'
import type { SetActive, SignInResource } from '@clerk/types'

type UseSignInReturn =
  | { isLoaded: false, signIn: undefined, setActive: undefined }
  | { isLoaded: true, signIn: SignInResource, setActive: SetActive }

export const signIn = $derived.by<UseSignInReturn>(() => {
  const { client, clerk } = clerkContext.get()

  if (!client)
    return { isLoaded: false, signIn: undefined, setActive: undefined }

  return {
    isLoaded: true,
    signIn: client.signIn,
    setActive: clerk!.setActive,
  }
})
