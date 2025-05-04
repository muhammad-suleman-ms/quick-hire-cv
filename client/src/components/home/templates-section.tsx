import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Template } from "@shared/schema";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function TemplatesSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: templates, isLoading } = useQuery<Template[]>({
    queryKey: ["/api/templates"],
    queryFn: async () => {
      const res = await fetch("/api/templates");
      if (!res.ok) throw new Error("Failed to fetch templates");
      return await res.json();
    },
  });

  // Filter templates based on active filter
  const filteredTemplates = templates
    ? templates.filter(template => {
        if (activeFilter === "all") return true;
        if (activeFilter === "free") return !template.isPremium;
        if (activeFilter === "premium") return template.isPremium;
        return template.category.includes(activeFilter.toLowerCase());
      }).slice(0, 3) // Only show first 3 templates on homepage
    : [];

  const filters = [
    { id: "all", name: "All" },
    { id: "free", name: "Free" },
    { id: "premium", name: "Premium" },
    { id: "business", name: "Business" },
    { id: "creative", name: "Creative" },
    { id: "tech", name: "Technical" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Resume Templates</h2>
            <p className="text-neutral-500">Choose from a gallery of professionally designed templates that employers love</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/templates">
              <Button variant="outline" className="w-full sm:w-auto">
                View all templates
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Template Filter */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-2 min-w-full">
            {filters.map(filter => (
              <Button 
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === filter.id 
                    ? "bg-primary text-white" 
                    : "bg-white border border-neutral-200 hover:bg-neutral-100"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Template Grid */}
        {isLoading ? (
          <div className="text-center py-12 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
            <p className="text-neutral-500">Loading templates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredTemplates.map(template => (
              <div key={template.id} className="group relative rounded-lg overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-all duration-300">
                <div className="relative h-40 sm:h-48 bg-neutral-100">
                  <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm">Preview</Button>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`text-white text-xs px-2 py-1 rounded-full ${template.isPremium ? 'bg-blue-600' : 'bg-green-500'}`}>
                      {template.isPremium ? 'Premium' : 'Free'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-neutral-500 mb-2 line-clamp-2">{template.description}</p>
                  <Link href={`/builder?template=${template.id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Use this template
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-8 sm:mt-12">
          <Link href="/templates">
            <Button variant="outline" className="mx-auto">
              Browse all templates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
