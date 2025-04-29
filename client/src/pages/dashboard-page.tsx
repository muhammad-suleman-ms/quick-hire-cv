import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Resume } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { PlusCircle, FileText } from "lucide-react";
import ResumeCard from "@/components/resume/resume-card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);

  const { data: resumes, isLoading, error } = useQuery<Resume[]>({
    queryKey: ["/api/resumes"],
    queryFn: async () => {
      const res = await fetch("/api/resumes");
      if (!res.ok) throw new Error("Failed to fetch resumes");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Resumes</h1>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <div>
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Resumes</h2>
          <p className="text-red-500">{error.message}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <Link href="/templates">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Resume
          </Button>
        </Link>
      </div>

      {resumes && resumes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-lg">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No resumes yet</h2>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto">
            Create your first resume to get started. Choose from our professional templates and customize it to fit your needs.
          </p>
          <Link href="/templates">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Your First Resume
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
