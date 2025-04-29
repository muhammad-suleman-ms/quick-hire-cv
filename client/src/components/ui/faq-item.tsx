import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
}

export default function FAQItem({ question, answer, isOpen = false }: FAQItemProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const toggleFAQ = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b border-neutral-200 pb-4">
      <button 
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={toggleFAQ}
      >
        <span className="text-lg font-medium text-primary">{question}</span>
        {isExpanded ? (
          <ChevronUp className="text-neutral-500 h-5 w-5" />
        ) : (
          <ChevronDown className="text-neutral-500 h-5 w-5" />
        )}
      </button>
      <div className={`pb-4 ${isExpanded ? 'block' : 'hidden'}`}>
        <p className="text-neutral-600">
          {answer}
        </p>
      </div>
    </div>
  );
}
