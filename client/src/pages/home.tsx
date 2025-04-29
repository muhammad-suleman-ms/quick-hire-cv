import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, Check, WandSparkles, Smartphone, Download, Clock, Lightbulb } from "lucide-react";
import ResumeTemplateCard from "@/components/ui/resume-template-card";
import FeaturesCard from "@/components/ui/features-card";
import TestimonialCard from "@/components/ui/testimonial-card";
import PricingCard from "@/components/ui/pricing-card";
import FAQItem from "@/components/ui/faq-item";
import { templates } from "@/lib/resume-templates";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: subscription } = useQuery<{ isPremium: boolean }>({
    queryKey: ["/api/subscription"],
  });
  
  const hasPremiumAccess = !!subscription?.isPremium;
  
  const featuredTemplates = templates.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
                  Create ATS-friendly resumes in minutes
                </h1>
                <p className="mt-4 text-lg text-neutral-600">
                  Build professional resumes that stand out and get past applicant tracking systems with our easy-to-use resume builder.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href="/templates">
                    <Button className="w-full sm:w-auto bg-secondary hover:bg-secondary/90">
                      Browse Templates
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-1">
                    <div className="h-8 w-8 rounded-full ring-2 ring-white bg-neutral-300"></div>
                    <div className="h-8 w-8 rounded-full ring-2 ring-white bg-neutral-400"></div>
                    <div className="h-8 w-8 rounded-full ring-2 ring-white bg-neutral-500"></div>
                  </div>
                  <div className="ml-3">
                    <span className="text-sm text-neutral-500">Trusted by <span className="font-medium text-primary">10,000+</span> job seekers</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  className="w-full rounded-lg shadow-xl" 
                  src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=900&q=80" 
                  alt="Person creating resume on computer" 
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-primary">ATS-Optimized Templates</p>
                      <p className="text-xs text-neutral-500">Designed to pass applicant tracking systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Why Choose Our Resume Builder</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
              Create professional, ATS-friendly resumes that help you stand out and get more interviews.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            <FeaturesCard
              icon={FileText}
              title="ATS-Friendly Templates"
              description="All our templates are designed to pass through Applicant Tracking Systems with ease."
            />
            <FeaturesCard
              icon={WandSparkles}
              title="Easy to Use"
              description="Our step-by-step builder makes creating professional resumes simple and intuitive."
            />
            <FeaturesCard
              icon={Smartphone}
              title="Fully Responsive"
              description="Create and edit your resume on any device - desktop, tablet, or mobile."
            />
            <FeaturesCard
              icon={Download}
              title="Multiple Download Formats"
              description="Download your resume as PDF, DOCX, or TXT to suit different application requirements."
            />
            <FeaturesCard
              icon={Clock}
              title="Save Time"
              description="Create a professional resume in minutes instead of hours with our easy-to-use builder."
            />
            <FeaturesCard
              icon={Lightbulb}
              title="Expert Guidance"
              description="Get tips and guidance throughout the process to create the most effective resume."
            />
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Choose Your Perfect Template</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
              Browse our collection of professionally designed, ATS-friendly resume templates
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {featuredTemplates.map((template) => (
              <ResumeTemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                image={template.image}
                isPremium={template.isPremium}
                hasPremiumAccess={hasPremiumAccess}
                onClick={() => {}}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/templates">
              <Button className="bg-secondary hover:bg-secondary/90">
                View All Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">How It Works</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
              Our resume builder makes it easy to create a professional resume in just a few steps
            </p>
          </div>

          <div className="mt-12 lg:mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary text-white text-xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-lg font-medium text-primary text-center">Choose a Template</h3>
                <p className="mt-2 text-neutral-600 text-center">
                  Browse our collection of ATS-friendly templates and select one that matches your style.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary text-white text-xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-lg font-medium text-primary text-center">Fill in Your Details</h3>
                <p className="mt-2 text-neutral-600 text-center">
                  Use our step-by-step form to add your personal information, experience, education, and skills.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary text-white text-xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-lg font-medium text-primary text-center">Download Your Resume</h3>
                <p className="mt-2 text-neutral-600 text-center">
                  Preview your resume, make any final adjustments, and download it in your preferred format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Choose Your Plan</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
              Select the plan that works best for your career needs
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
            <PricingCard
              title="Free"
              price="$0"
              description="Perfect for getting started"
              features={[
                { name: "Access to 3 free templates", included: true },
                { name: "Download as PDF", included: true },
                { name: "Basic content suggestions", included: true },
                { name: "Create unlimited resumes", included: true },
                { name: "No watermark on premium templates", included: false }
              ]}
              buttonText="Get Started Free"
              buttonLink="/signup"
            />
            <PricingCard
              title="Premium"
              price="$19.95"
              description="For serious job seekers"
              features={[
                { name: "Access to all free templates", included: true },
                { name: "Access to 15+ premium templates", included: true },
                { name: "No watermarks on all templates", included: true },
                { name: "Download as PDF, DOCX, or TXT", included: true },
                { name: "Advanced AI content suggestions", included: true }
              ]}
              buttonText="Try Premium"
              buttonLink="/subscription"
              isPrimary={true}
              popularBadge={true}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">What Our Users Say</h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-3xl mx-auto">
              Thousands of job seekers have successfully landed jobs using our resume builder
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              content="I was struggling to get interviews until I used this resume builder. The templates are truly ATS-friendly and I started getting calls within days!"
              avatar="https://randomuser.me/api/portraits/women/79.jpg"
              name="Sarah Johnson"
              position="Software Engineer"
              rating={5}
            />
            <TestimonialCard
              content="The step-by-step process made creating my resume so easy. I love how professional it looks and I've received multiple compliments on it from recruiters."
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
              name="Michael Chen"
              position="Marketing Manager"
              rating={5}
            />
            <TestimonialCard
              content="The premium templates are worth every penny. I upgraded and landed a job within two weeks. The modern designs really help you stand out from other candidates."
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
              name="Jessica Martinez"
              position="UX Designer"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Find answers to common questions about our resume builder
            </p>
          </div>

          <div className="mt-12">
            <FAQItem
              question="What is an ATS-friendly resume?"
              answer="An ATS (Applicant Tracking System) friendly resume is designed to be easily read and processed by the software that many companies use to screen applications. Our templates are structured to ensure your resume passes through these systems successfully and reaches human recruiters."
              isOpen={true}
            />
            <FAQItem
              question="What's included in the free plan?"
              answer="The free plan includes access to 3 professional resume templates, unlimited resume creation, and the ability to download your resume as a PDF. You'll also get basic content suggestions to help you create an effective resume."
            />
            <FAQItem
              question="Can I cancel my premium subscription?"
              answer="Yes, you can cancel your premium subscription at any time. Your benefits will continue until the end of your current billing period, after which you'll revert to the free plan."
            />
            <FAQItem
              question="How do I remove the watermark from premium templates?"
              answer="The watermark on premium templates can be removed by upgrading to our premium plan. Once you've subscribed, all premium templates will be available without watermarks, and you can download them in multiple formats."
            />
            <FAQItem
              question="Can I edit my resume after creating it?"
              answer="Yes, you can edit your resume as many times as you want. All your resumes are saved to your account, and you can go back and make changes at any time. This makes it easy to customize your resume for different job applications."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Start Building Your Professional Resume Today</h2>
            <p className="mt-4 text-xl text-white/80 max-w-3xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs with our resume builder
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/create-resume">
                <Button className="bg-white text-secondary hover:bg-neutral-100">
                  Create Your Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
