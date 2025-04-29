import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResumeTemplateCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  isPremium: boolean;
  hasPremiumAccess: boolean;
  onClick?: () => void;
}

export default function ResumeTemplateCard({
  id,
  name,
  description,
  image,
  isPremium,
  hasPremiumAccess,
  onClick,
}: ResumeTemplateCardProps) {
  return (
    <div className="template-card group">
      <div 
        className={cn(
          "relative aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden",
          isPremium && !hasPremiumAccess && "watermark"
        )}
      >
        <img 
          src={image} 
          alt={`${name} template preview`} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-300">
            <Button 
              variant="secondary" 
              className="bg-white text-primary hover:bg-neutral-100"
              onClick={onClick}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <Badge className={isPremium ? "bg-accent text-white" : "bg-green-600 text-white"}>
            {isPremium ? "Premium" : "Free"}
          </Badge>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-base font-medium text-primary">{name}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
}
