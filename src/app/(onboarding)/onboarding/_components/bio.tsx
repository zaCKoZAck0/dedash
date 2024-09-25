import { motion } from 'framer-motion';
import { useWizard } from 'react-use-wizard';
import { Button } from '~/components/ui/button';
import { CardContent, CardFooter } from '~/components/ui/card';
import { Textarea } from '~/components/ui/textarea';
import { OnboardingProfile } from './onboarding';

export function Bio({
  profile,
  setProfile,
}: {
  profile: OnboardingProfile;
  setProfile: (profile: OnboardingProfile) => void;
}) {
  const { nextStep, previousStep } = useWizard();

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(24px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(24px)' }}
      transition={{ duration: 0.3 }}
    >
      <CardContent className='grid w-full items-center gap-4'>
        <div className='space-y-1.5'>
          <label className='text-xs text-muted-foreground' htmlFor='bio'>
            Bio
          </label>
          <Textarea
            id='bio'
            placeholder='Tell us about yourself'
            className='w-full resize-none'
            rows={5}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-2'>
        <Button size='sm' variant='secondary' onClick={previousStep}>
          Back
        </Button>
        <Button size='sm' onClick={nextStep} className='flex-grow'>
          Done
        </Button>
      </CardFooter>
    </motion.div>
  );
}
