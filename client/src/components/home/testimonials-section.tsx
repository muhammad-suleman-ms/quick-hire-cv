import { Star, StarHalf } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Specialist",
    rating: 5,
    quote: "I landed three interviews within a week of using ResumeBuilder. The ATS optimization feature really made a difference in getting my resume noticed.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    rating: 5,
    quote: "The templates are so professional and the step-by-step builder made it easy to create a resume that truly represents my skills and experience.",
  },
  {
    id: 3,
    name: "Jessica Patel",
    role: "Product Manager",
    rating: 4.5,
    quote: "As a career changer, I needed a resume that highlighted my transferable skills. ResumeBuilder helped me create exactly that, and I've now successfully switched industries.",
  },
];

export default function TestimonialsSection() {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-blue-600 text-blue-600" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-blue-600 text-blue-600" />);
    }
    
    return stars;
  };

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">Join thousands of job seekers who have successfully landed their dream jobs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center text-blue-600 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-neutral-500 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-500">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
