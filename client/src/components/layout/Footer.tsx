import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white">ResumeBuilder</h3>
            <p className="mt-4 text-neutral-400">
              Create professional, ATS-friendly resumes that help you land your dream job.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#features" className="text-neutral-400 hover:text-white">Features</a>
              </li>
              <li>
                <Link href="/templates" className="text-neutral-400 hover:text-white">Templates</Link>
              </li>
              <li>
                <a href="#pricing" className="text-neutral-400 hover:text-white">Pricing</a>
              </li>
              <li>
                <a href="#examples" className="text-neutral-400 hover:text-white">Examples</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#blog" className="text-neutral-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#tips" className="text-neutral-400 hover:text-white">Resume Tips</a>
              </li>
              <li>
                <a href="#advice" className="text-neutral-400 hover:text-white">Career Advice</a>
              </li>
              <li>
                <a href="#help" className="text-neutral-400 hover:text-white">Help Center</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#about" className="text-neutral-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#privacy" className="text-neutral-400 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="text-neutral-400 hover:text-white">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-700 pt-8">
          <p className="text-neutral-400 text-sm text-center">
            &copy; {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
