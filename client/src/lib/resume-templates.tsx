// Resume template definitions with metadata and preview images

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  image: string;
  isPremium: boolean;
  category: 'simple' | 'professional' | 'creative' | 'modern' | 'tech' | 'finance' | 'healthcare' | 'design';
  type: 'resume' | 'cv';
}

export const templates: ResumeTemplate[] = [
  // Free Resume templates
  {
    id: "basic",
    name: "Professional Basic",
    description: "Clean and simple design suitable for most industries",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: false,
    category: "simple",
    type: "resume"
  },
  {
    id: "modern",
    name: "Modern Minimal",
    description: "Contemporary and sleek with a minimalist approach",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: false,
    category: "modern",
    type: "resume"
  },
  {
    id: "classic",
    name: "Classic Standard",
    description: "Traditional format highly regarded in conservative industries",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: false,
    category: "professional",
    type: "resume"
  },
  
  // Free CV template
  {
    id: "cv-basic",
    name: "Basic CV",
    description: "Simple CV layout for academic and research positions",
    image: "https://images.unsplash.com/photo-1586074299757-dc655f18518c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: false,
    category: "simple",
    type: "cv"
  },
  
  // Premium Resume templates
  {
    id: "executive",
    name: "Executive Pro",
    description: "Distinguished design for senior positions and executives",
    image: "https://images.unsplash.com/photo-1512580770426-cbed71c40e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "professional",
    type: "resume"
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Eye-catching layout for creative industries",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "creative",
    type: "resume"
  },
  {
    id: "tech",
    name: "Tech Innovator",
    description: "Modern design optimized for IT and tech professionals",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "tech",
    type: "resume"
  },
  {
    id: "finance",
    name: "Finance Expert",
    description: "Polished and professional for finance roles",
    image: "https://images.unsplash.com/photo-1561069934-eee225952461?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "finance",
    type: "resume"
  },
  {
    id: "healthcare",
    name: "Healthcare Professional",
    description: "Clean layout for medical and healthcare fields",
    image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "healthcare",
    type: "resume"
  },
  {
    id: "minimal-dark",
    name: "Minimal Dark",
    description: "Sleek dark-themed design for a bold statement",
    image: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "modern",
    type: "resume"
  },
  {
    id: "colorful",
    name: "Colorful Accent",
    description: "Modern design with colorful accents",
    image: "https://images.unsplash.com/photo-1487695652027-48e475bfa86f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "creative",
    type: "resume"
  },
  {
    id: "simple-elegant",
    name: "Simple Elegant",
    description: "Minimalist design with elegant typography",
    image: "https://images.unsplash.com/photo-1561214078-f3247647fc5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "simple",
    type: "resume"
  },
  
  // Premium CV templates
  {
    id: "cv-academic",
    name: "Academic CV",
    description: "Comprehensive CV layout for academic professionals",
    image: "https://images.unsplash.com/photo-1567168544646-208fa5d408fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "professional",
    type: "cv"
  },
  {
    id: "cv-research",
    name: "Research CV",
    description: "Detailed CV design for research and scientific positions",
    image: "https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "professional",
    type: "cv"
  },
  {
    id: "cv-medical",
    name: "Medical CV",
    description: "Specialized CV for healthcare professionals",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "healthcare",
    type: "cv"
  },
  
  // More Resume templates
  {
    id: "architect",
    name: "Architect",
    description: "Structured layout for architecture and design professions",
    image: "https://images.unsplash.com/photo-1594051673969-172a6f327952?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "design",
    type: "resume"
  },
  {
    id: "two-column",
    name: "Two Column Pro",
    description: "Two-column layout for easy scanning of information",
    image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "professional",
    type: "resume"
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Clean layout optimized for data and analytics roles",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "tech",
    type: "resume"
  },
  {
    id: "infographic",
    name: "Infographic Resume",
    description: "Visual resume with infographic elements",
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "creative",
    type: "resume"
  },
  {
    id: "graduate",
    name: "Graduate",
    description: "Ideal for recent graduates with limited experience",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "simple",
    type: "resume"
  },
  {
    id: "consulting",
    name: "Consulting Pro",
    description: "Professional design for consultants and advisors",
    image: "https://images.unsplash.com/photo-1553484771-689277e6fa16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "professional",
    type: "resume"
  },
  {
    id: "engineering",
    name: "Engineering Specialist",
    description: "Technical layout for engineering professionals",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "tech",
    type: "resume"
  },
  
  // Additional CV templates
  {
    id: "cv-doctoral",
    name: "Doctoral CV",
    description: "Comprehensive CV for PhD holders and doctoral candidates",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "professional",
    type: "cv"
  },
  {
    id: "cv-legal",
    name: "Legal CV",
    description: "Structured CV for legal professionals",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=750&q=80",
    isPremium: true,
    category: "professional",
    type: "cv"
  }
];

export default templates;
