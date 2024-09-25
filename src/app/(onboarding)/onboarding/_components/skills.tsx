import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useWizard } from 'react-use-wizard';
import { Button } from '~/components/ui/button';
import { CardContent, CardFooter } from '~/components/ui/card';
import { SkillTags } from './skill-tags';
import { OnboardingProfile } from './onboarding';

export function Skills({
  profile,
  setProfile,
}: {
  profile: OnboardingProfile;
  setProfile: (profile: OnboardingProfile) => void;
}) {
  const { nextStep, previousStep } = useWizard();

  console.log(profile);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(24px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(24px)' }}
      transition={{ duration: 0.3 }}
    >
      <CardContent className='grid w-full items-center gap-4'>
        <SkillTags profile={profile} setProfile={setProfile} />
      </CardContent>
      <CardFooter className='flex justify-between gap-2'>
        <Button size='sm' variant='secondary' onClick={previousStep}>
          Back
        </Button>
        <Button size='sm' onClick={nextStep} className='flex-grow'>
          Next
          <ArrowRight size={16} className='ml-1' />
        </Button>
      </CardFooter>
    </motion.div>
  );
}
