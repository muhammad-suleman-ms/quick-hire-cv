import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ResumeContent } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ResumeFormProps {
  resumeId?: number;
  templateId: string;
  initialData?: ResumeContent;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSave: (data: any) => void;
}

interface FormStepProps {
  title: string;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  children: React.ReactNode;
}

function FormStep({ title, step, totalSteps, onNext, onPrev, children }: FormStepProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm text-neutral-500">Step {step} of {totalSteps}</span>
      </div>
      
      <Progress value={(step / totalSteps) * 100} className="h-2 mb-6" />
      
      {children}
      
      <div className="flex justify-between mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrev}
          disabled={step === 1}
        >
          Previous
        </Button>
        <Button 
          type="submit" 
          onClick={onNext}
        >
          {step === totalSteps ? "Complete" : "Next"}
        </Button>
      </div>
    </div>
  );
}

// Personal Info Step
function PersonalInfoStep({ form, onNext, onPrev }: any) {
  return (
    <FormStep title="Personal Information" step={1} totalSteps={5} onNext={onNext} onPrev={onPrev}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="personalInfo.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="personalInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="(123) 456-7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="personalInfo.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="San Francisco" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="personalInfo.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="personalInfo.summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professional Summary</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Dedicated professional with experience in..."
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormStep>
  );
}

// Experience Step
function ExperienceStep({ form, onNext, onPrev }: any) {
  return (
    <FormStep title="Work Experience" step={2} totalSteps={5} onNext={onNext} onPrev={onPrev}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="experience.0.jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Designer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience.0.employer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employer</FormLabel>
              <FormControl>
                <Input placeholder="Airbnb" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="experience.0.location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="San Francisco, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience.0.startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input placeholder="June 2020" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-4">
        <FormField
          control={form.control}
          name="experience.0.isCurrent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I currently work here</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience.0.endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Present" 
                  {...field} 
                  disabled={form.watch('experience.0.isCurrent')}
                  value={form.watch('experience.0.isCurrent') ? 'Present' : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="experience.0.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your position and accomplishments"
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormStep>
  );
}

// Education Step
function EducationStep({ form, onNext, onPrev }: any) {
  return (
    <FormStep title="Education" step={3} totalSteps={5} onNext={onNext} onPrev={onPrev}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="education.0.institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="University of California" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education.0.degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Input placeholder="Bachelor of Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="education.0.field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field of Study</FormLabel>
              <FormControl>
                <Input placeholder="Computer Science" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="education.0.location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Berkeley, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FormField
          control={form.control}
          name="education.0.startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input placeholder="September 2016" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="education.0.endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input 
                  placeholder="June 2020" 
                  {...field} 
                  disabled={form.watch('education.0.isCurrent')}
                  value={form.watch('education.0.isCurrent') ? 'Present' : field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="education.0.isCurrent"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Currently studying here</FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="education.0.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Academic achievements, activities, etc."
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormStep>
  );
}

// Skills Step
function SkillsStep({ form, onNext, onPrev }: any) {
  return (
    <FormStep title="Skills & Expertise" step={4} totalSteps={5} onNext={onNext} onPrev={onPrev}>
      <div className="mb-4">
        <FormField
          control={form.control}
          name="skills.0.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill #1</FormLabel>
              <FormControl>
                <Input placeholder="UI/UX Design" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-4">
        <FormField
          control={form.control}
          name="skills.1.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill #2</FormLabel>
              <FormControl>
                <Input placeholder="Adobe Creative Suite" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-4">
        <FormField
          control={form.control}
          name="skills.2.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill #3</FormLabel>
              <FormControl>
                <Input placeholder="Figma" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-4">
        <FormField
          control={form.control}
          name="skills.3.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill #4</FormLabel>
              <FormControl>
                <Input placeholder="User Research" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="mb-4">
        <FormField
          control={form.control}
          name="skills.4.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill #5</FormLabel>
              <FormControl>
                <Input placeholder="Wireframing" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormStep>
  );
}

// Review Step
function ReviewStep({ form, onNext, onPrev }: any) {
  return (
    <FormStep title="Review & Finalize" step={5} totalSteps={5} onNext={onNext} onPrev={onPrev}>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Personal Information</h4>
          <div className="bg-neutral-50 p-4 rounded-md">
            <p><strong>Name:</strong> {form.watch('personalInfo.fullName') || 'Not provided'}</p>
            <p><strong>Email:</strong> {form.watch('personalInfo.email') || 'Not provided'}</p>
            <p><strong>Phone:</strong> {form.watch('personalInfo.phone') || 'Not provided'}</p>
            <p><strong>Location:</strong> {form.watch('personalInfo.city') && form.watch('personalInfo.state') ? 
              `${form.watch('personalInfo.city')}, ${form.watch('personalInfo.state')}` : 'Not provided'}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Work Experience</h4>
          <div className="bg-neutral-50 p-4 rounded-md">
            <p><strong>Position:</strong> {form.watch('experience.0.jobTitle') || 'Not provided'}</p>
            <p><strong>Employer:</strong> {form.watch('experience.0.employer') || 'Not provided'}</p>
            <p><strong>Duration:</strong> {form.watch('experience.0.startDate')} - {form.watch('experience.0.isCurrent') ? 'Present' : form.watch('experience.0.endDate')}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Education</h4>
          <div className="bg-neutral-50 p-4 rounded-md">
            <p><strong>Institution:</strong> {form.watch('education.0.institution') || 'Not provided'}</p>
            <p><strong>Degree:</strong> {form.watch('education.0.degree')} in {form.watch('education.0.field')}</p>
            <p><strong>Duration:</strong> {form.watch('education.0.startDate')} - {form.watch('education.0.isCurrent') ? 'Present' : form.watch('education.0.endDate')}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Skills</h4>
          <div className="bg-neutral-50 p-4 rounded-md flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map(index => (
              form.watch(`skills.${index}.name`) && (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {form.watch(`skills.${index}.name`)}
                </span>
              )
            ))}
            {![0, 1, 2, 3, 4].some(index => form.watch(`skills.${index}.name`)) && 'No skills provided'}
          </div>
        </div>
      </div>
    </FormStep>
  );
}

