import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function BuilderSection() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Build your resume step-by-step</h2>
            <p className="text-neutral-500 mb-6">Our intuitive resume builder guides you through each section, making it easy to create a professional and ATS-friendly resume.</p>
            
            {/* Steps */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Personal Information</h3>
                  <p className="text-sm text-neutral-500">Start with your contact details and professional summary</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Work Experience</h3>
                  <p className="text-sm text-neutral-500">Add your work history with achievements and responsibilities</p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">3</div>
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-neutral-500">Include your academic background and certifications</p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">4</div>
                <div>
                  <h3 className="font-semibold mb-1">Skills & Expertise</h3>
                  <p className="text-sm text-neutral-500">Highlight your technical and soft skills relevant to the job</p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium">5</div>
                <div>
                  <h3 className="font-semibold mb-1">Review & Download</h3>
                  <p className="text-sm text-neutral-500">Preview your finished resume and download in your preferred format</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/builder">
                <Button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white">
                  Start Building Your Resume
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Builder Preview */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Work Experience</h3>
                <span className="text-sm text-neutral-500">Step 2 of 5</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-neutral-200 h-2 rounded mb-6">
                <div className="bg-blue-600 h-2 rounded w-2/5"></div>
              </div>
              
              {/* Form */}
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1" htmlFor="job-title">Job Title</label>
                    <input 
                      type="text" 
                      id="job-title" 
                      className="w-full p-2 border border-neutral-300 rounded focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" 
                      defaultValue="Product Designer" 
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1" htmlFor="employer">Employer</label>
                    <input 
                      type="text" 
                      id="employer" 
                      className="w-full p-2 border border-neutral-300 rounded focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" 
                      defaultValue="Airbnb" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
                    <input 
                      type="text" 
                      id="location" 
                      className="w-full p-2 border border-neutral-300 rounded focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" 
                      defaultValue="San Francisco, CA" 
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1" htmlFor="start-date">Start Date</label>
                    <input 
                      type="text" 
                      id="start-date" 
                      className="w-full p-2 border border-neutral-300 rounded focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" 
                      defaultValue="June 2020" 
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      id="current-job" 
                      className="mr-2" 
                      defaultChecked 
                    />
                    <label htmlFor="current-job" className="text-sm">I currently work here</label>
                  </div>
                  
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1" htmlFor="end-date">End Date</label>
                    <input 
                      type="text" 
                      id="end-date" 
                      className="w-full p-2 border border-neutral-300 rounded focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" 
                      defaultValue="Present" 
                      disabled 
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                  <textarea 
                    id="description" 
                    rows={4} 
                    className="w-full p-2 border border-neutral-300 rounded focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none" 
                    defaultValue="Led the redesign of the mobile booking experience, resulting in a 15% increase in conversion rate. Collaborated with cross-functional teams to implement user feedback and improve overall usability."
                  ></textarea>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline">
                    Previous: Personal Info
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Next: Education
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
