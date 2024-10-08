import { Link, useParams } from '@remix-run/react';
import { Accordion } from '../accordion.tsx';
import { ReactNode } from 'react';
import { Avatar } from '../avatar.tsx';
import { Combobox } from '../combobox.tsx';
import { Collapsible } from '../collapsible.tsx';
import { CarouselMachine } from '../carousel-machine.tsx';
import { Checkbox } from '../checkbox-machine.tsx';
import { Clipboard } from '../clipboard-machine.tsx';
import { ColorPicker } from '../color-picker.tsx';
import { DatePicker } from '../date-picker.tsx';
import { Dialog } from '../dialog.tsx';
import { Editable } from '../editable.tsx';
import { FileUpload } from '../file-upload.tsx';
import { HoverCard } from '../hoverCard.tsx';
import { ContextMenu, Menu, NestedMenu } from '../menu.tsx';
import { NumberInput } from '../number-input.tsx';
import { Pagination } from '../pagination.tsx';
import { Popover } from '../popover.tsx';
import { Presence } from '../presence.tsx';
import { ProgressCircular, ProgressLinear } from '../progress.tsx';
import { QRCode } from '../qr-code.tsx';
import { Radio, SegmentedControl } from '../radio-group.tsx';
import { RangeSlider, Slider } from '../slider.tsx';
import { Rating } from '../rating-group.tsx';
import { Select } from '../select.tsx';
import { Select as SelectMachine } from '../select-machine.tsx';
import { SignaturePad } from '../signature-pad.tsx';
import { Countdown } from '../timer.tsx';
import { CountdownMachine } from '../timer-machine.tsx';
import { Splitter } from '../splitter.tsx';
import { Steps } from '../steps.tsx';
import { Switch } from '../switch.tsx';
import { Tabs } from '../tabs.tsx';
import { TagsInput } from '../tags-input.tsx';
import { ToggleGroup } from '../toggle-group.tsx';
import { Tooltip } from '../tooltip.tsx';
import { Tour } from '../tour.tsx';

export const components: Record<string, { name?: string; C: () => ReactNode }> =
  {
    accordion: { name: 'Accordion', C: Accordion },
    avatar: {
      name: 'Avatar',
      C: () => <Avatar src="https://github.com/shadcn.png" />,
    },
    combobox: {
      name: 'Comobobox',
      C: Combobox,
    },
    collapsible: {
      name: 'Collapsible',
      C: Collapsible,
    },
    carousel: {
      C: CarouselMachine,
    },
    clipboard: {
      C: Clipboard,
    },
    checkbox: {
      C: Checkbox,
    },
    colorPicker: {
      C: ColorPicker,
    },
    contextMenu: {
      C: ContextMenu,
    },
    //   <Clipboard />
    //   <Checkbox />
    //   <ColorPicker />
    //   <ContextMenu />
    //   <Countdown />
    //   <CountdownMachine />
    //   <DatePicker />
    //   <Dialog />
    //   <Editable />
    //   <FileUpload />
    //   <HoverCard />
    //   <Menu />
    //   <NestedMenu />
    //   <NumberInput />
    //   <Pagination />
    //   <Popover />
    //   <Presence present>presence</Presence>
    //   <ProgressCircular />
    //   <ProgressLinear />
    //   <QRCode />
    //   <Radio />
    //   <RangeSlider />
    //   <Rating />
    //   <SegmentedControl />
    //   <Select />
    //   <SelectMachine />
    //   <SignaturePad />
    //   <Slider />
    //   <Splitter />
    //   <Steps />
    //   <Switch />
    //   <Tabs />
    //   <TagsInput />
    //   <ToggleGroup />
    //   <Tooltip />
    //   <Tour />
  };

export default function Components() {
  const { componentId } = useParams();

  if (!componentId || !(componentId in components)) {
    return <p>404 {componentId} does not exist</p>;
  }

  const id = componentId as keyof typeof components;

  const { C, name } = components[id];

  const renderSideBar = () => {
    return (
      <aside className="flex flex-col gap-1 py-5 px-3">
        <Link to="/">Index</Link>
        <p className="font-semibold">Components</p>

        {Object.entries(components).map(([id, comp]) => (
          <Link key={id} to={`/docs/${id}`}>
            {comp.name || id}
          </Link>
        ))}
      </aside>
    );
  };

  return (
    <div className="flex min-h-screen">
      {renderSideBar()}
      <div className="flex flex-col flex-1 items-center justify-center">
        <p>
          {componentId} docs {name || id}
        </p>
        <C />
      </div>
    </div>
  );
}
