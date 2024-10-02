import type { MetaFunction } from '@remix-run/node';
import { AccordionMachine } from '~/accordion-machine';
import { CarouselMachine } from '~/carousel-machine';
import { Checkbox } from '~/checkbox-machine';
import { Select } from '~/select';
import { Select as SelectMachine } from '~/select-machine';
import { Countdown } from '~/timer';
import { CountdownMachine } from '~/timer-machine';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="flex gap-5">
        <Select />
        <SelectMachine />
      </div>
      <div className="flex gap-5">
        <Countdown />
        <CountdownMachine />
      </div>
      <div className="flex gap-5">
        <AccordionMachine />
      </div>
      <div className="flex gap-5">
        <CarouselMachine />
      </div>
      <div className="flex gap-5">
        <Checkbox />
      </div>
    </div>
  );
}
