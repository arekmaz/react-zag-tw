import type { MetaFunction } from '@remix-run/node';
import { Select } from '~/select';
import { Select as SelectMachine } from '~/select-machine';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Select />
      <SelectMachine />
    </div>
  );
}
