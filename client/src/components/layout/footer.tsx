import { Link } from "wouter";
import { FileText } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary-light text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/builder">
                  <a className="text-neutral-300 hover:text-white transition-colors">Resume Builder</a>
                </Link>
              </li>
              <li>
                <Link href="/templates">
                  <a className="text-neutral-300 hover:text-white transition-colors">Templates</a>
                </Link>
              </li>
              <li>
                <Link href="/cover-letters">
                  <a className="text-neutral-300 hover:text-white transition-colors">Cover Letters</a>
                </Link>
              </li>
              <li>
                <Link href="/ai-suggestions">
                  <a className="text-neutral-300 hover:text-white transition-colors">AI Suggestions</a>
                </Link>
              </li>
              <li>
                <Link href="/ats-optimization">
                  <a className="text-neutral-300 hover:text-white transition-colors">ATS Optimization</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resume-examples">
                  <a className="text-neutral-300 hover:text-white transition-colors">Resume Examples</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-neutral-300 hover:text-white transition-colors">Career Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/job-search-tips">
                  <a className="text-neutral-300 hover:text-white transition-colors">Job Search Tips</a>
                </Link>
              </li>
              <li>
                <Link href="/interview-guides">
                  <a className="text-neutral-300 hover:text-white transition-colors">Interview Guides</a>
                </Link>
              </li>
              <li>
                <Link href="/career-resources">
                  <a className="text-neutral-300 hover:text-white transition-colors">Career Resources</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <a className="text-neutral-300 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a className="text-neutral-300 hover:text-white transition-colors">Pricing</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-neutral-300 hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy">
                  <a className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-neutral-300 hover:text-white transition-colors">Terms of Service</a>
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
