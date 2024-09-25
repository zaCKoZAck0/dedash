import { motion } from 'framer-motion';
import { ArrowRight, Edit, PlusIcon, Trash } from 'lucide-react';
import { useWizard } from 'react-use-wizard';
import { Button } from '~/components/ui/button';
import { CardContent, CardFooter } from '~/components/ui/card';
import { OnboardingProfile } from './onboarding';
import React from 'react';
import { WorkExperiencePopover } from './experience-popover';
import Image from 'next/image';
import { cn } from '~/lib/utils';

export function JobDetails({
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
        <WorkExperiencePopover profile={profile} setProfile={setProfile}>
          <button
            className={cn(
              'flex items-center justify-center gap-2 text-muted-foreground',
              profile.workExperience.length > 0
                ? 'font-mono font-medium text-primary hover:underline'
                : 'rounded-xl border-4 border-dashed py-10 text-xl font-bold'
            )}
          >
            <PlusIcon
              className={
                profile.workExperience.length > 0 ? 'hidden' : 'stroke-[3px]'
              }
            />
            Add Work Experience
          </button>
        </WorkExperiencePopover>
        <div className='max-h-[250px] w-full space-y-2 overflow-y-auto'>
          {profile.workExperience.map((experience, index) => (
            <table key={index} className='group w-full'>
              <tbody className='w-full'>
                <tr className='relative flex w-full items-start gap-2 rounded border p-2'>
                  <td>
                    <Image
                      alt={experience.company}
                      src={`https://img.logo.dev/${experience.companyUrl}?token=pk_eQPbG0_jSyqQCL92PlOJHw`}
                      height={54}
                      width={54}
                      className='size-8 rounded'
                    />
                  </td>
                  <td>
                    <p className='text-xs font-medium'>{experience.position}</p>
                    <p className='text-xs'>{experience.company}</p>
                    <p className='text-xs text-muted-foreground'>
                      {experience.startDate.toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}{' '}
                      -{' '}
                      {experience.isCurrent
                        ? 'Present'
                        : experience.endDate?.toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                          })}
                    </p>
                  </td>
                  <td className='absolute right-2 top-2 hidden gap-1 group-hover:flex'>
                    <WorkExperiencePopover
                      idx={index}
                      profile={profile}
                      setProfile={setProfile}
                    >
                      <Button
                        size='icon'
                        className='h-fit w-fit px-1.5 py-1'
                        variant='outline'
                      >
                        <Edit size={14} />
                      </Button>
                    </WorkExperiencePopover>
                    <Button
                      size='icon'
                      className='h-fit w-fit px-1.5 py-1'
                      variant='outline'
                    >
                      <Trash size={14} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
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
