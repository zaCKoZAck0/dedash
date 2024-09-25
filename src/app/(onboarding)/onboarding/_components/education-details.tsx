import {
  ArrowRight,
  Edit,
  GraduationCap,
  PlusIcon,
  Trash2,
} from 'lucide-react';
import { useWizard } from 'react-use-wizard';
import { Button } from '~/components/ui/button';
import { CardContent, CardFooter } from '~/components/ui/card';
import { OnboardingProfile } from './onboarding';
import React from 'react';
import { EducationPopover } from './education-popover';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '~/lib/utils';

export function EducationDetails({
  profile,
  setProfile,
}: {
  profile: OnboardingProfile;
  setProfile: (profile: OnboardingProfile) => void;
}) {
  const { nextStep, previousStep } = useWizard();

  const deleteEducation = (idx: number) => {
    setProfile({
      ...profile,
      education: profile.education.filter((_, index) => index !== idx),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(24px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(24px)' }}
      transition={{ duration: 0.3 }}
    >
      <CardContent className='grid w-full items-center gap-4'>
        <EducationPopover profile={profile} setProfile={setProfile}>
          <button
            className={cn(
              'flex items-center justify-center gap-2 text-muted-foreground',
              profile.education.length > 0
                ? 'font-mono font-medium text-primary underline-offset-4 hover:underline'
                : 'rounded-xl border-4 border-dashed py-10 text-xl font-bold'
            )}
          >
            <PlusIcon
              className={
                profile.education.length > 0 ? 'hidden' : 'stroke-[3px]'
              }
            />
            Add Education
          </button>
        </EducationPopover>
        <motion.div
          layout
          className='max-h-[250px] w-full space-y-2 overflow-y-auto'
        >
          <AnimatePresence mode='popLayout'>
            {profile.education.map((education, index) => (
              <motion.table
                key={index}
                layout
                initial={{ opacity: 0, filter: 'blur(24px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(24px)' }}
                transition={{ duration: 0.3 }}
                className='group w-full'
              >
                <tbody className='w-full'>
                  <tr className='relative flex w-full items-start gap-2 rounded border p-2'>
                    <td>
                      <div className='rounded bg-muted p-1.5'>
                        <GraduationCap
                          size={24}
                          className='text-muted-foreground'
                        />
                      </div>
                    </td>
                    <td>
                      <p className='text-xs font-medium'>
                        {education.institution}
                      </p>
                      <p className='text-xs'>
                        {education.degree} - {education.fieldOfStudy}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {education.startDate.toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        -{' '}
                        {education.isCurrent
                          ? 'Present'
                          : education.endDate?.toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            })}
                      </p>
                    </td>
                    <td className='absolute right-2 top-2 hidden gap-2 text-muted-foreground group-hover:flex'>
                      <EducationPopover
                        idx={index}
                        profile={profile}
                        setProfile={setProfile}
                      >
                        <button title='edit'>
                          <span className='sr-only'>edit</span>
                          <Edit className='hover:text-primary' size={14} />
                        </button>
                      </EducationPopover>
                      <button
                        onClick={() => deleteEducation(index)}
                        title='delete'
                      >
                        <span className='sr-only'>delete</span>
                        <Trash2 className='hover:text-destructive' size={14} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </motion.table>
            ))}
          </AnimatePresence>
        </motion.div>
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
