import { FileSearch, FileText, Download } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How it works</h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">Our simple three-step process helps you create a professional resume in minutes</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileSearch className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose a template</h3>
            <p className="text-neutral-500">Browse our collection of professionally designed templates that are perfect for your industry.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Add your details</h3>
            <p className="text-neutral-500">Fill in your information with our step-by-step form that guides you through each section.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Download & apply</h3>
            <p className="text-neutral-500">Get your ATS-optimized resume as a PDF and start applying to jobs with confidence.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-neutral-700 font-medium mb-2">Join thousands of professionals who've built their resume with us</p>
          <p className="text-sm text-neutral-500">No credit card required to get started</p>
        </div>
      </div>
    </section>
  );
}
