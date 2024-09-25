'use server';

import { signIn, signOut } from '~/auth';

export const handleSignIn = async (provider: string, redirectUrl = '/') => {
  await signIn(provider, {
    redirect: true,
    redirectTo: redirectUrl,
  });
};

export const handleSignOut = async () => {
  await signOut();
};
