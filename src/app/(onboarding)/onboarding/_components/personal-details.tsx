import { Label } from '~/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowRight, Edit } from 'lucide-react';
import { useWizard } from 'react-use-wizard';
import { Button } from '~/components/ui/button';
import { CardContent, CardFooter } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { OnboardingProfile } from './onboarding';

export function PersonalDetails({
  profile,
  setProfile,
}: {
  profile: OnboardingProfile;
  setProfile: (profile: OnboardingProfile) => void;
}) {
  const { nextStep } = useWizard();

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(24px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(24px)' }}
      transition={{ duration: 0.3 }}
    >
      <CardContent className='grid w-full items-center gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label className='text-xs text-muted-foreground' htmlFor='name'>
            Profile Picture
          </Label>
          <div className='flex justify-center'>
            <div
              className='relative size-32 rounded-full bg-muted text-xs'
              style={{
                backgroundImage: `url(${profile.profilePicture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* TODO: Make it actually upload photos. */}
              <Button
                size='sm'
                variant='outline'
                className='absolute bottom-[-0.5rem] right-[30%] h-fit translate-x-[10%] px-2 py-1 shadow'
              >
                Edit <Edit size={12} className='ml-1' />
              </Button>
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label className='text-xs text-muted-foreground' htmlFor='name'>
            Name
          </Label>
          <Input
            id='name'
            placeholder='Your full name'
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
          />
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button size='sm' onClick={nextStep} className='flex-grow'>
          Next
          <ArrowRight size={16} className='ml-1' />
        </Button>
      </CardFooter>
    </motion.div>
  );
}
