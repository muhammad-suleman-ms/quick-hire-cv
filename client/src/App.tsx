import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/home";
import Templates from "@/pages/templates";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import Dashboard from "@/pages/dashboard";
import CreateResume from "@/pages/create-resume";
import EditResume from "@/pages/edit-resume";
import ViewResume from "@/pages/view-resume";
import Subscription from "@/pages/subscription";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/auth/protected-route";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/templates" component={Templates} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <ProtectedRoute path="/dashboard">
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path="/create-resume">
            <CreateResume />
          </ProtectedRoute>
          <ProtectedRoute path="/edit-resume/:id">
            <EditResume />
          </ProtectedRoute>
          <ProtectedRoute path="/view-resume/:id">
            <ViewResume />
          </ProtectedRoute>
          <ProtectedRoute path="/subscription">
            <Subscription />
          </ProtectedRoute>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
