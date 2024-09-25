import { motion } from 'framer-motion';
import { ArrowRight, PlusIcon } from 'lucide-react';
import { useWizard } from 'react-use-wizard';
import { Button } from '~/components/ui/button';
import { CardContent, CardFooter } from '~/components/ui/card';

export function EducationDetails() {
  const { nextStep, previousStep } = useWizard();

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(24px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(24px)' }}
      transition={{ duration: 0.3 }}
    >
      <CardContent className='grid w-full items-center gap-4'>
        <button className='flex items-center justify-center gap-2 rounded-xl border-4 border-dashed py-10 text-xl font-bold text-muted-foreground'>
          <PlusIcon className='stroke-[3px]' />
          Add Education
        </button>
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
