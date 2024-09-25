'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Star } from 'lucide-react';
import { Label } from '~/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingProfile } from './onboarding';

// Todo: Do this on the server
const predefinedSkills = [
  'Programming',
  'Web Development',
  'Database',
  'Machine Learning',
  'Cloud Computing',
  'Cybersecurity',
  'Data Science',
  'Design',
  'Photography',
  'Music Production',
  'Project Management',
  'Digital Marketing',
  'Content Writing',
  'SEO',
  'UI/UX Design',
  'Mobile App Development',
  'Game Development',
  'DevOps',
  'Blockchain',
  'Artificial Intelligence',
  'Network Administration',
  'Business Analysis',
  'Technical Writing',
  'Quality Assurance',
  'Agile Methodologies',
  'Data Visualization',
  'Big Data',
  'IoT',
  'AR/VR Development',
  'Customer Service',
  'Sales',
  'Public Speaking',
  'Leadership',
  'Team Management',
  'Financial Analysis',
  'Accounting',
  'Legal Research',
  'Video Editing',
  'Animation',
  'Graphic Design',
  'Illustration',
  '3D Modeling',
  'Product Management',
  'Scrum',
  'Data Analysis',
  'Statistical Analysis',
  'Market Research',
  'Social Media Management',
  'Email Marketing',
  'Copywriting',
  'Podcasting',
  'Video Production',
  'Barista',
];

export function SkillTags({
  profile,
  setProfile,
}: {
  profile: OnboardingProfile;
  setProfile: (profile: OnboardingProfile) => void;
}) {
  const [inputValue, setInputValue] = useState('');
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (inputValue) {
      const filtered = predefinedSkills.filter(
        (skill) =>
          skill.toLowerCase().includes(inputValue.toLowerCase()) &&
          !profile.skills.some(
            (existingSkill) =>
              existingSkill.name.toLowerCase() === skill.toLowerCase()
          )
      );
      setFilteredSkills(filtered);
      setIsSearching(true);
    } else {
      setFilteredSkills([]);
      setIsSearching(false);
    }
  }, [inputValue, profile?.skills]);

  const addSkill = (skillName: string) => {
    if (
      skillName &&
      !profile.skills.some(
        (skill) => skill.name.toLowerCase() === skillName.toLowerCase()
      )
    ) {
      setProfile({
        ...profile,
        skills: [...profile.skills, { name: skillName, isPrimary: false }],
      });
      setInputValue('');
      setIsSearching(false);
    }
  };

  const toggleTopSkill = (index: number) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index].isPrimary = !updatedSkills[index].isPrimary;
    setProfile({ ...profile, skills: updatedSkills });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = profile.skills.filter((_, i) => i !== index);
    setProfile({ ...profile, skills: updatedSkills });
  };

  return (
    <div className='mx-auto w-full max-w-md space-y-4'>
      <div className='relative space-y-1.5' ref={searchRef}>
        <Label className='text-xs text-muted-foreground' htmlFor='name'>
          Skills
        </Label>
        <Input
          type='text'
          placeholder='Search or add a skill'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {isSearching && filteredSkills.length > 0 && (
          <div className='absolute z-10 mt-1.5 max-h-60 w-full space-y-1 overflow-auto rounded-md border bg-background p-1 shadow-lg'>
            {filteredSkills.map((skill, index) => (
              <div
                key={index}
                className='cursor-pointer rounded px-2 py-1 text-sm hover:bg-secondary hover:text-secondary-foreground'
                onClick={() => addSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        )}
      </div>
      <motion.div layout className='mt-4 flex flex-wrap gap-2'>
        <AnimatePresence>
          {profile.skills.map((skill, index) => {
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  key={index}
                  variant={skill.isPrimary ? 'default' : 'secondary'}
                  className='flex items-center space-x-1 pr-1'
                >
                  <span>{skill.name}</span>

                  <Button
                    variant='ghost'
                    title='Make top skill'
                    size='sm'
                    className='h-4 w-4 bg-transparent p-0 text-inherit hover:bg-transparent hover:text-inherit'
                    onClick={() => toggleTopSkill(index)}
                  >
                    <Star
                      className={`h-3 w-3 ${skill.isPrimary ? 'fill-current' : ''}`}
                    />
                  </Button>

                  <Button
                    variant='ghost'
                    title='Remove skill'
                    size='sm'
                    className='h-4 w-4 bg-transparent p-0 text-inherit hover:bg-transparent hover:text-inherit'
                    onClick={() => removeSkill(index)}
                  >
                    <span className='sr-only'>Remove</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='h-3 w-3'
                    >
                      <line x1='18' y1='6' x2='6' y2='18'></line>
                      <line x1='6' y1='6' x2='18' y2='18'></line>
                    </svg>
                  </Button>
                </Badge>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
