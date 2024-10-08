import { Link, NavLink, useParams } from '@remix-run/react';
import { ReactNode } from 'react';
import { Accordion } from '../accordion.tsx';
import { Avatar } from '../avatar.tsx';
import { CarouselMachine } from '../carousel-machine.tsx';
import { Checkbox } from '../checkbox-machine.tsx';
import { Clipboard } from '../clipboard-machine.tsx';
import { Collapsible } from '../collapsible.tsx';
import { ColorPicker } from '../color-picker.tsx';
import { Combobox } from '../combobox.tsx';
import { ContextMenu } from '../menu.tsx';

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
          <NavLink
            key={id}
            to={`/docs/${id}`}
            className="aria-[current=page]:font-bold aria-[current=page]:text-red-600"
          >
            {comp.name || id}
          </NavLink>
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
