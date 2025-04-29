import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResumeTemplateCard from "@/components/ui/resume-template-card";
import { templates } from "@/lib/resume-templates";
import { Link } from "wouter";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
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
  
  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (template?.isPremium && !hasPremiumAccess) {
      // Redirect to subscription page if trying to select a premium template without access
      return;
    }
    
    onSelectTemplate(templateId);
    setPreviewTemplate(null);
  };
  
  const selectedTemplateName = templates.find(t => t.id === selectedTemplate)?.name || "Choose a template";
  
  return (
    <div>
      <h3 className="text-xl font-medium text-primary">Choose a Template</h3>
      <p className="text-neutral-500 mt-1">Select a template to start building your resume</p>
      
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
            variant={activeFilter === "creative" ? "default" : "outline"}
            onClick={() => setActiveFilter("creative")}
            className={activeFilter === "creative" ? "bg-secondary text-white" : ""}
          >
            Creative
          </Button>
          <Button
            variant={activeFilter === "professional" ? "default" : "outline"}
            onClick={() => setActiveFilter("professional")}
            className={activeFilter === "professional" ? "bg-secondary text-white" : ""}
          >
            Professional
          </Button>
          <Button
            variant={activeFilter === "simple" ? "default" : "outline"}
            onClick={() => setActiveFilter("simple")}
            className={activeFilter === "simple" ? "bg-secondary text-white" : ""}
          >
            Simple
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
      
      {selectedTemplate && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">
            Selected template: <strong>{selectedTemplateName}</strong>
          </p>
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
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
      
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {templates.find(t => t.id === previewTemplate)?.name || "Template Preview"}
            </DialogTitle>
            <DialogDescription>
              {templates.find(t => t.id === previewTemplate)?.description}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[550px] mt-4">
            <div className="p-4 flex justify-center">
              <img 
                src={templates.find(t => t.id === previewTemplate)?.image} 
                alt="Template preview" 
                className="max-w-full h-auto rounded shadow-md"
              />
            </div>
          </ScrollArea>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
              Cancel
            </Button>
            <Button onClick={() => handleSelectTemplate(previewTemplate as string)}>
              Use this template
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
