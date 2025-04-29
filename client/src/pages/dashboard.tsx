import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, FilePlus, MoreHorizontal, Trash, Edit, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Resume {
  id: string;
  name: string;
  updatedAt: string;
  templateId: string;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);

  const { data: resumes, isLoading, error } = useQuery<Resume[]>({
    queryKey: ["/api/resumes"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/resumes/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume deleted",
        description: "Your resume has been permanently deleted.",
      });
    },
    onError: (error) => {
      console.error("Error deleting resume:", error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting your resume.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    setResumeToDelete(id);
  };

  const confirmDelete = () => {
    if (resumeToDelete) {
      deleteMutation.mutate(resumeToDelete);
      setResumeToDelete(null);
    }
  };

  const cancelDelete = () => {
    setResumeToDelete(null);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  const getUpdatedDaysAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)]">
        <p className="text-red-500 mb-4">Error loading your resumes</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/resumes"] })}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <Link to="/create-resume">
          <Button className="bg-secondary hover:bg-secondary/90">
            <FilePlus className="mr-2 h-4 w-4" /> Create New Resume
          </Button>
        </Link>
      </div>

      {resumes && resumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <Briefcase className="h-10 w-10 text-secondary/80 mr-3" />
                      <div>
                        <h3 className="font-medium text-lg">{resume.name}</h3>
                        <p className="text-sm text-neutral-500">
                          Last updated {getUpdatedDaysAgo(resume.updatedAt)} days ago
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/view-resume/${resume.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/edit-resume/${resume.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500" 
                          onClick={() => handleDelete(resume.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="border-t border-neutral-200 px-6 py-4 bg-neutral-50 flex justify-end">
                  <Link to={`/edit-resume/${resume.id}`}>
                    <Button variant="outline" size="sm" className="mr-2">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Link to={`/view-resume/${resume.id}`}>
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                      <Eye className="mr-2 h-4 w-4" /> View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Briefcase className="h-16 w-16 mx-auto mb-4 text-neutral-300" />
          <h2 className="text-xl font-medium mb-2">No resumes yet</h2>
          <p className="text-neutral-500 mb-6">Create your first resume to get started</p>
          <Link to="/create-resume">
            <Button className="bg-secondary hover:bg-secondary/90">
              <FilePlus className="mr-2 h-4 w-4" /> Create Resume
            </Button>
          </Link>
        </div>
      )}

      <AlertDialog open={!!resumeToDelete} onOpenChange={cancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
