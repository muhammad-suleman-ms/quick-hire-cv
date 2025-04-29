import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { TemplateSelector } from "./TemplateSelector";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { SummaryForm } from "./SummaryForm";
import { ResumePreview } from "./ResumePreview";
import { StepProgressBar } from "./StepProgressBar";

export type FormStep = 
  | "template" 
  | "personal" 
  | "experience" 
  | "education" 
  | "skills" 
  | "summary" 
  | "preview";

const steps: FormStep[] = [
  "template",
  "personal",
  "experience",
  "education",
  "skills",
  "summary",
  "preview",
];

interface ResumeFormProps {
  resumeId?: string;
  initialData?: any;
}

export default function ResumeForm({ resumeId, initialData }: ResumeFormProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<FormStep>("template");
  const [formData, setFormData] = useState(initialData || {
    templateId: "",
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      linkedIn: "",
      website: "",
    },
    experience: [],
    education: [],
    skills: [],
    summary: "",
  });

  const updateFormData = (section: string, data: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [section]: data,
    }));
  };

  const goToNextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSaveResume = async () => {
    try {
      let response;
      
      if (resumeId) {
        response = await apiRequest("PUT", `/api/resumes/${resumeId}`, formData);
      } else {
        response = await apiRequest("POST", "/api/resumes", formData);
      }
      
      const result = await response.json();
      
      toast({
        title: "Success!",
        description: resumeId 
          ? "Your resume has been updated successfully." 
          : "Your resume has been created successfully.",
      });
      
      navigate(`/view-resume/${result.id}`);
    } catch (error) {
      console.error("Error saving resume:", error);
      toast({
        title: "Something went wrong",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "template":
        return (
          <TemplateSelector 
            selectedTemplate={formData.templateId}
            onSelectTemplate={(templateId) => updateFormData("templateId", templateId)}
          />
        );
      case "personal":
        return (
          <PersonalInfoForm 
            data={formData.personalInfo}
            onUpdate={(data) => updateFormData("personalInfo", data)}
          />
        );
      case "experience":
        return (
          <ExperienceForm 
            data={formData.experience}
            onUpdate={(data) => updateFormData("experience", data)}
          />
        );
      case "education":
        return (
          <EducationForm 
            data={formData.education}
            onUpdate={(data) => updateFormData("education", data)}
          />
        );
      case "skills":
        return (
          <SkillsForm 
            data={formData.skills}
            onUpdate={(data) => updateFormData("skills", data)}
          />
        );
      case "summary":
        return (
          <SummaryForm 
            data={formData.summary}
            onUpdate={(data) => updateFormData("summary", data)}
          />
        );
      case "preview":
        return (
          <ResumePreview 
            data={formData}
            onSave={handleSaveResume}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-12 rounded-lg bg-white shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="p-6 bg-primary text-white lg:col-span-1">
          <h3 className="text-xl font-medium">Resume Builder</h3>
          <div className="mt-6">
            {steps.map((step, index) => (
              <div 
                key={step}
                className={`flex items-center py-3 ${index < steps.length - 1 ? 'border-b border-white/20' : ''}`}
              >
                <div className={`flex items-center justify-center h-8 w-8 rounded-full font-medium ${
                  currentStep === step 
                    ? 'bg-white text-primary' 
                    : steps.indexOf(step) < steps.indexOf(currentStep)
                      ? 'bg-secondary text-white'
                      : 'bg-neutral-600 text-white'
                }`}>
                  {index + 1}
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep === step || steps.indexOf(step) < steps.indexOf(currentStep)
                    ? 'text-white' 
                    : 'text-neutral-400'
                }`}>
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="step-progress">
              <div 
                className="step-progress-bar" 
                style={{ width: `${(steps.indexOf(currentStep) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-neutral-300">
              {steps.indexOf(currentStep) + 1} of {steps.length} steps completed
            </div>
          </div>
        </div>
        <div className="p-6 lg:p-8 lg:col-span-4">
          <Card className="border-0 shadow-none">
            {renderStepContent()}
          </Card>

          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === steps[0]}
              className="inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
            >
              Previous
            </Button>
            {currentStep !== "preview" ? (
              <Button
                type="button"
                onClick={goToNextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary/90"
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSaveResume}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary/90"
              >
                Save Resume
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
