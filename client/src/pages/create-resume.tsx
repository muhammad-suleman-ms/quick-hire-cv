import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import ResumeForm from "@/components/resume/ResumeForm";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CreateResume() {
  const { toast } = useToast();
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const templateId = params.get('template');
  
  const { data: user, isLoading: userLoading, error: userError } = useQuery<{ username: string } | null>({
    queryKey: ["/api/me"],
  });
  
  const initialData = templateId ? {
    templateId,
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
  } : undefined;
  
  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (userError || !user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be signed in to create a resume.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4 justify-center">
          <Link to="/signin">
            <Button variant="default">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Create Account</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Your Resume</h1>
        <p className="text-neutral-500 mt-1">
          Follow the steps below to create a professional, ATS-friendly resume
        </p>
      </div>
      
      <ResumeForm initialData={initialData} />
    </div>
  );
}
