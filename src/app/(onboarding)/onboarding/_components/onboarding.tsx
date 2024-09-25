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
import { JobDetails } from './experience-details';
import { EducationDetails } from './education-details';
import { Session } from 'next-auth';
import { useState } from 'react';
import { Skills } from './skills';
import { Bio } from './bio';
import { Completed } from './completed';

export interface WorkExperience {
  company: string;
  companyUrl?: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isCurrentRole: boolean;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  grade?: string;
  description: string[];
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
          <EducationDetails profile={profile} setProfile={setProfile} />
          <Skills profile={profile} setProfile={setProfile} />
          <Bio profile={profile} setProfile={setProfile} />
          <Completed profile={profile} />
        </Wizard>
      </AnimatePresence>
    </Card>
  );
}
