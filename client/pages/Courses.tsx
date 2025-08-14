import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Courses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Course Catalog</h1>
          <p className="text-xl text-gray-600 mb-8">
            This page is coming soon! We're building an amazing course catalog with advanced filtering, 
            search capabilities, and detailed course information.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features in Development:</h2>
            <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
              <li>• Advanced course filtering by category, level, and duration</li>
              <li>• Smart search with AI-powered recommendations</li>
              <li>• Interactive course previews and demos</li>
              <li>• Student reviews and ratings</li>
              <li>• Wishlist and enrollment tracking</li>
            </ul>
          </div>
          <div className="mt-8">
            <Button asChild>
              <a href="/">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
