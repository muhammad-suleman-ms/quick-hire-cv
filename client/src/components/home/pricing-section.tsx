import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">Select the right option for your resume needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-neutral-100 rounded-lg p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1">Free</h3>
              <p className="text-neutral-500">Get started with the essentials</p>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-neutral-500">/month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Unlimited resume creation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>5+ professional templates</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Download as PDF</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Basic ATS optimization</span>
              </li>
            </ul>
            
            <Link href="/builder">
              <Button variant="outline" className="w-full py-3 border-blue-600 text-blue-600 hover:bg-blue-50">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Premium Plan */}
          <div className="bg-primary text-white rounded-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm font-medium py-1 px-4 rounded-full">
              Most Popular
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1">Premium</h3>
              <p className="text-neutral-300">Everything you need to stand out</p>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold">$19.99</span>
              <span className="text-neutral-300">/month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>All free features</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>20+ premium templates</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Download in multiple formats (PDF, DOCX)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Advanced ATS optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>AI-powered content suggestions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Cover letter builder included</span>
              </li>
            </ul>
            
            <Link href="/builder">
              <Button className="w-full py-3 bg-cyan-500 text-primary font-medium hover:bg-cyan-400">
                Try Premium
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
