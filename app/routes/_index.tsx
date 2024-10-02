import type { MetaFunction } from '@remix-run/node';
import { AccordionMachine } from '~/accordion';
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
import { ContextMenu, Menu, NestedMenu } from '~/menu';
import { NumberInput } from '~/number-input';
import { Pagination } from '~/pagination';
import { Popover } from '~/popover';
import { Presence } from '~/presence';
import { ProgressCircular, ProgressLinear } from '~/progress';
import { QRCode } from '~/qr-code';
import { Radio, SegmentedControl } from '~/radio-group';
import { RangeSlider, Slider } from '~/slider';
import { Rating } from '~/rating-group';
import { Select } from '~/select';
import { Select as SelectMachine } from '~/select-machine';
import { SignaturePad } from '~/signature-pad';
import { Countdown } from '~/timer';
import { CountdownMachine } from '~/timer-machine';
import { Splitter } from '~/splitter';
import { Steps } from '~/steps';
import { Switch } from '~/switch';
import { Tabs } from '~/tabs';
import { TagsInput } from '~/tags-input';
import { ToggleGroup } from '~/toggle-group';
import { Tooltip } from '~/tooltip';
import { Tour } from '~/tour';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center flex-col py-10 gap-10">
      <AccordionMachine />
      <Combobox />
      {
        // <CarouselMachine />
        // <Checkbox />
        // <Clipboard />
        // <Collapsible />
        // <ColorPicker />
        // <ContextMenu />
        // <Countdown />
        // <CountdownMachine />
        // <DatePicker />
        // <Dialog />
        // <Editable />
        // <FileUpload />
        // <HoverCard />
        // <Menu />
        // <NestedMenu />
        // <NumberInput />
        // <Pagination />
        // <Popover />
        // <Presence present>presence</Presence>
        // <ProgressCircular />
        // <ProgressLinear />
        // <QRCode />
        // <Radio />
        // <RangeSlider />
        // <Rating />
        // <SegmentedControl />
        // <Select />
        // <SelectMachine />
        // <SignaturePad />
        // <Slider />
        // <Splitter />
        // <Steps />
        // <Switch />
        // <Tabs />
        // <TagsInput />
        // <ToggleGroup />
        // <Tooltip />
        // <Tour />
      }
    </div>
  );
}
