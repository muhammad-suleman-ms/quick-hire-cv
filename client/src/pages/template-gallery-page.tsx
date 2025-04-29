import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import TemplateGallery from "@/components/resume/template-gallery";

export default function TemplateGalleryPage() {
  const { user } = useAuth();
  
  // Track page view
  useEffect(() => {
    document.title = "Resume Templates - ResumeBuilder";
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <TemplateGallery />
    </div>
  );
}
