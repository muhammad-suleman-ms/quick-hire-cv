import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, Clock, ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Resume Mistakes That Could Cost You the Job",
      excerpt: "Learn about the common resume mistakes that recruiters immediately notice and how to avoid them.",
      category: "Resume Tips",
      date: "May 2, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      author: "Emily Johnson",
      authorRole: "HR Specialist"
    },
    {
      id: 2,
      title: "How to Optimize Your Resume for Applicant Tracking Systems",
      excerpt: "In today's job market, your resume needs to impress both humans and algorithms. Here's how to make it ATS-friendly.",
      category: "ATS Optimization",
      date: "April 28, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      author: "David Martinez",
      authorRole: "Tech Recruiter"
    },
    {
      id: 3,
      title: "The Perfect Resume Format for Your Industry",
      excerpt: "Different industries have different expectations for resumes. Find out which format works best for yours.",
      category: "Industry Insights",
      date: "April 22, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
      author: "Sarah Williams",
      authorRole: "Career Coach"
    },
    {
      id: 4,
      title: "How to Write a Compelling Professional Summary",
      excerpt: "The professional summary is your chance to make a strong first impression. Here's how to make it count.",
      category: "Writing Tips",
      date: "April 15, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
      author: "Michael Thompson",
      authorRole: "Professional Writer"
    },
    {
      id: 5,
      title: "Resume vs CV: Understanding the Differences",
      excerpt: "Many job seekers use these terms interchangeably, but there are important distinctions you should know.",
      category: "Education",
      date: "April 10, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e",
      author: "Lisa Chen",
      authorRole: "International Recruiter"
    },
    {
      id: 6,
      title: "Using Keywords Effectively in Your Resume",
      excerpt: "Learn how to identify and incorporate the right keywords to get past ATS filters and catch the recruiter's eye.",
      category: "Keywords",
      date: "April 3, 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      author: "Robert Wilson",
      authorRole: "SEO Specialist"
    },
  ];

  const categories = [
    "All",
    "Resume Tips",
    "ATS Optimization",
    "Keywords",
    "Industry Insights",
    "Writing Tips",
    "Education"
  ];

  const featuredPost = blogPosts[0];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Resume Building Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Expert advice and insights to help you create the perfect resume for your dream job.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((category) => (
          <Link key={category} href={`/blog?category=${category}`}>
            <Button
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          </Link>
        ))}
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-60 md:h-auto overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Featured</span>
                <span className="text-xs text-muted-foreground">{featuredPost.category}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {featuredPost.readTime}
                </div>
              </div>
              <div className="mt-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {featuredPost.author.split(' ').map(name => name[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{featuredPost.author}</p>
                    <p className="text-xs text-muted-foreground">{featuredPost.authorRole}</p>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.id}`}>
                  <Button className="w-full sm:w-auto">
                    Read Full Article 
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <div className="h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-blue-600 font-medium flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  {post.category}
                </span>
              </div>
              <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <CardDescription className="text-base line-clamp-3">{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="flex-col items-start pt-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 w-full">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center ml-auto">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
              <Link href={`/blog/${post.id}`}>
                <Button variant="ghost" className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800 hover:bg-transparent">
                  Read Article
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <Link href="/blog?page=1">
          <Button variant="outline" className="mx-1">1</Button>
        </Link>
        <Link href="/blog?page=2">
          <Button variant="outline" className="mx-1">2</Button>
        </Link>
        <Link href="/blog?page=3">
          <Button variant="outline" className="mx-1">3</Button>
        </Link>
        <Link href="/blog?page=2">
          <Button variant="outline" className="mx-1">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-50 rounded-xl p-8 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Get the latest resume tips, job search strategies, and career advice delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}