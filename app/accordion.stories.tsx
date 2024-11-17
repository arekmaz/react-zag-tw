import { ChevronDown } from 'lucide-react';
import {
  AccordionRoot,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
  AccordionProvider,
} from './accordion.tsx';

export function Accordion() {
  const data = [
    { title: 'Watercraft', content: 'Sample accordion content' },
    { title: 'Automobiles', content: 'Sample accordion content' },
    { title: 'Aircrafts', content: 'Sample accordion content' },
  ];
  return (
    <AccordionProvider id="1">
      <AccordionRoot>
        {data.map((item) => (
          <AccordionItem key={item.title} value={item.title}>
            <h3>
              <AccordionTrigger value={item.title}>
                {item.title}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
            </h3>
            <AccordionContent value={item.title}>
              <div className="overflow-hidden">{item.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </AccordionProvider>
  );
}
