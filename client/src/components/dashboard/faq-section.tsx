import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// FAQ items
const faqItems = [
  {
    question: "How many resumes can I create with a free account?",
    answer: "With a free account, you can create up to 3 resumes using our free templates. To create more resumes or use premium templates, upgrade to a premium subscription."
  },
  {
    question: "What's the difference between a resume and a CV?",
    answer: "A resume is typically 1-2 pages and summarizes your most relevant experiences for a specific job application. A CV (Curriculum Vitae) is more comprehensive, listing all your academic and professional achievements, publications, and more, often used for academic, research, or international positions."
  },
  {
    question: "How do I download my resume as a PDF?",
    answer: "Once you've completed your resume, go to the preview page and click the 'Download PDF' button. With a free account, downloads include a watermark. Premium subscribers can download without watermarks."
  },
  {
    question: "Can I edit my resume after I've created it?",
    answer: "Yes! You can edit your resumes at any time. From the dashboard, click on the resume you wish to edit, make your changes, and save them."
  },
  {
    question: "Are the templates ATS-friendly?",
    answer: "Yes, all our templates are designed to be ATS (Applicant Tracking System) friendly, ensuring your resume gets past automated screening systems used by many employers."
  },
  {
    question: "How do I upgrade to a premium subscription?",
    answer: "Go to the Subscription page from the navigation menu or dashboard and select a subscription plan. You'll be guided through the payment process to upgrade your account."
  },
  {
    question: "Can I cancel my premium subscription?",
    answer: "Yes, you can cancel your subscription at any time. After cancellation, you'll maintain premium access until the end of your current billing period."
  },
  {
    question: "How do I add a profile photo to my resume?",
    answer: "In the Personal Information section when creating or editing your resume, you'll find an option to upload a profile photo. Note that including photos on resumes is optional and conventions vary by country and industry."
  }
];

export function FAQSection() {
  const [defaultOpen, setDefaultOpen] = useState<string>("item-0");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue={defaultOpen}>
          {faqItems.map((item, index) => (
            <AccordionItem key={`item-${index}`} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default FAQSection;