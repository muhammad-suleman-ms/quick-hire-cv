import { Link, useRoute } from "wouter";
import { ArrowLeft, CalendarIcon, Clock, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Blog post data (would be fetched from an API in a real application)
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Creating an ATS-Friendly Resume",
    content: `
      <p class="mb-6 text-lg leading-relaxed">In today's competitive job market, your resume needs to impress both human recruiters and the Applicant Tracking Systems (ATS) they use to filter candidates. An ATS scans your resume for keywords and formats before it ever reaches human eyes. Here are 10 essential tips to ensure your resume passes those digital gatekeepers.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">1. Use Standard Resume Formats</h2>
      <p class="mb-6 leading-relaxed">Stick to standard resume formats like chronological, functional, or combination. These are easier for ATS software to parse. Avoid creative layouts, graphics, or uncommon file formats. Always submit your resume as a .docx or .pdf file unless specifically instructed otherwise.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">2. Include Relevant Keywords</h2>
      <p class="mb-6 leading-relaxed">Review the job description carefully and incorporate relevant keywords and phrases. Focus on hard skills, technical qualifications, certifications, and industry-specific terminology that match the job requirements.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">3. Use Standard Section Headings</h2>
      <p class="mb-6 leading-relaxed">Label sections with standard headings like "Work Experience," "Education," "Skills," and "Certifications." Avoid creative headings that ATS systems might not recognize.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">4. Avoid Headers and Footers</h2>
      <p class="mb-6 leading-relaxed">Some ATS software can't read information in headers and footers. Place all important information in the main body of your resume.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">5. Skip Complex Tables and Graphics</h2>
      <p class="mb-6 leading-relaxed">Complex formatting like tables, columns, text boxes, and graphics can confuse ATS systems. Stick to simple, clean layouts with clear sections and bullet points.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">6. Use Standard Fonts</h2>
      <p class="mb-6 leading-relaxed">Use common, professional fonts like Arial, Calibri, or Times New Roman in 10-12 point size. Avoid fancy or uncommon fonts that might not translate correctly.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">7. Spell Out Acronyms</h2>
      <p class="mb-6 leading-relaxed">Include both the spelled-out version and the acronym of industry-specific terms. For example, "Search Engine Optimization (SEO)" ensures you're covered regardless of which form the ATS is programmed to identify.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">8. Keep Formatting Simple</h2>
      <p class="mb-6 leading-relaxed">Use standard bullet points, bold, and italics sparingly. Avoid special characters, custom bullets, or excessive formatting that could interfere with parsing.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">9. Include a Skills Section</h2>
      <p class="mb-6 leading-relaxed">A dedicated skills section makes it easy for ATS systems to match your qualifications with job requirements. List both hard and soft skills relevant to the position.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">10. Tailor Your Resume for Each Application</h2>
      <p class="mb-6 leading-relaxed">One-size-fits-all resumes rarely make it through ATS filters. Customize your resume for each job application, adjusting the keywords and highlighting relevant experiences that match the specific job description.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
      <p class="mb-6 leading-relaxed">While optimizing for ATS is important, remember that your resume will eventually be read by humans. Strike a balance between ATS optimization and creating an engaging, readable document that showcases your qualifications effectively. With these tips, you'll increase your chances of passing digital screening and landing an interview.</p>
    `,
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    date: "April 15, 2025",
    readTime: "5 min read",
    category: "Resume Tips",
    author: "Alex Johnson",
    authorTitle: "Career Coach & Resume Expert"
  },
  // More blog posts would be here
];

export default function BlogPost() {
  // Get post ID from URL
  const [, params] = useRoute<{ id: string }>("/blog/post/:id");
  const postId = params?.id ? parseInt(params.id) : 1;
  
  // Find the post
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>
      
      {/* Post header */}
      <div className="mb-10">
        <div className="text-sm font-medium text-secondary mb-3">
          {post.category}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">{post.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-y-2">
          <span className="mr-6">By {post.author}, {post.authorTitle}</span>
          <span className="flex items-center mr-6">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {post.date}
          </span>
          <span className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {post.readTime}
          </span>
        </div>
      </div>
      
      {/* Featured image */}
      <div className="mb-10">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-auto rounded-lg object-cover"
          style={{ maxHeight: '500px' }}
        />
      </div>
      
      {/* Post content */}
      <div 
        className="prose prose-lg max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Share */}
      <div className="mt-12 border-t pt-6">
        <h3 className="text-lg font-bold mb-3">Share this article</h3>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Related posts */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.slice(0, 2).map(relatedPost => (
            <Card key={relatedPost.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={relatedPost.image} 
                  alt={relatedPost.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="text-sm font-medium text-secondary mb-2">
                  {relatedPost.category}
                </div>
                <h3 className="text-lg font-bold mb-2">{relatedPost.title}</h3>
                <Link to={`/blog/post/${relatedPost.id}`}>
                  <button className="mt-2 text-primary hover:text-primary/80">
                    Read article
                  </button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}