import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { faqs } from "@/Constants/data";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number | null) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <>
      <section className="py-10">
        <div className="max-w-4xl mx-auto py-8 px-4 text-main">
          <h2 className="text-2xl font-bold font-sora text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div data-aos="fade-right" key={index} className="border border-line rounded-lg">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-medium text-main hover:text-primary focus:outline-none"
                >
                  <span className="text-main text-base font-medium">{faq.question}</span>
                  <span className="transform transition-transform duration-300">
                    {activeIndex === index ? <ChevronDown /> : <ChevronUp />}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="px-4 py-2 text-sub font-dm bg-background text-sm rounded-b-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
