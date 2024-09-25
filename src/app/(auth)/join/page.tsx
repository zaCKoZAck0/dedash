import { auth } from '~/auth';
import { LoginButtons } from './_components/login-buttons';

export default async function JoinPage() {
  const session = await auth();

  return <LoginButtons session={session} />;
}
