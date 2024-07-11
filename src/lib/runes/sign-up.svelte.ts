import { clerkContext } from '$lib/utils/context.js'
import type { SetActive, SignUpResource } from '@clerk/types'

type UseSignUpReturn =
  | { isLoaded: false, signUp: undefined, setActive: undefined }
  | { isLoaded: true, signUp: SignUpResource, setActive: SetActive }

export const signUp = $derived.by<UseSignUpReturn>(() => {
  const { client, clerk } = clerkContext.get()

  if (!client)
    return { isLoaded: false, signUp: undefined, setActive: undefined }

  return {
    isLoaded: true,
    signUp: client.signUp,
    setActive: clerk!.setActive,
  }
})
