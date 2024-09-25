import * as React from 'react';
import { Calendar } from '~/components/ui/calendar';
import { Checkbox } from '~/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { SearchCompany } from '~/components/search-company';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '~/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '~/lib/utils';
import { Label } from '~/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { OnboardingProfile, WorkExperience } from './onboarding';

export function WorkExperiencePopover({
  profile,
  children,
  setProfile,
  idx = -1,
}: {
  profile: OnboardingProfile;
  children: React.ReactNode;
  setProfile: (profile: OnboardingProfile) => void;
  idx?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [experience, setWorkExperience] = React.useState<WorkExperience>(
    idx == -1
      ? {
          company: '',
          companyUrl: '',
          position: '',
          startDate: new Date(),
          isCurrent: false,
          description: '',
        }
      : profile.workExperience[idx]
  );

  const addWorkExperience = () => {
    if (idx !== -1) {
      const newWorkExperience = [...profile.workExperience];
      newWorkExperience[idx] = experience;
      setProfile({
        ...profile,
        workExperience: newWorkExperience,
      });
    } else
      setProfile({
        ...profile,
        workExperience: [...profile.workExperience, experience],
      });

    setOpen(false);
  };

  const deleteWorkExperience = () => {
    const newWorkExperience = [...profile.workExperience];
    newWorkExperience.splice(idx, 1);
    setProfile({
      ...profile,
      workExperience: newWorkExperience,
    });
    setOpen(false);
  };

  const disableNext =
    experience.company === '' ||
    experience.position === '' ||
    (!experience.isCurrent && !experience.endDate);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-full max-w-[350px] rounded-md'>
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
        </DialogHeader>
        <div className='space-y-2'>
          <div className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground' htmlFor='name'>
              Company
            </Label>
            <SearchCompany
              experience={experience}
              setWorkExperience={setWorkExperience}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground' htmlFor='title'>
              Title
            </Label>
            <Input
              id='title'
              placeholder='Ex. Software Engineer'
              value={experience.position}
              onChange={(e) =>
                setWorkExperience({
                  ...experience,
                  position: e.target.value,
                })
              }
            />
          </div>
          <div className='flex items-center space-x-2 py-5 pl-2'>
            <Checkbox
              id='terms'
              checked={experience.isCurrent}
              onCheckedChange={(e) =>
                setWorkExperience({
                  ...experience,
                  endDate: Boolean(e.valueOf())
                    ? undefined
                    : experience.endDate,
                  isCurrent: Boolean(e.valueOf()),
                })
              }
            />
            <label
              htmlFor='terms'
              className='text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              I currently work at this role.
            </label>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground' htmlFor='title'>
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-sans font-normal',
                    !experience.startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {experience.startDate ? (
                    format(experience.startDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={experience.startDate}
                  onSelect={(date) =>
                    setWorkExperience({
                      ...experience,
                      startDate: date ?? new Date(),
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground' htmlFor='title'>
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={experience.isCurrent}
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-sans font-normal',
                    !experience.endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {experience.endDate ? (
                    format(experience.endDate, 'PPP')
                  ) : (
                    <span>
                      {experience.isCurrent ? 'Present' : 'Pick a date'}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={experience.endDate}
                  onSelect={(date) =>
                    setWorkExperience({
                      ...experience,
                      endDate: date,
                    })
                  }
                  fromDate={experience.startDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {idx !== -1 && (
          <Button size='sm' variant='link' onClick={deleteWorkExperience}>
            Delete Experience
          </Button>
        )}
        <Button
          size='sm'
          className='flex-grow'
          disabled={disableNext}
          onClick={addWorkExperience}
        >
          {idx === -1 ? 'Add ' : 'Update '}
          Work Experience
        </Button>
      </DialogContent>
    </Dialog>
  );
}