export default function ResumeForm({ 
  resumeId, 
  templateId, 
  initialData,
  currentStep,
  onNextStep,
  onPrevStep,
  onSave 
}: ResumeFormProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState("My Resume");

  const defaultValues: ResumeContent = initialData || {
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      linkedin: "",
      website: "",
      summary: "",
    },
    experience: [
      {
        jobTitle: "",
        employer: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      }
    ],
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
      }
    ],
    skills: [
      { name: "", level: 0 },
      { name: "", level: 0 },
      { name: "", level: 0 },
      { name: "", level: 0 },
      { name: "", level: 0 }
    ],
    certifications: [],
    languages: [],
    projects: []
  };

  const form = useForm<ResumeContent>({
    defaultValues,
    resolver: zodResolver(z.custom<ResumeContent>())
  });

  const saveResumeMutation = useMutation({
    mutationFn: async (data: { title: string, templateId: string, content: ResumeContent }) => {
      if (resumeId) {
        const res = await apiRequest("PUT", `/api/resumes/${resumeId}`, data);
        return await res.json();
      } else {
        const res = await apiRequest("POST", "/api/resumes", data);
        return await res.json();
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully.",
      });
      onSave(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (data: ResumeContent) => {
    if (currentStep === 5) {
      saveResumeMutation.mutate({
        title,
        templateId,
        content: data
      });
    } else {
      onNextStep();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep form={form} onNext={onNextStep} onPrev={onPrevStep} />;
      case 2:
        return <ExperienceStep form={form} onNext={onNextStep} onPrev={onPrevStep} />;
      case 3:
        return <EducationStep form={form} onNext={onNextStep} onPrev={onPrevStep} />;
      case 4:
        return <SkillsStep form={form} onNext={onNextStep} onPrev={onPrevStep} />;
      case 5:
        return <ReviewStep form={form} onNext={onNextStep} onPrev={onPrevStep} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {renderStep()}
      </form>
    </Form>
  );
}
