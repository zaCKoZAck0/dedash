import { OnboardingProfile } from './onboarding';

export function Completed({ profile }: { profile: OnboardingProfile }) {
  return <div>{JSON.stringify(profile, null, 2)}</div>;
}
