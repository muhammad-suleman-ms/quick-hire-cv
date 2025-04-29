import { Star } from "lucide-react";

interface TestimonialCardProps {
  content: string;
  avatar: string;
  name: string;
  position: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export default function TestimonialCard({
  content,
  avatar,
  name,
  position,
  rating,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className="text-secondary flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-secondary' : 'text-neutral-300'}`} 
            />
          ))}
        </div>
      </div>
      <blockquote className="text-neutral-700">
        <p>{content}</p>
      </blockquote>
      <div className="mt-4 flex items-center">
        <img 
          className="h-10 w-10 rounded-full" 
          src={avatar} 
          alt={`${name}'s avatar`}
        />
        <div className="ml-3">
          <div className="text-sm font-medium text-primary">{name}</div>
          <div className="text-xs text-neutral-500">{position}</div>
        </div>
      </div>
    </div>
  );
}
