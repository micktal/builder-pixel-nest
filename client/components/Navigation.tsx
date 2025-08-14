import { Button } from "@/components/ui/button";
import { BookOpen, Menu, Search, User } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ArticuLearn</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </a>
            <a href="/courses" className="text-gray-700 hover:text-primary transition-colors">
              Courses
            </a>
            <a href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </a>
            <a href="/pricing" className="text-gray-700 hover:text-primary transition-colors">
              Pricing
            </a>
          </div>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <a
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="/courses"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Courses
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="/pricing"
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
              >
                Pricing
              </a>
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
