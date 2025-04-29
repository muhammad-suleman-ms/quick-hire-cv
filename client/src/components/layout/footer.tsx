import { Link } from "wouter";
import { FileText } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-xl font-bold">ResumeBuilder</h3>
            </div>
            <p className="text-neutral-300 mb-4">Creating professional resumes to help you land your dream job.</p>
            <div className="flex gap-4">
              <button className="text-neutral-300 hover:text-white transition-colors">
                <FaTwitter size={18} />
              </button>
              <button className="text-neutral-300 hover:text-white transition-colors">
                <FaFacebook size={18} />
              </button>
              <button className="text-neutral-300 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </button>
              <button className="text-neutral-300 hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mt-6 sm:mt-0">
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/builder">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link href="/templates">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Templates</span>
                </Link>
              </li>
              <li>
                <Link href="/cover-letters">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Cover Letters</span>
                </Link>
              </li>
              <li>
                <Link href="/ai-suggestions">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">AI Suggestions</span>
                </Link>
              </li>
              <li>
                <Link href="/ats-optimization">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">ATS Optimization</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resume-examples">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Resume Examples</span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Career Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/job-search-tips">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Job Search Tips</span>
                </Link>
              </li>
              <li>
                <Link href="/interview-guides">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Interview Guides</span>
                </Link>
              </li>
              <li>
                <Link href="/career-resources">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Career Resources</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div className="mt-6 md:mt-0">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Pricing</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Contact Us</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <span className="text-neutral-300 hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
