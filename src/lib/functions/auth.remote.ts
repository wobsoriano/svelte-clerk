import { getRequestEvent, query } from '$app/server';
import { makeAuthObjectSerializable, stripPrivateDataFromObject } from '@clerk/backend/internal';
import type { InitialState } from '@clerk/types';

export const getInitialAuthState = query(() => {
  const event = getRequestEvent();
  const auth = event.locals.auth();
  const initialState = makeAuthObjectSerializable(stripPrivateDataFromObject(auth));
  return JSON.parse(JSON.stringify(initialState)) as InitialState
})
