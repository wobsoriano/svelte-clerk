import { clerkContext } from "$lib/utils/context.js";
import type { ActiveSessionResource } from "@clerk/types";

type UseSessionReturn =
  | { isLoaded: false, isSignedIn: undefined, session: undefined }
  | { isLoaded: true, isSignedIn: false, session: null }
  | { isLoaded: true, isSignedIn: true, session: ActiveSessionResource }

export const session = $derived.by<UseSessionReturn>(() => {
  const { session } = clerkContext.get()

  if (session === undefined)
    return { isLoaded: false, isSignedIn: undefined, session: undefined }

  if (session === null)
    return { isLoaded: true, isSignedIn: false, session: null }

  return { isLoaded: true, isSignedIn: true, session }
})
