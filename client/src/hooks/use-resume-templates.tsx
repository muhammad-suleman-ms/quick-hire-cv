import { useQuery } from "@tanstack/react-query";
import { templates } from "@/lib/resume-templates";

type FilterType = "all" | "free" | "premium" | "resume" | "cv" | string;

export function useResumeTemplates(filter: FilterType = "all", type: "all" | "resume" | "cv" = "all") {
  const { data: subscription } = useQuery<{ isPremium: boolean }>({
    queryKey: ["/api/subscription"],
    staleTime: 60000, // 1 minute
  });

  const { data: freeTemplatesCount } = useQuery<{ count: number, reachedLimit: boolean, isPremium: boolean }>({
    queryKey: ["/api/free-templates-count"],
    staleTime: 60000, // 1 minute
    enabled: !!subscription // Only fetch if we know user is logged in
  });

  const hasPremiumAccess = !!subscription?.isPremium;
  const hasReachedFreeLimit = !!freeTemplatesCount?.reachedLimit;

  // Filter templates based on criteria
  const filteredTemplates = templates.filter(template => {
    // First filter by template type (resume/cv)
    if (type !== "all" && template.type !== type) return false;
    
    // Then filter by other criteria
    if (filter === "all") return true;
    if (filter === "free") return !template.isPremium;
    if (filter === "premium") return template.isPremium;
    return template.category === filter;
  });

  // Get a specific template by ID
  const getTemplateById = (templateId: string) => {
    return templates.find(template => template.id === templateId);
  };

  // Check if a template is premium and if user has access
  const canAccessTemplate = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (!template) return false;
    if (!template.isPremium) return true; // Free template
    return hasPremiumAccess; // Premium template, check subscription
  };

  // Get free templates count
  const getFreeTemplatesCreated = () => {
    return freeTemplatesCount?.count || 0;
  };

  // Calculate remaining free templates
  const getRemainingFreeTemplates = () => {
    const created = getFreeTemplatesCreated();
    return Math.max(0, 3 - created); // Maximum 3 free templates
  };

  return {
    templates: filteredTemplates,
    hasPremiumAccess,
    hasReachedFreeLimit,
    getTemplateById,
    canAccessTemplate,
    getFreeTemplatesCreated,
    getRemainingFreeTemplates
  };
}
