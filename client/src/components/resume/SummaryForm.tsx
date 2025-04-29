import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const summaryFormSchema = z.object({
  summary: z.string().min(10, "Professional summary should be at least 10 characters"),
});

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

export function SummaryForm({ data, onUpdate }: SummaryFormProps) {
  const form = useForm<z.infer<typeof summaryFormSchema>>({
    resolver: zodResolver(summaryFormSchema),
    defaultValues: {
      summary: data || "",
    },
  });

  // Form values are updated on change to enable "next" button to work
  form.watch((value) => {
    const isValid = form.formState.isValid;
    if (isValid && value.summary) {
      onUpdate(value.summary);
    }
  });

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("summary", suggestion);
    onUpdate(suggestion);
  };

  const exampleSummaries = [
    "Results-driven software engineer with 5+ years of experience in developing scalable applications. Proficient in JavaScript, React, and Node.js with a strong focus on creating elegant solutions to complex problems.",
    "Detail-oriented marketing professional with a track record of developing successful campaigns that increase brand awareness and drive customer acquisition. Skilled in digital marketing, content strategy, and analytics.",
    "Creative UX/UI designer passionate about crafting intuitive user experiences. Combines user-centered design principles with strong technical skills to build engaging digital products that meet business goals.",
    "Experienced project manager with expertise in leading cross-functional teams to deliver projects on time and within budget. Strong communicator with excellent problem-solving abilities and a focus on continuous improvement."
  ];

  return (
    <div>
      <h3 className="text-xl font-medium text-primary">Professional Summary</h3>
      <p className="text-neutral-500 mt-1">Add a professional summary to highlight your expertise and career goals</p>
      
      <Form {...form}>
        <form className="mt-6 space-y-6">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write a brief summary of your skills, experience, and career goals..."
                    className="min-h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your summary should be 2-4 sentences that highlight your most relevant qualifications and career goals.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      
      <div className="mt-8">
        <h4 className="font-medium text-neutral-700 flex items-center">
          <Lightbulb className="h-4 w-4 mr-2 text-secondary" /> 
          Not sure what to write? Here are some examples:
        </h4>
        
        <div className="mt-4 space-y-3">
          {exampleSummaries.map((example, index) => (
            <Card key={index} className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSuggestionClick(example)}>
              <p className="text-sm">{example}</p>
              <Button variant="ghost" size="sm" className="mt-2 text-secondary">
                Use this example
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
