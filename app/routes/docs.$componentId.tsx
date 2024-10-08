import { Link, NavLink, useParams } from '@remix-run/react';
import { ReactNode } from 'react';
import { Accordion } from '../accordion.tsx';
import { Avatar } from '../avatar.tsx';
import { CarouselMachine } from '../carousel-machine.tsx';
import { Checkbox } from '../checkbox.tsx';
import { Clipboard } from '../clipboard-machine.tsx';
import { Collapsible } from '../collapsible.tsx';
import { ColorPicker } from '../color-picker.tsx';
import { Combobox } from '../combobox.tsx';
import { ContextMenu, Menu, NestedMenu } from '../menu.tsx';
import { Countdown } from '../timer.tsx';
import { DatePicker } from '../date-picker.tsx';
import { Dialog } from '../dialog.tsx';
import { Editable } from '../editable.tsx';
import { FileUpload } from '../file-upload.tsx';
import { HoverCard } from '../hoverCard.tsx';
import { NumberInput } from '../number-input.tsx';
import { Pagination } from '../pagination.tsx';
import { Popover } from '../popover.tsx';
import { Presence } from '../presence.tsx';
import { ProgressCircular, ProgressLinear } from '../progress.tsx';
import { QRCode } from '../qr-code.tsx';
import { Radio, SegmentedControl } from '../radio-group.tsx';
import { Rating } from '../rating-group.tsx';
import { Select } from '../select-machine.tsx';
import { SignaturePad } from '../signature-pad.tsx';
import { RangeSlider, Slider } from '../slider.tsx';
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
      name: 'Carousel',
      C: CarouselMachine,
    },
    clipboard: {
      name: 'Clipboard',
      C: Clipboard,
    },
    checkbox: {
      name: 'Checkbox',
      C: Checkbox,
    },
    'color-picker': {
      name: 'Color Picker',
      C: ColorPicker,
    },
    'context-menu': {
      name: 'Context Menu',
      C: ContextMenu,
    },
    countdown: {
      name: 'Countdown',
      C: Countdown,
    },
    'date-picker': {
      name: 'Date Picker',
      C: DatePicker,
    },
    dialog: {
      name: 'Dialog',
      C: Dialog,
    },
    editable: {
      name: 'Editable',
      C: Editable,
    },
    'file-upload': {
      name: 'File Upload',
      C: FileUpload,
    },
    'hover-card': {
      name: 'Hover Card',
      C: HoverCard,
    },
    menu: {
      name: 'Menu',
      C: Menu,
    },
    'nested-menu': {
      name: 'Nested Menu',
      C: NestedMenu,
    },
    'number-input': {
      name: 'Number Input',
      C: NumberInput,
    },
    pagination: {
      name: 'Pagination',
      C: Pagination,
    },
    popover: {
      name: 'Popover',
      C: Popover,
    },
    presence: {
      name: 'Presence',
      C: () => <Presence present>presence</Presence>,
    },
    'progress-circular': {
      name: 'Progress Circular',
      C: ProgressCircular,
    },
    'progress-linear': {
      name: 'Progress Linear',
      C: ProgressLinear,
    },
    'qr-code': {
      name: 'QR Code',
      C: QRCode,
    },
    radio: {
      name: 'Radio',
      C: Radio,
    },
    'range-slider': {
      name: 'Range Slider',
      C: RangeSlider,
    },
    rating: {
      name: 'Rating',
      C: Rating,
    },
    'segmented-control': {
      name: 'Segmented Control',
      C: SegmentedControl,
    },
    select: {
      name: 'Select',
      C: Select,
    },
    'signature-pad': {
      name: 'Signature Pad',
      C: SignaturePad,
    },
    slider: {
      name: 'Slider',
      C: Slider,
    },
    splitter: {
      name: 'Splitter',
      C: Splitter,
    },
    steps: {
      name: 'Steps',
      C: Steps,
    },
    switch: {
      name: 'Switch',
      C: Switch,
    },
    tabs: {
      name: 'Tabs',
      C: Tabs,
    },
    'tags-input': {
      name: 'Tags Input',
      C: TagsInput,
    },
    'toggle-group': {
      name: 'Toggle Group',
      C: ToggleGroup,
    },
    tooltip: {
      name: 'Tooltip',
      C: Tooltip,
    },
    tour: {
      name: 'Tour',
      C: Tour,
    },
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
      <div className="flex flex-col flex-1 items-center p-10">
        <p>{name || id} docs</p>
        <div className="flex flex-col items-center justify-center p-10">
          <div>
            <C />
          </div>
        </div>
      </div>
    </div>
  );
}
