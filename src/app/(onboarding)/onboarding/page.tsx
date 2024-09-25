import { auth } from '~/auth';
import { Onboarding } from './_components/onboarding';

export default async function JoinPage() {
  const session = await auth();

  return <Onboarding session={session} />;
}
