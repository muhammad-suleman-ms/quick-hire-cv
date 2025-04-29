import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  isPrimary?: boolean;
  popularBadge?: boolean;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  isPrimary = false,
  popularBadge = false,
}: PricingCardProps) {
  return (
    <div className={cn(
      "rounded-lg shadow-lg overflow-hidden transition-all",
      isPrimary ? "border-2 border-secondary relative hover:shadow-xl" : "hover:shadow-lg"
    )}>
      {popularBadge && (
        <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
          <div className="flex justify-center">
            <span className="inline-flex rounded-full bg-gradient-premium px-6 py-1.5 text-sm font-bold tracking-wider uppercase text-white shadow-md">
              Most Popular
            </span>
          </div>
        </div>
      )}
      <div className={cn(
        "px-6 bg-white sm:px-10",
        popularBadge ? "pt-10 pb-8 sm:pt-12" : "py-8"
      )}>
        <div>
          <h3 className="text-lg font-medium text-primary">{title}</h3>
          <div className="mt-4 flex items-baseline">
            <span className="text-4xl font-bold text-primary">{price}</span>
            <span className="ml-1 text-xl font-medium text-neutral-500">/month</span>
          </div>
          <p className="mt-5 text-lg text-neutral-500">{description}</p>
        </div>
      </div>
      <div className="bg-neutral-50 px-6 py-6 sm:px-10 sm:py-6">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="flex-shrink-0">
                {feature.included ? (
                  <Check className="text-success h-5 w-5" />
                ) : (
                  <X className="text-error h-5 w-5" />
                )}
              </div>
              <p className={cn(
                "ml-3",
                feature.included ? "text-neutral-700" : "text-neutral-500"
              )}>
                {feature.name}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Button 
            asChild
            className={cn(
              "w-full transition-all",
              isPrimary 
                ? "bg-gradient-secondary hover:brightness-105 text-white shadow-md hover:shadow-lg" 
                : "bg-white text-secondary border-secondary hover:bg-neutral-50"
            )}
            variant={isPrimary ? "default" : "outline"}
          >
            <a href={buttonLink}>{buttonText}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
