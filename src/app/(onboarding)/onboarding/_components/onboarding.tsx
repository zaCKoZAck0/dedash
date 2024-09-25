'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '~/components/ui/card';
import { Wizard } from 'react-use-wizard';
import { AnimatePresence } from 'framer-motion';
import { PersonalDetails } from './personal-details';
import { JobDetails } from './job-details';
import { EducationDetails } from './education-details';
import { Session } from 'next-auth';
import { useState } from 'react';
import { Skills } from './skills';

export interface WorkExperience {
  company: string;
  companyUrl?: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  description: string;
}

export interface Skill {
  name: string;
  isPrimary: boolean;
}

export interface OnboardingProfile {
  name: string;
  bio: string;
  profilePicture: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
}

export function Onboarding({ session }: { session: Session | null }) {
  const [profile, setProfile] = useState<OnboardingProfile>({
    name: session?.user?.name || '',
    bio: '',
    profilePicture: session?.user?.image || '',
    workExperience: [],
    education: [],
    skills: [],
  });

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Complete your profile</CardTitle>
        <CardDescription>Add details for your public profile.</CardDescription>
      </CardHeader>
      <AnimatePresence mode='wait'>
        <Wizard startIndex={0}>
          <PersonalDetails profile={profile} setProfile={setProfile} />
          <JobDetails profile={profile} setProfile={setProfile} />
          <EducationDetails />
          <Skills profile={profile} setProfile={setProfile} />
        </Wizard>
      </AnimatePresence>
    </Card>
  );
}
