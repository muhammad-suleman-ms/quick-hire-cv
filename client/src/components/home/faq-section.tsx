import { useState } from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, 
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "How does the resume builder work?",
    answer: "Our resume builder guides you through a step-by-step process. Choose a template, fill in your information in each section, and our system formats everything professionally. You can download your completed resume as a PDF that's optimized for applicant tracking systems."
  },
  {
    id: "item-2",
    question: "What makes a resume ATS-friendly?",
    answer: "An ATS-friendly resume uses standard section headings, appropriate keywords from the job description, and a clean format without complex tables or graphics that can confuse applicant tracking systems. Our templates are specifically designed to pass through ATS scanners while still looking professional to human recruiters."
  },
  {
    id: "item-3",
    question: "Can I create multiple versions of my resume?",
    answer: "Yes! With both our free and premium plans, you can create multiple versions of your resume tailored to different job applications. This allows you to emphasize different skills and experiences based on the specific position you're applying for."
  },
  {
    id: "item-4",
    question: "What's the difference between the free and premium plans?",
    answer: "The free plan gives you access to basic templates and PDF downloads. The premium plan includes exclusive templates, multiple download formats (PDF, DOCX), AI-powered content suggestions, a cover letter builder, and advanced ATS optimization features to help your resume stand out even more."
  },
  {
    id: "item-5",
    question: "How do I make my resume stand out?",
    answer: "Focus on quantifiable achievements rather than just listing responsibilities. Use action verbs, tailor your resume to match the job description, and choose a clean, professional template that highlights your strengths. Our premium templates and AI suggestions can help make your resume stand out from the crowd."
  }
];

export default function FaqSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-neutral-500">Find answers to common questions about our resume builder</p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="border border-neutral-200 rounded-lg px-4"
            >
              <AccordionTrigger className="text-left font-medium py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-500 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
