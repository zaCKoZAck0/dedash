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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '~/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '~/lib/utils';
import { Label } from '~/components/ui/label';
import { CalendarIcon } from 'lucide-react';
import { OnboardingProfile, Education } from './onboarding';

const DEFAULT_EDUCATION: Education = {
  institution: '',
  degree: '',
  fieldOfStudy: '',
  startDate: new Date(),
  isCurrent: false,
  description: [],
};

export function EducationPopover({
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
  const [education, setEducation] = React.useState<Education>(
    idx == -1 ? DEFAULT_EDUCATION : profile.education[idx]
  );

  const addEducation = () => {
    if (idx !== -1) {
      const newEducation = [...profile.education];
      newEducation[idx] = education;
      setProfile({
        ...profile,
        education: newEducation,
      });
    } else
      setProfile({
        ...profile,
        education: [...profile.education, education],
      });

    setEducation(DEFAULT_EDUCATION);
    setOpen(false);
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setEducation(DEFAULT_EDUCATION);
    } else if (idx !== -1) {
      setEducation(profile.education[idx]);
    }
    setOpen(open);
  };

  const deleteEducation = () => {
    const newEducation = [...profile.education];
    newEducation.splice(idx, 1);
    setProfile({
      ...profile,
      education: newEducation,
    });
    setOpen(false);
  };

  const disableNext =
    !education.institution ||
    !education.degree ||
    !education.fieldOfStudy ||
    !education.startDate ||
    (!education.isCurrent && !education.endDate);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='w-full max-w-[350px] rounded-md'>
        <DialogHeader>
          <DialogTitle>{idx === -1 ? 'Add' : 'Edit'} Education</DialogTitle>
        </DialogHeader>
        <div className='max-h-[400px] space-y-2 overflow-y-auto p-1'>
          <span tabIndex={0} />
          <div className='flex flex-col space-y-1.5'>
            <Label
              className='text-xs text-muted-foreground'
              htmlFor='institute'
            >
              Institution
            </Label>
            <Input
              id='institute'
              placeholder='Ex. Harvard University'
              value={education.institution}
              onChange={(e) =>
                setEducation({
                  ...education,
                  institution: e.target.value,
                })
              }
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground' htmlFor='degree'>
              Degree
            </Label>
            <Input
              id='degree'
              placeholder='Ex. Bachelor of Science'
              value={education.degree}
              onChange={(e) =>
                setEducation({
                  ...education,
                  degree: e.target.value,
                })
              }
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground' htmlFor='fos'>
              Field of Study
            </Label>
            <Input
              id='fos'
              placeholder='Ex. Computer Science'
              value={education.fieldOfStudy}
              onChange={(e) =>
                setEducation({
                  ...education,
                  fieldOfStudy: e.target.value,
                })
              }
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label className='text-xs text-muted-foreground' htmlFor='grade'>
              Grade
            </Label>
            <Input
              id='grade'
              placeholder='Ex. 3.5 GPA'
              value={education.grade}
              onChange={(e) =>
                setEducation({
                  ...education,
                  fieldOfStudy: e.target.value,
                })
              }
            />
          </div>
          <div className='flex items-center space-x-2 py-5 pl-2'>
            <Checkbox
              id='is-current'
              checked={education.isCurrent}
              onCheckedChange={(e) =>
                setEducation({
                  ...education,
                  endDate: Boolean(e.valueOf()) ? undefined : education.endDate,
                  isCurrent: Boolean(e.valueOf()),
                })
              }
            />
            <label
              htmlFor='is-current'
              className='text-sm font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              I currently study here.
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
                    !education.startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {education.startDate ? (
                    format(education.startDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={education.startDate}
                  onSelect={(date) =>
                    setEducation({
                      ...education,
                      startDate: date ?? new Date(),
                    })
                  }
                  captionLayout='dropdown'
                  fromYear={1950}
                  toYear={new Date().getFullYear()}
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
                  disabled={education.isCurrent}
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-sans font-normal',
                    !education.endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {education.endDate ? (
                    format(education.endDate, 'PPP')
                  ) : (
                    <span>
                      {education.isCurrent ? 'Present' : 'Pick a date'}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  hideHead
                  selected={education.endDate}
                  onSelect={(date) =>
                    setEducation({
                      ...education,
                      endDate: date,
                    })
                  }
                  fromDate={education.startDate}
                  captionLayout='dropdown'
                  fromYear={education.startDate.getFullYear()}
                  fromMonth={education.startDate}
                  toYear={new Date().getFullYear()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {idx !== -1 && (
          <div className='flex w-full justify-center'>
            <Button
              size='sm'
              variant='link'
              className='h-fit'
              onClick={deleteEducation}
            >
              Delete Education
            </Button>
          </div>
        )}
        <Button
          size='sm'
          className='flex-grow'
          disabled={disableNext}
          onClick={addEducation}
        >
          {idx === -1 ? 'Add ' : 'Update '}
          Education
        </Button>
      </DialogContent>
    </Dialog>
  );
}
