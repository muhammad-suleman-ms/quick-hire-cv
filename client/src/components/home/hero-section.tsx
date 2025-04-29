import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Craft your perfect resume with ease
            </h1>
            <p className="text-lg text-neutral-500">
              Create an ATS-friendly resume that stands out and gets you noticed by employers. Our intuitive builder makes it simple.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/builder">
                <Button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                  Get Started - Free
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" className="w-full sm:w-auto px-6 py-3 border border-neutral-300 hover:bg-neutral-100">
                  See Templates
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-neutral-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>ATS-friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>20+ templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>AI assistance</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=700&amp;h=500&amp;q=80" 
              alt="Professional desk with resume on screen" 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
