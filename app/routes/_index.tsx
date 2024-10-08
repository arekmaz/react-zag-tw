import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { components } from './docs.$componentId.tsx';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center flex-col py-10 gap-10">
      <h1>React + ZagJs + Tailwind</h1>
      <main className="flex flex-col gap-1 py-5 px-3">
        <p className="font-semibold">Components</p>

        {Object.entries(components).map(([id, comp]) => (
          <Link key={id} to={`/docs/${id}`}>
            {comp.name || id}
          </Link>
        ))}
      </main>
    </div>
  );
}
