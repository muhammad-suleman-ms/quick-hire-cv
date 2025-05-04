import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import TemplateGalleryPage from "@/pages/template-gallery-page";
import ResumeBuilderPage from "@/pages/resume-builder-page";
import PricingPage from "@/pages/pricing-page";
import FeaturesPage from "@/pages/features-page";
import BlogPage from "@/pages/blog-page";
import GuidesPage from "@/pages/guides-page";
import AdminDashboardPage from "@/pages/admin/dashboard-page";
import AdminInfoPage from "@/pages/admin/info-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AdminProtectedRoute } from "./lib/admin-protected-route";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import { useEffect } from "react";
import { useAppDispatch } from "./store";
import { fetchUser } from "./store/slices/authSlice";
import { fetchTemplates } from "./store/slices/templateSlice";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/features" component={FeaturesPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/guides" component={GuidesPage} />
      <Route path="/info/admin" component={AdminInfoPage} />
      
      {/* Protected Routes - require authentication */}
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/templates" component={TemplateGalleryPage} />
      <ProtectedRoute path="/builder" component={ResumeBuilderPage} />
      <ProtectedRoute path="/builder/:id" component={ResumeBuilderPage} />
      
      {/* Admin Routes - require admin privileges */}
      <AdminProtectedRoute path="/admin" component={AdminDashboardPage} />
      <AdminProtectedRoute path="/admin/dashboard" component={AdminDashboardPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const dispatch = useAppDispatch();

  // Initialize global app data
  useEffect(() => {
    // Fetch user data on app load
    dispatch(fetchUser());
    
    // Fetch templates data
    dispatch(fetchTemplates());
  }, [dispatch]);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
