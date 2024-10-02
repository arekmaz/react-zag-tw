import type { MetaFunction } from '@remix-run/node';
import { AccordionMachine } from '~/accordion-machine';
import { CarouselMachine } from '~/carousel-machine';
import { Checkbox } from '~/checkbox-machine';
import { Clipboard } from '~/clipboard-machine';
import { Collapsible } from '~/collapsible';
import { ColorPicker } from '~/color-picker';
import { Combobox } from '~/combobox';
import { DatePicker } from '~/date-picker';
import { Dialog } from '~/dialog';
import { Editable } from '~/editable';
import { FileUpload } from '~/file-upload';
import { HoverCard } from '~/hoverCard';
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
    <div className="flex h-screen items-center justify-center flex-col py-10 gap-10">
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
      <div className="flex gap-5">
        <Clipboard />
      </div>
      <Collapsible />
      <ColorPicker />
      <Combobox />
      <DatePicker />
      <Dialog />
      <Editable />
      <FileUpload />
      <HoverCard />
    </div>
  );
}
