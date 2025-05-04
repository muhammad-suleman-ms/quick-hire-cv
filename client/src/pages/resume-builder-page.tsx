import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation, useRoute } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Resume, ResumeContent, Template, SubscriptionStatus } from "@shared/schema";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, FileDown, ArrowLeft, Eye, LockIcon, CrownIcon, AlertTriangleIcon, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter, CardDescription, CardTitle } from "@/components/ui/card";
import ResumeForm from "@/components/resume/resume-form";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Link } from "wouter";

// Maximum number of resumes for free users
const FREE_USER_RESUME_LIMIT = 3;

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

  // Fetch user's resumes to check against limit
  const {
    data: userResumes,
    isLoading: isLoadingUserResumes,
  } = useQuery<Resume[]>({
    queryKey: ["/api/resumes"],
    queryFn: async () => {
      const res = await fetch("/api/resumes");
      if (!res.ok) throw new Error("Failed to fetch user resumes");
      return res.json();
    },
    enabled: !!user && !id, // Only fetch when creating new resume
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

  // Check if user has premium access to the template
  const isPremiumTemplate = selectedTemplateObject?.isPremium || false;
  const hasPremiumAccess = user?.subscriptionStatus === SubscriptionStatus.PREMIUM;
  const canAccessTemplate = !isPremiumTemplate || (isPremiumTemplate && hasPremiumAccess);
  
  // Check if user has reached free limit
  const hasReachedFreeLimit = userResumes && 
    user?.subscriptionStatus !== SubscriptionStatus.PREMIUM && 
    !id && // Only check when creating new resume
    userResumes.length >= FREE_USER_RESUME_LIMIT;

  // Loader state
  if (isLoadingResume || isLoadingTemplates || isLoadingUserResumes) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-neutral-500">Loading resume builder...</p>
      </div>
    );
  }

  // Error states
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

  // Check template access restrictions
  if (!canAccessTemplate && !id) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-amber-600 flex items-center justify-center gap-2">
              <LockIcon className="h-6 w-6" />
              Premium Template
            </CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              This is a premium template that requires a subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <p className="text-amber-800">
                Upgrade to Premium to access all premium templates and create unlimited resumes!
              </p>
            </div>
            
            {selectedTemplateObject && (
              <div className="text-center">
                <h3 className="font-semibold text-lg">{selectedTemplateObject.name}</h3>
                <p className="text-muted-foreground">{selectedTemplateObject.description}</p>
                <div className="my-4">
                  <img 
                    src={selectedTemplateObject.thumbnail} 
                    alt={selectedTemplateObject.name}
                    className="rounded-md mx-auto max-h-64 object-cover shadow-md"
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/templates")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Select Free Template
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <CrownIcon className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Check free user resume limit
  if (hasReachedFreeLimit) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-amber-600 flex items-center justify-center gap-2">
              <AlertTriangleIcon className="h-6 w-6" />
              Resume Limit Reached
            </CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              You've reached the maximum of {FREE_USER_RESUME_LIMIT} resumes for free users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-amber-800 text-center">
                Free users can create up to {FREE_USER_RESUME_LIMIT} resumes. Upgrade to Premium for unlimited resumes and access to all premium templates!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="border rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-2">Free</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Create up to {FREE_USER_RESUME_LIMIT} resumes</li>
                  <li>• Access to free templates only</li>
                  <li>• Basic download options</li>
                </ul>
              </div>
              <div className="border border-amber-300 rounded-lg p-4 text-center bg-amber-50">
                <h3 className="font-semibold mb-2 text-amber-800">Premium</h3>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• Create unlimited resumes</li>
                  <li>• Access to all premium templates</li>
                  <li>• Advanced formatting options</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <CrownIcon className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-6 mb-6 md:mb-8">
        <div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(id ? "/dashboard" : "/templates")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {id ? "Back to Dashboard" : "Back to Templates"}
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">Build your resume step-by-step</h1>
          <p className="text-neutral-500 mt-1 text-sm max-w-xl">
            Our intuitive resume builder guides you through each section, making it easy to create a professional and ATS-friendly resume.
          </p>
          {selectedTemplateObject && (
            <p className="text-neutral-500 mt-1 text-sm">
              Template: {selectedTemplateObject.name} 
              {isPremiumTemplate && (
                <span className="ml-2 inline-flex items-center text-amber-600 text-xs">
                  <CrownIcon className="h-3 w-3 mr-1" /> Premium
                </span>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Button variant="outline" size="sm" onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? (
              <>Edit Resume</>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </>
            )}
          </Button>
          <Button size="sm">
            <FileDown className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Left sidebar with steps */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4 border">
            <div className="space-y-6">
              <div className={`flex items-start gap-3 ${currentStep === 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5 
                  ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>1</div>
                <div>
                  <h3 className="font-medium">Personal Information</h3>
                  <p className="text-xs text-muted-foreground">Start with your contact details and professional summary</p>
                </div>
              </div>
              
              <div className={`flex items-start gap-3 ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5
                  ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>2</div>
                <div>
                  <h3 className="font-medium">Work Experience</h3>
                  <p className="text-xs text-muted-foreground">Add your work history with achievements and responsibilities</p>
                </div>
              </div>
              
              <div className={`flex items-start gap-3 ${currentStep === 3 ? 'text-blue-600' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5
                  ${currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>3</div>
                <div>
                  <h3 className="font-medium">Education</h3>
                  <p className="text-xs text-muted-foreground">Include your academic background and certifications</p>
                </div>
              </div>
              
              <div className={`flex items-start gap-3 ${currentStep === 4 ? 'text-blue-600' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5
                  ${currentStep === 4 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>4</div>
                <div>
                  <h3 className="font-medium">Skills & Expertise</h3>
                  <p className="text-xs text-muted-foreground">Highlight your technical and soft skills relevant to the job</p>
                </div>
              </div>
              
              <div className={`flex items-start gap-3 ${currentStep === 5 ? 'text-blue-600' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm mt-0.5
                  ${currentStep === 5 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>5</div>
                <div>
                  <h3 className="font-medium">Review & Download</h3>
                  <p className="text-xs text-muted-foreground">Preview your finished resume and download in your preferred format</p>
                </div>
              </div>
            </div>
            
            {!id && currentStep === 1 && (
              <Button className="w-full mt-6" onClick={() => setCurrentStep(2)}>
                Start Building Your Resume
              </Button>
            )}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="md:col-span-9">
          {previewMode ? (
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
              <div className="text-center mb-6">
                <p className="bg-blue-100 text-blue-800 inline-block px-3 py-1 rounded text-sm">
                  Preview Mode
                </p>
              </div>
              <div className="h-[500px] sm:h-[842px] w-full bg-white border relative">
                {/* This would be the resume preview with actual rendered PDF */}
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400 p-4 text-center">
                  <p>Resume Preview (PDF rendering would be implemented here)</p>
                </div>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl flex items-center">
                  <div className="mr-2 text-blue-600">Step {currentStep} of 5:</div>
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Work Experience"}
                  {currentStep === 3 && "Education"}
                  {currentStep === 4 && "Skills & Expertise"}
                  {currentStep === 5 && "Review & Download"}
                </CardTitle>
              </CardHeader>
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
      </div>
      
      {/* Video Marketing Section */}
      <div className="mt-16 bg-slate-50 rounded-xl p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">How to Create an ATS-Optimized Resume</h2>
            <p className="text-muted-foreground mb-6">
              Learn how to create a resume that will get past Applicant Tracking Systems and impress recruiters. 
              Our step-by-step guide will show you exactly what to include and what to avoid.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 p-1 rounded text-blue-600 mt-0.5">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <p className="text-sm">Discover the exact keywords recruiters are looking for</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 p-1 rounded text-blue-600 mt-0.5">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <p className="text-sm">Learn the optimal resume format for your industry</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 p-1 rounded text-blue-600 mt-0.5">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <p className="text-sm">See real examples of successful resumes in action</p>
              </div>
            </div>
            
            <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
              Get More Resume Tips
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-video relative bg-slate-900">
              <iframe 
                className="absolute w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Resume Building Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">Resume Building Masterclass</h3>
              <p className="text-sm text-muted-foreground">A complete guide to creating professional resumes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
