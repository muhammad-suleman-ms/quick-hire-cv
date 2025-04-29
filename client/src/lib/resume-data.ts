import { Template } from "@shared/schema";

// Default template data
export const defaultTemplates: Template[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and professional design for all industries",
    isPremium: false,
    category: ["all", "free", "business", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc"
  },
  {
    id: "executive-pro",
    name: "Executive Pro",
    description: "Perfect for senior professionals and managers",
    isPremium: true,
    category: ["all", "premium", "business", "finance"],
    thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234"
  },
  {
    id: "creative-edge",
    name: "Creative Edge",
    description: "Stand out with this design-focused template",
    isPremium: false,
    category: ["all", "free", "creative", "design"],
    thumbnail: "https://images.unsplash.com/photo-1599566150163-29194dcaad36"
  },
  {
    id: "tech-focus",
    name: "Tech Focus",
    description: "Optimized for technical roles and developers",
    isPremium: true,
    category: ["all", "premium", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1568952433726-3896e3881c65"
  },
  {
    id: "minimal-tech",
    name: "Minimal Tech",
    description: "Clean design focused on skills and experience",
    isPremium: false,
    category: ["all", "free", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28"
  },
  {
    id: "professional-classic",
    name: "Professional Classic",
    description: "Timeless design for all professionals",
    isPremium: false,
    category: ["all", "free", "business"],
    thumbnail: "https://images.unsplash.com/photo-1586282391129-76a6df230234"
  },
  {
    id: "creative-design",
    name: "Creative Design",
    description: "Bold layout for creative professionals",
    isPremium: true, 
    category: ["all", "premium", "creative", "design"],
    thumbnail: "https://images.unsplash.com/photo-1618004912476-29818d81ae2e"
  },
  {
    id: "simple-elegant",
    name: "Simple Elegant",
    description: "Minimalist design with professional aesthetic",
    isPremium: false,
    category: ["all", "free", "business"],
    thumbnail: "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
  },
  {
    id: "bold-modern",
    name: "Bold Modern",
    description: "Contemporary design with standout sections",
    isPremium: true,
    category: ["all", "premium", "creative"],
    thumbnail: "https://images.unsplash.com/photo-1618004652321-13a63e576b80"
  },
  {
    id: "finance-pro",
    name: "Finance Pro",
    description: "Tailored for finance and banking professionals",
    isPremium: true,
    category: ["all", "premium", "finance", "business"],
    thumbnail: "https://images.unsplash.com/photo-1611095973763-414019e72400"
  },
  {
    id: "healthcare-specialist",
    name: "Healthcare Specialist",
    description: "Professional template for medical professionals",
    isPremium: true,
    category: ["all", "premium", "healthcare"],
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
  },
  {
    id: "academic-cv",
    name: "Academic CV",
    description: "Structured format ideal for academic positions",
    isPremium: false,
    category: ["all", "free", "academic"],
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8"
  },
  {
    id: "entry-level",
    name: "Entry Level",
    description: "Perfect for students and recent graduates",
    isPremium: false,
    category: ["all", "free", "business"],
    thumbnail: "https://images.unsplash.com/photo-1571867424488-4565932edb41"
  },
  {
    id: "startup-innovative",
    name: "Startup Innovative",
    description: "Modern design for tech startup professionals",
    isPremium: true,
    category: ["all", "premium", "tech", "creative"],
    thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e"
  },
  {
    id: "executive-minimal",
    name: "Executive Minimal",
    description: "Subtle and elegant design for executives",
    isPremium: true,
    category: ["all", "premium", "business"],
    thumbnail: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282"
  },
  {
    id: "technical-expert",
    name: "Technical Expert",
    description: "Focused on showcasing technical skills and projects",
    isPremium: false,
    category: ["all", "free", "tech"],
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
  }
];

// Sample skills for suggestions
export const skillSuggestions = [
  // Technical Skills
  "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Node.js", "Express", "Python", "Django", "Flask",
  "Java", "Spring Boot", "C#", ".NET", "PHP", "Laravel", "Ruby", "Ruby on Rails", "HTML5", "CSS3",
  "Sass/SCSS", "Bootstrap", "Tailwind CSS", "jQuery", "RESTful APIs", "GraphQL", "SQL", "MySQL", "PostgreSQL",
  "MongoDB", "Firebase", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Git", "CI/CD",
  "TDD", "Agile", "Scrum", "Webpack", "Babel", "Redux", "MobX", "Next.js", "Gatsby", "WordPress",
  
  // Design Skills
  "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "InDesign", "UI/UX Design", "Wireframing",
  "Prototyping", "User Research", "Responsive Design", "Motion Design", "Typography", "Color Theory",
  "Brand Identity", "Logo Design", "Information Architecture", "Usability Testing",
  
  // Business Skills
  "Market Research", "Business Analysis", "Project Management", "Strategic Planning", "Financial Analysis",
  "Data Analysis", "SEO", "SEM", "Social Media Marketing", "Content Marketing", "Email Marketing",
  "Google Analytics", "CRM", "Microsoft Office", "Google Workspace", "Public Speaking", "Presentations",
  "Customer Service", "Sales", "Negotiation", "Leadership", "Team Management", "Budget Management",
  
  // Soft Skills
  "Communication", "Problem Solving", "Critical Thinking", "Creativity", "Adaptability", "Time Management",
  "Organization", "Teamwork", "Collaboration", "Emotional Intelligence", "Conflict Resolution", "Decision Making",
  "Multitasking", "Attention to Detail", "Self-motivation", "Work Ethic", "Flexibility", "Networking"
];

// Sample job titles for suggestions
export const jobTitleSuggestions = [
  // Technology
  "Software Engineer", "Full Stack Developer", "Frontend Developer", "Backend Developer", "Mobile Developer",
  "iOS Developer", "Android Developer", "DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer",
  "Data Scientist", "Data Analyst", "Data Engineer", "Machine Learning Engineer", "AI Specialist",
  "QA Engineer", "QA Analyst", "Test Automation Engineer", "IT Support Specialist", "Network Administrator",
  "Systems Administrator", "Cybersecurity Analyst", "Information Security Officer", "Database Administrator",
  "Blockchain Developer", "Game Developer", "AR/VR Developer", "Technical Writer", "Technical Product Manager",
  
  // Design
  "UX Designer", "UI Designer", "Product Designer", "Graphic Designer", "Web Designer", "Visual Designer",
  "Interaction Designer", "Motion Designer", "Brand Designer", "Art Director", "Creative Director",
  "UX Researcher", "UX Writer", "Content Designer", "Information Architect",
  
  // Marketing
  "Marketing Manager", "Digital Marketing Specialist", "SEO Specialist", "SEM Specialist", "Social Media Manager",
  "Content Marketing Manager", "Email Marketing Specialist", "Growth Marketer", "Marketing Analyst",
  "Brand Manager", "Product Marketing Manager", "Content Strategist", "Copywriter", "Public Relations Specialist",
  "Marketing Coordinator",
  
  // Business
  "Project Manager", "Product Manager", "Business Analyst", "Data Analyst", "Financial Analyst", "HR Manager",
  "Talent Acquisition Specialist", "Operations Manager", "Business Development Manager", "Sales Representative",
  "Account Manager", "Customer Success Manager", "Executive Assistant", "Office Manager", "Consultant",
  "Strategy Consultant", "Management Consultant"
];
