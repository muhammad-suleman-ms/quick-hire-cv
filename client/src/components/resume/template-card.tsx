import { Link } from "wouter";
import { Template } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const { user } = useAuth();
  const { id, name, description, isPremium, thumbnail } = template;

  return (
    <Card className="group relative rounded-lg overflow-hidden shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-neutral-100">
        <img 
          src={thumbnail} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button variant="secondary" size="sm">
            Preview
          </Button>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={isPremium ? "secondary" : "success"}>
            {isPremium ? "Premium" : "Free"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-1">{name}</h3>
        <p className="text-sm text-neutral-500 mb-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {user ? (
          <Link href={`/builder?template=${id}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" variant={isPremium ? "outline" : "default"}>
              {isPremium ? "Use this template" : "Use this template"}
            </Button>
          </Link>
        ) : (
          <Link href="/auth">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Sign in to use
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
