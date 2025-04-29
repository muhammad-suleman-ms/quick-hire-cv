import { LucideIcon } from "lucide-react";

interface FeaturesCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeaturesCard({ icon: Icon, title, description }: FeaturesCardProps) {
  return (
    <div className="relative group">
      <div className="bg-white overflow-hidden rounded-lg shadow-sm hover:shadow transition-shadow duration-300">
        <div className="p-6">
          <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-lg">
            <Icon className="text-secondary text-xl" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-primary">{title}</h3>
          <p className="mt-2 text-neutral-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
