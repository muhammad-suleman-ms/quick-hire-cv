import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import ResumeTemplateCard from "@/components/ui/resume-template-card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { templates } from "@/lib/resume-templates";
import { Link } from "wouter";

export default function Templates() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  
  const { data: subscription } = useQuery<{ isPremium: boolean }>({
    queryKey: ["/api/subscription"],
  });
  
  const hasPremiumAccess = !!subscription?.isPremium;
  
  const filteredTemplates = templates.filter(template => {
    if (activeFilter === "all") return true;
    if (activeFilter === "free") return !template.isPremium;
    if (activeFilter === "premium") return template.isPremium;
    return template.category === activeFilter;
  });
  
  const handlePreview = (templateId: string) => {
    setPreviewTemplate(templateId);
  };
  
  const templateToPreview = templates.find(t => t.id === previewTemplate);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Resume Templates</h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
            Choose from a gallery of beautifully designed resume templates to showcase your career journey
          </p>
        </div>

        <div className="mt-8">
          <div className="flex overflow-x-auto pb-2 space-x-2 justify-center flex-wrap">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-secondary text-white" : ""}
            >
              All Templates
            </Button>
            <Button
              variant={activeFilter === "free" ? "default" : "outline"}
              onClick={() => setActiveFilter("free")}
              className={activeFilter === "free" ? "bg-secondary text-white" : ""}
            >
              Free
            </Button>
            <Button
              variant={activeFilter === "premium" ? "default" : "outline"}
              onClick={() => setActiveFilter("premium")}
              className={activeFilter === "premium" ? "bg-secondary text-white" : ""}
            >
              Premium
            </Button>
            <Button
              variant={activeFilter === "design" ? "default" : "outline"}
              onClick={() => setActiveFilter("design")}
              className={activeFilter === "design" ? "bg-secondary text-white" : ""}
            >
              Design
            </Button>
            <Button
              variant={activeFilter === "tech" ? "default" : "outline"}
              onClick={() => setActiveFilter("tech")}
              className={activeFilter === "tech" ? "bg-secondary text-white" : ""}
            >
              Tech
            </Button>
            <Button
              variant={activeFilter === "finance" ? "default" : "outline"}
              onClick={() => setActiveFilter("finance")}
              className={activeFilter === "finance" ? "bg-secondary text-white" : ""}
            >
              Finance
            </Button>
            <Button
              variant={activeFilter === "healthcare" ? "default" : "outline"}
              onClick={() => setActiveFilter("healthcare")}
              className={activeFilter === "healthcare" ? "bg-secondary text-white" : ""}
            >
              Healthcare
            </Button>
          </div>
        </div>
        
        {!hasPremiumAccess && activeFilter !== "free" && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-800 flex items-center">
              <span className="mr-2">⚠️</span>
              Premium templates require a subscription.
              <Link to="/subscription" className="ml-2 text-secondary font-medium">
                Upgrade now
              </Link>
            </p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6">
          {filteredTemplates.map((template) => (
            <ResumeTemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              description={template.description}
              image={template.image}
              isPremium={template.isPremium}
              hasPremiumAccess={hasPremiumAccess}
              onClick={() => handlePreview(template.id)}
            />
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No templates found matching your filter criteria.</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/create-resume">
            <Button className="bg-secondary hover:bg-secondary/90 text-white">
              Create Your Resume
            </Button>
          </Link>
        </div>
      </div>
      
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {templateToPreview?.name || "Template Preview"}
            </DialogTitle>
            <DialogDescription>
              {templateToPreview?.description}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[550px] mt-4">
            <div className="p-4 flex justify-center">
              <img 
                src={templateToPreview?.image} 
                alt="Template preview" 
                className="max-w-full h-auto rounded shadow-md"
              />
            </div>
          </ScrollArea>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              Close
            </Button>
            <Link to={`/create-resume?template=${previewTemplate}`}>
              <Button>Use this template</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
