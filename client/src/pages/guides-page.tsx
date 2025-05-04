import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  BookOpen, Users, GraduationCap, Briefcase, Award, 
  FileText, PenTool, Clock, Building, Filter, 
  Star, MessageCircle, CheckCircle, Target
} from "lucide-react";

export default function GuidesPage() {
  const guides = [
    {
      id: 1,
      title: "Resume Writing 101",
      description: "A comprehensive guide to writing an effective resume from scratch, covering all essential sections.",
      icon: FileText,
      level: "Beginner",
      timeToRead: "25 minutes",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      title: "Crafting a Winning Personal Statement",
      description: "Learn how to write a compelling personal statement that captures attention and highlights your value.",
      icon: PenTool,
      level: "Intermediate",
      timeToRead: "15 minutes",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      title: "Work Experience: Show, Don't Tell",
      description: "Transform your work history into powerful achievement statements that demonstrate your impact.",
      icon: Briefcase,
      level: "Intermediate",
      timeToRead: "20 minutes",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      id: 4,
      title: "Education Section Best Practices",
      description: "How to properly format your education section and what to include based on your experience level.",
      icon: GraduationCap,
      level: "Beginner",
      timeToRead: "12 minutes",
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: 5,
      title: "Skills Section: The Complete Guide",
      description: "Learn how to showcase your technical, soft, and transferable skills effectively.",
      icon: CheckCircle,
      level: "Beginner",
      timeToRead: "18 minutes",
      color: "bg-red-100 text-red-700",
    },
    {
      id: 6,
      title: "Tailoring Your Resume for Different Industries",
      description: "How to customize your resume for specific industries to increase your chances of getting an interview.",
      icon: Building,
      level: "Advanced",
      timeToRead: "30 minutes",
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      id: 7,
      title: "Beating the ATS: Keyword Optimization",
      description: "Strategies to optimize your resume for applicant tracking systems without sacrificing readability.",
      icon: Filter,
      level: "Advanced",
      timeToRead: "22 minutes",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: 8,
      title: "Resume Design: Balancing Style and Function",
      description: "Tips for creating a visually appealing resume that remains professional and ATS-friendly.",
      icon: Star,
      level: "Intermediate",
      timeToRead: "20 minutes",
      color: "bg-rose-100 text-rose-700",
    },
    {
      id: 9,
      title: "Achievements and Quantifiable Results",
      description: "How to identify and articulate your accomplishments with powerful metrics and results.",
      icon: Award,
      level: "Intermediate",
      timeToRead: "15 minutes",
      color: "bg-green-100 text-green-700",
    },
    {
      id: 10,
      title: "Resume Gaps: How to Address Them",
      description: "Strategies for explaining employment gaps positively and professionally on your resume.",
      icon: Clock,
      level: "Intermediate",
      timeToRead: "18 minutes",
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: 11,
      title: "Resume Checklist: Final Review",
      description: "A comprehensive checklist to ensure your resume is error-free and ready for submission.",
      icon: FileText,
      level: "Beginner",
      timeToRead: "10 minutes",
      color: "bg-violet-100 text-violet-700",
    },
    {
      id: 12,
      title: "Networking: Leveraging Your Resume",
      description: "How to use your resume effectively in networking situations to maximize opportunities.",
      icon: Users,
      level: "Advanced",
      timeToRead: "25 minutes",
      color: "bg-teal-100 text-teal-700",
    },
  ];

  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Resume Building Guides
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive resources to help you create a standout resume for any job application.
        </p>
      </div>

      {/* Level Filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {levels.map((level) => (
          <Button
            key={level}
            variant={level === "All Levels" ? "default" : "outline"}
            size="sm"
            className="rounded-full"
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Featured Guide */}
      <div className="mb-16">
        <Card className="overflow-hidden border-blue-200">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6 md:p-8 flex flex-col justify-center bg-blue-50">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Featured Guide</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3">The Ultimate Resume Writing Masterclass</h2>
              <p className="text-muted-foreground mb-6">
                This comprehensive guide covers everything you need to know about creating a professional, 
                ATS-friendly resume that will get you noticed by recruiters and hiring managers.
              </p>
              <div className="flex items-center gap-4 text-sm mb-6">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1 text-blue-700" />
                  <span>All Levels</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-blue-700" />
                  <span>45 minutes</span>
                </div>
              </div>
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                Read The Masterclass
              </Button>
            </div>
            <div className="h-60 md:h-auto overflow-hidden bg-blue-100 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                alt="Resume Writing Masterclass"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card key={guide.id} className="overflow-hidden flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className={`w-10 h-10 rounded-lg ${guide.color} flex items-center justify-center mb-4`}>
                <guide.icon className="h-5 w-5" />
              </div>
              <CardTitle>{guide.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <CardDescription className="text-base">{guide.description}</CardDescription>
            </CardContent>
            <CardFooter className="pt-0 flex flex-col items-start">
              <div className="flex items-center justify-between w-full mb-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-1" />
                  {guide.level}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {guide.timeToRead}
                </div>
              </div>
              <Button variant="outline" className="w-full">Read Guide</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Additional Resume Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <FileText className="h-5 w-5" />
              </div>
              <CardTitle>Resume Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Browse our collection of professionally designed, ATS-friendly resume templates for different industries.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href="/templates">
                <Button variant="outline" className="w-full">Browse Templates</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <MessageCircle className="h-5 w-5" />
              </div>
              <CardTitle>Resume Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Get personalized feedback on your resume from hiring managers and resume experts in our community.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Join Community</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <CardTitle>Industry Guides</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Specialized resume guides tailored to specific industries, from technology to healthcare to finance.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Industry Guides</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}