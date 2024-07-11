import { clerkContext } from "$lib/utils/context.js";
import type { SessionResource, SetActive } from "@clerk/types";

type UseSessionListReturn =
  | { isLoaded: false, sessions: undefined, setActive: undefined }
  | { isLoaded: true, sessions: SessionResource[], setActive: SetActive }

export const sessionList = $derived.by<UseSessionListReturn>(() => {
  const { clerk, client } = clerkContext.get()

  if (!client)
    return { isLoaded: false, sessions: undefined, setActive: undefined }

  return {
    isLoaded: true,
    sessions: client.sessions,
    setActive: clerk!.setActive,
  }
})
