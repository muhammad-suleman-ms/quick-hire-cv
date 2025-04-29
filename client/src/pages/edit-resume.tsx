import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import ResumeForm from "@/components/resume/ResumeForm";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function EditResume() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  const { data: user, isLoading: userLoading, error: userError } = useQuery<{ username: string } | null>({
    queryKey: ["/api/me"],
  });
  
  const { data: resume, isLoading: resumeLoading, error: resumeError } = useQuery({
    queryKey: [`/api/resumes/${id}`],
    enabled: !!user && !!id,
  });
  
  if (userLoading || resumeLoading) {
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
            You need to be signed in to edit a resume.
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
  
  if (resumeError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Resume</AlertTitle>
          <AlertDescription>
            There was an error loading the resume. It may not exist or you might not have access to it.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4 justify-center">
          <Link to="/dashboard">
            <Button variant="default">Back to Dashboard</Button>
          </Link>
          <Link to="/create-resume">
            <Button variant="outline">Create New Resume</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Your Resume</h1>
        <p className="text-neutral-500 mt-1">
          Make changes to your resume and save when you're done
        </p>
      </div>
      
      {resume ? (
        <ResumeForm resumeId={id} initialData={resume} />
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-500">No resume data found.</p>
          <Link to="/dashboard">
            <Button variant="outline" className="mt-4">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
