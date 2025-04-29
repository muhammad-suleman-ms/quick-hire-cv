import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TemplateCard from "./template-card";
import { Button } from "@/components/ui/button";
import { Template } from "@shared/schema";

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const { data: templates, isLoading, error } = useQuery<Template[]>({
    queryKey: ["/api/templates", activeCategory, activeFilter],
    queryFn: async () => {
      const url = new URL("/api/templates", window.location.origin);
      
      if (activeCategory !== "all") {
        url.searchParams.append("category", activeCategory);
      }
      
      if (activeFilter === "free" || activeFilter === "premium") {
        url.searchParams.append("premium", activeFilter === "premium" ? "true" : "false");
      }
      
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch templates");
      return res.json();
    },
  });

  const categories = [
    { id: "all", name: "All" },
    { id: "free", name: "Free" },
    { id: "premium", name: "Premium" },
    { id: "business", name: "Business" },
    { id: "creative", name: "Creative" },
    { id: "tech", name: "Tech" },
    { id: "finance", name: "Finance" }
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Resume Templates</h2>
          <p className="text-neutral-500">Choose from a gallery of professionally designed templates that employers love</p>
        </div>
      </div>
      
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              activeCategory === category.id 
                ? "bg-primary text-white" 
                : "bg-white border border-neutral-200 hover:bg-neutral-100"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {/* Template Grid */}
      {isLoading ? (
        <div className="text-center py-12">Loading templates...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">Error loading templates</div>
      ) : templates && templates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">No templates found for the selected category</div>
      )}
    </div>
  );
}
