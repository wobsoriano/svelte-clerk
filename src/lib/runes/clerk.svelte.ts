import { clerkContext } from "$lib/utils/context.js"

export const clerk = $derived(clerkContext.get().clerk)
