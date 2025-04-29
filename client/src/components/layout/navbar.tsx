import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <Link href="/">
            <span className="text-xl font-bold cursor-pointer">ResumeBuilder</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features">
            <span className={`font-medium ${location === '/features' ? 'text-primary' : 'text-neutral-500 hover:text-primary'} transition-colors cursor-pointer`}>
              Features
            </span>
          </Link>
          <Link href="/templates">
            <span className={`font-medium ${location === '/templates' ? 'text-primary' : 'text-neutral-500 hover:text-primary'} transition-colors cursor-pointer`}>
              Templates
            </span>
          </Link>
          <Link href="/pricing">
            <span className={`font-medium ${location === '/pricing' ? 'text-primary' : 'text-neutral-500 hover:text-primary'} transition-colors cursor-pointer`}>
              Pricing
            </span>
          </Link>
          <Link href="/guides">
            <span className={`font-medium ${location === '/guides' ? 'text-primary' : 'text-neutral-500 hover:text-primary'} transition-colors cursor-pointer`}>
              Guides
            </span>
          </Link>
          <Link href="/blog">
            <span className={`font-medium ${location === '/blog' ? 'text-primary' : 'text-neutral-500 hover:text-primary'} transition-colors cursor-pointer`}>
              Blog
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button 
                  variant="outline" 
                  className="hidden md:inline-flex border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/builder">
                <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">
                  Create Resume
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth">
                <Button 
                  variant="outline" 
                  className="hidden md:inline-flex border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Sign in
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">
                  Create Resume
                </Button>
              </Link>
            </>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-neutral-500" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-500" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/features">
              <span 
                className="font-medium text-neutral-500 hover:text-primary py-2 block cursor-pointer"
                onClick={closeMenu}
              >
                Features
              </span>
            </Link>
            <Link href="/templates">
              <span 
                className="font-medium text-neutral-500 hover:text-primary py-2 block cursor-pointer"
                onClick={closeMenu}
              >
                Templates
              </span>
            </Link>
            <Link href="/pricing">
              <span 
                className="font-medium text-neutral-500 hover:text-primary py-2 block cursor-pointer"
                onClick={closeMenu}
              >
                Pricing
              </span>
            </Link>
            <Link href="/guides">
              <span 
                className="font-medium text-neutral-500 hover:text-primary py-2 block cursor-pointer"
                onClick={closeMenu}
              >
                Guides
              </span>
            </Link>
            <Link href="/blog">
              <span 
                className="font-medium text-neutral-500 hover:text-primary py-2 block cursor-pointer"
                onClick={closeMenu}
              >
                Blog
              </span>
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard">
                  <span 
                    className="font-medium text-neutral-500 hover:text-primary py-2 block cursor-pointer"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </span>
                </Link>
                <Link href="/builder">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                    onClick={closeMenu}
                  >
                    Create Resume
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 mt-2"
                    onClick={closeMenu}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-2"
                    onClick={closeMenu}
                  >
                    Create Resume
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
