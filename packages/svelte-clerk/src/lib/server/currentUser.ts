import type { AuthObject, User } from "@clerk/backend";
import { clerkClient } from "./clerkClient.js";

export function createCurrentUser(auth: AuthObject) {
  return async (): Promise<User | null> => {
    if (!auth.userId) {
      return null;
    }

    const user = await clerkClient.users.getUser(auth.userId);
    return user;
  }
}
