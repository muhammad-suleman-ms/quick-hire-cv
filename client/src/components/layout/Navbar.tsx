import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Function for smooth scrolling
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else if (window.location.pathname !== '/') {
    // If not on homepage, navigate to homepage and then scroll
    window.location.href = `/#${sectionId}`;
  }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  const { data: user } = useQuery<{ username: string } | null>({
    queryKey: ["/api/me"],
    staleTime: 60000, // 1 minute
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await apiRequest("POST", "/api/signout", {});
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">ResumeBuilder</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`px-1 pt-1 font-medium ${isActive("/") ? "border-b-2 border-secondary text-primary" : "border-transparent text-neutral-500 hover:text-primary hover:border-neutral-300"}`}>
                Home
              </Link>
              <Link to="/templates" className={`px-1 pt-1 font-medium ${isActive("/templates") ? "border-b-2 border-secondary text-primary" : "border-transparent text-neutral-500 hover:text-primary hover:border-neutral-300"}`}>
                Templates
              </Link>
              <button 
                onClick={() => scrollToSection('features')} 
                className="border-transparent text-neutral-500 hover:text-primary hover:border-neutral-300 px-1 pt-1 font-medium cursor-pointer"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="border-transparent text-neutral-500 hover:text-primary hover:border-neutral-300 px-1 pt-1 font-medium cursor-pointer"
              >
                Pricing
              </button>
              <Link 
                to="/blog" 
                className="border-transparent text-neutral-500 hover:text-primary hover:border-neutral-300 px-1 pt-1 font-medium"
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-neutral-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Button variant="ghost" onClick={handleSignOut} className="text-neutral-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Sign Out
                </Button>
                <Link to="/create-resume">
                  <Button className="bg-secondary text-white hover:bg-secondary/90 px-4 py-2 rounded-md text-sm font-medium">
                    Create Resume
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-neutral-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
                <Link to="/create-resume">
                  <Button className="bg-secondary text-white hover:bg-secondary/90 px-4 py-2 rounded-md text-sm font-medium">
                    Create Resume
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="text-neutral-500 hover:text-primary p-2 rounded-md"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/" className={`block pl-3 pr-4 py-2 font-medium ${isActive("/") ? "bg-neutral-50 text-primary" : "text-neutral-500 hover:bg-neutral-50 hover:text-primary"}`}>
            Home
          </Link>
          <Link to="/templates" className={`block pl-3 pr-4 py-2 font-medium ${isActive("/templates") ? "bg-neutral-50 text-primary" : "text-neutral-500 hover:bg-neutral-50 hover:text-primary"}`}>
            Templates
          </Link>
          <button 
            onClick={() => {
              scrollToSection('features');
              setMobileMenuOpen(false);
            }} 
            className="text-neutral-500 hover:bg-neutral-50 hover:text-primary block w-full text-left pl-3 pr-4 py-2 font-medium"
          >
            Features
          </button>
          <button 
            onClick={() => {
              scrollToSection('pricing');
              setMobileMenuOpen(false);
            }}
            className="text-neutral-500 hover:bg-neutral-50 hover:text-primary block w-full text-left pl-3 pr-4 py-2 font-medium"
          >
            Pricing
          </button>
          <Link 
            to="/blog"
            onClick={() => setMobileMenuOpen(false)} 
            className="text-neutral-500 hover:bg-neutral-50 hover:text-primary block pl-3 pr-4 py-2 font-medium"
          >
            Blog
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-neutral-200">
          {user ? (
            <>
              <div className="flex items-center px-4">
                <Link to="/dashboard" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
                  Dashboard
                </Link>
              </div>
              <div className="mt-3 px-4">
                <Button onClick={handleSignOut} className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center px-4">
              <Link to="/signin" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50">
                Sign in
              </Link>
            </div>
          )}
          <div className="mt-3 px-4">
            <Link to="/create-resume" className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary/90">
              Create Resume
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
