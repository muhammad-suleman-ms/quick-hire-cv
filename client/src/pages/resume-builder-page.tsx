import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation, useRoute } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Resume, ResumeContent, Template } from "@shared/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, FileDown, ArrowLeft, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ResumeForm from "@/components/resume/resume-form";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ResumeBuilderPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/builder/:id");
  const { id } = params || {};
  
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeTitle, setResumeTitle] = useState("My Resume");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Get template ID from URL if provided
  useEffect(() => {
    const url = new URL(window.location.href);
    const templateId = url.searchParams.get("template");
    if (templateId) {
      setSelectedTemplate(templateId);
    }
  }, []);

  // Fetch resume if editing existing one
  const {
    data: resume,
    isLoading: isLoadingResume,
    error: resumeError,
  } = useQuery<Resume>({
    queryKey: [`/api/resumes/${id}`],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/resumes/${id}`);
      if (!res.ok) throw new Error("Failed to fetch resume");
      return res.json();
    },
    enabled: !!id,
  });

  // Fetch templates
  const {
    data: templates,
    isLoading: isLoadingTemplates,
  } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
    queryFn: async () => {
      const res = await fetch("/api/templates");
      if (!res.ok) throw new Error("Failed to fetch templates");
      return res.json();
    },
  });

  useEffect(() => {
    if (resume) {
      setResumeTitle(resume.title);
      setSelectedTemplate(resume.templateId);
    }
  }, [resume]);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = (savedResume: Resume) => {
    toast({
      title: id ? "Resume updated" : "Resume created",
      description: id ? "Your resume has been updated successfully" : "Your resume has been created successfully",
    });
    
    // Navigate to the dashboard
    if (!id) {
      navigate(`/builder/${savedResume.id}`);
    }
  };

  // Find the selected template object
  const selectedTemplateObject = templates?.find(t => t.id === selectedTemplate);

  if (isLoadingResume || isLoadingTemplates) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-neutral-500">Loading resume builder...</p>
      </div>
    );
  }

  if ((id && resumeError) || (!selectedTemplate && !id)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center bg-red-50 rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {id && resumeError
              ? "Error loading resume"
              : "No template selected"}
          </h2>
          <p className="text-neutral-600 mb-6">
            {id && resumeError
              ? "We couldn't load the resume you requested. It may have been deleted or you don't have permission to view it."
              : "Please select a template from the template gallery to get started."}
          </p>
          <Button onClick={() => navigate("/templates")}>
            {id && resumeError ? "Go back to dashboard" : "Select a template"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate(id ? "/dashboard" : "/templates")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {id ? "Back to Dashboard" : "Back to Templates"}
          </Button>
          <h1 className="text-3xl font-bold">{id ? `Editing: ${resumeTitle}` : "Create New Resume"}</h1>
          {selectedTemplateObject && (
            <p className="text-neutral-500 mt-1">
              Template: {selectedTemplateObject.name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? (
              <>Edit Resume</>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </>
            )}
          </Button>
          <Button>
            <FileDown className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {previewMode ? (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded text-sm">
              Preview Mode
            </p>
          </div>
          <div className="h-[842px] w-full bg-white border relative">
            {/* This would be the resume preview with actual rendered PDF */}
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <p>Resume Preview (PDF rendering would be implemented here)</p>
            </div>
          </div>
        </div>
      ) : (
        <Card className="mb-8">
          <CardContent className="p-6">
            {selectedTemplate && (
              <ResumeForm
                resumeId={id ? parseInt(id) : undefined}
                templateId={selectedTemplate}
                initialData={resume?.content as ResumeContent}
                currentStep={currentStep}
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
                onSave={handleSave}
              />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
