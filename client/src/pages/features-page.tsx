import { FileCheck, Eye, Settings, Cpu, Download, Package, RefreshCw, Shield, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

export default function FeaturesPage() {
  const features = [
    {
      title: "ATS-Friendly Templates",
      description: "Our resume templates are designed to pass through Applicant Tracking Systems with ease, ensuring your resume gets seen by human recruiters.",
      icon: FileCheck,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Real-Time Preview",
      description: "See changes to your resume in real-time as you edit, giving you immediate feedback on your design choices.",
      icon: Eye,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Customizable Sections",
      description: "Add, remove, and rearrange sections to create a resume that perfectly matches your career needs.",
      icon: Settings,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "AI Content Suggestions",
      description: "Get smart suggestions for skills, action verbs, and job descriptions based on your industry and role.",
      icon: Cpu,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Multiple Export Formats",
      description: "Download your resume as PDF, DOCX, or TXT files, making it easy to submit to any job application platform.",
      icon: Download,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Premium Template Collection",
      description: "Access a wide range of professionally designed templates to make your resume stand out.",
      icon: Package,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      title: "One-Click Updates",
      description: "Update your information once and have it reflect across all your resumes instantly.",
      icon: RefreshCw,
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Secure Cloud Storage",
      description: "Your resumes are securely stored in the cloud, accessible anytime from anywhere.",
      icon: Shield,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Application Tracking",
      description: "Track where you've sent your resume and monitor responses all in one place.",
      icon: BarChart,
      color: "bg-rose-100 text-rose-700",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Powerful Features for Your Job Search
        </h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to create professional, ATS-friendly resumes that get you noticed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-8 md:p-12 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Perfect Resume?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of job seekers who've found success with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/templates">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse Templates
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-4">Tailored for Your Industry</h2>
          <p className="text-muted-foreground mb-6">
            Our templates are designed with specific industries in mind, helping you present your qualifications in the most effective way.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Technology & IT</li>
            <li>• Business & Finance</li>
            <li>• Healthcare & Medical</li>
            <li>• Creative & Design</li>
            <li>• Education & Research</li>
            <li>• Sales & Marketing</li>
            <li>• And many more...</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Expert-Verified Content</h2>
          <p className="text-muted-foreground mb-6">
            Our resume content suggestions are developed by HR professionals and industry experts to ensure your resume includes what recruiters are looking for.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Industry-specific skill recommendations</li>
            <li>• Powerful action verbs for your experience</li>
            <li>• Professional summary suggestions</li>
            <li>• ATS keyword optimization</li>
            <li>• Grammar and style improvements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}