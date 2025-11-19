import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { questions } from "../services/AccordionFAQs";

function AccordionFAQs() {
  const faqs = questions;
  return (
    <div className="flex justify-center items-center w-full">
      <Accordion.Root
        type="single"
        collapsible
        className="w-full max-w-3xl px-4 space-y-3"
      >
        {faqs.map((val, ind) => (
          <Accordion.Item
            key={ind}
            value={`item-${ind}`}
            className="border border-gray-300 rounded-xl bg-slate-100 shadow-sm overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger className="w-full flex justify-between items-center py-3 px-4 text-gray-800 font-semibold text-left hover:bg-slate-200 transition-colors">
                {val.ques}
                <ChevronDown
                  className="h-5 w-5 text-gray-600 transition-transform duration-300 accordion-chevron"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-4 pb-3 text-gray-600">
              {val.ans}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}

export default AccordionFAQs;
