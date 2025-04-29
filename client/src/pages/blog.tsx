import { Link } from "wouter";
import { CalendarIcon, ChevronRightIcon, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Creating an ATS-Friendly Resume",
    excerpt: "Learn how to optimize your resume to pass through Applicant Tracking Systems with these essential tips.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "April 15, 2025",
    readTime: "5 min read",
    category: "Resume Tips"
  },
  {
    id: 2,
    title: "The Difference Between a Resume and a CV",
    excerpt: "Understand when to use a resume vs. a CV with our comprehensive guide on the key differences.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "April 10, 2025",
    readTime: "7 min read",
    category: "Career Advice"
  },
  {
    id: 3,
    title: "How to Showcase Your Skills Effectively",
    excerpt: "Master the art of presenting your skills in a way that makes you stand out to employers.",
    image: "https://images.unsplash.com/photo-1507209550122-8178379f759c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "April 5, 2025",
    readTime: "6 min read",
    category: "Resume Tips"
  },
  {
    id: 4,
    title: "Resume Design: Finding the Right Balance",
    excerpt: "Discover how to create a visually appealing resume without sacrificing professionalism.",
    image: "https://images.unsplash.com/photo-1522152302542-71a8e5172aa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "March 28, 2025",
    readTime: "8 min read",
    category: "Design"
  },
  {
    id: 5,
    title: "Job Search Strategies for 2025",
    excerpt: "Stay ahead of the curve with these current job search techniques that actually work.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "March 20, 2025",
    readTime: "10 min read",
    category: "Career Advice"
  },
  {
    id: 6,
    title: "How to Write a Compelling Cover Letter",
    excerpt: "Tips for creating a cover letter that complements your resume and catches employers' attention.",
    image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "March 15, 2025",
    readTime: "6 min read",
    category: "Cover Letters"
  }
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Resume Builder Blog</h1>
        <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
          Expert advice, tips, and insights to help you create professional resumes and advance your career.
        </p>
      </div>

      {/* Featured post */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
              <div className="text-sm font-medium text-secondary mb-2">
                {blogPosts[0].category}
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4">{blogPosts[0].title}</CardTitle>
              <CardDescription className="text-base mb-6">{blogPosts[0].excerpt}</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className="mr-4">{blogPosts[0].date}</span>
                <Clock className="mr-2 h-4 w-4" />
                <span>{blogPosts[0].readTime}</span>
              </div>
              <div>
                <Link to={`/blog/post/${blogPosts[0].id}`}>
                  <button className="inline-flex items-center text-primary hover:text-primary/80">
                    Read article <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map(post => (
          <Card key={post.id} className="overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="h-full w-full object-cover transition-transform hover:scale-105 duration-200"
              />
            </div>
            <CardHeader>
              <div className="text-sm font-medium text-secondary mb-1">
                {post.category}
              </div>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span className="mr-3">{post.date}</span>
                <Clock className="mr-2 h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
              <Link to={`/blog/post/${post.id}`}>
                <button className="inline-flex items-center text-primary hover:text-primary/80">
                  Read <ChevronRightIcon className="ml-1 h-4 w-4" />
                </button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}