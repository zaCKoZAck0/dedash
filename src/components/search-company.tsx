'use client';

import * as React from 'react';
import { BuildingIcon, ChevronsUpDown } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Button } from '~/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';

import Image from 'next/image';
import { useDebounce } from '~/hooks/use-debounce';
import { WorkExperience } from '~/app/(onboarding)/onboarding/_components/onboarding';

interface Company {
  name: string;
  domain: string;
  logo: string;
}

export function SearchCompany({
  experience,
  setWorkExperience,
}: {
  experience: WorkExperience;
  setWorkExperience: (experience: WorkExperience) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const queryClient = useQueryClient();

  const getFromCache = (key: string) => {
    console.log(queryClient.getQueryData([key]));
    return queryClient.getQueryData([key]);
  };

  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useQuery<Company[]>({
    queryKey: [`search/${debouncedSearch}`],
    queryFn: async (arg) => {
      const cache = getFromCache(`search/${debouncedSearch}`); // try to access the data from cache
      if (cache) return cache; // use the data if in the cache

      if (debouncedSearch === '') return [];

      // if not, get the data
      const data = await axios.get(
        `https://search.logo.dev/?query=${
          (arg.queryKey as string[])[0].split('/')[1]
        }`
      );

      return data.data;
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between font-sans font-normal'
        >
          <div className='flex items-center gap-3'>
            {experience.companyUrl && (
              <Image
                alt={experience.company}
                src={`https://img.logo.dev/${experience.companyUrl}?token=pk_eQPbG0_jSyqQCL92PlOJHw`}
                height={24}
                width={24}
                className='size-5 rounded'
              />
            )}
            {experience.companyUrl || experience.company
              ? (data?.find(
                  (company) => company.domain === experience.companyUrl
                )?.name ?? experience.company)
              : 'Company Name'}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0'>
        <Command>
          <CommandInput
            placeholder='Ex. Amazon'
            onValueChange={(v) => setSearch(v)}
          />
          <CommandList>
            <CommandEmpty>{isLoading ? 'Searching..' : ''}</CommandEmpty>
            <CommandGroup>
              {data?.map((company) => (
                <CommandItem
                  key={company.domain}
                  value={company.domain}
                  onSelect={(currentValue) => {
                    setWorkExperience({
                      ...experience,
                      company:
                        data.find((company) => company.domain === currentValue)
                          ?.name ?? '',
                      companyUrl: currentValue,
                    });
                    setOpen(false);
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <Image
                      alt={company.name}
                      src={`https://img.logo.dev/${company.domain}?token=pk_eQPbG0_jSyqQCL92PlOJHw`}
                      height={24}
                      width={24}
                      className='size-8 rounded'
                    />
                    <div>
                      <p>{company.name}</p>
                      <p className='text-xs text-muted-foreground'>
                        {company.domain}
                      </p>
                    </div>
                  </div>
                </CommandItem>
              ))}
              {search.length > 1 && (data?.length ?? 0) < 1 && (
                <CommandItem
                  key={search}
                  value={search}
                  onSelect={() => {
                    setWorkExperience({
                      ...experience,
                      company: search,
                    });
                    setOpen(false);
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <div className='rounded bg-muted p-1 text-muted-foreground'>
                      <BuildingIcon size={24} />
                    </div>
                    <div>
                      <p>{search}</p>
                      <p className='text-xs text-muted-foreground'>
                        no domain.
                      </p>
                    </div>
                  </div>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
