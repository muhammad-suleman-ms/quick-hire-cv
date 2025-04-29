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
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/create-resume" component={CreateResume} />
          <Route path="/edit-resume/:id" component={EditResume} />
          <Route path="/view-resume/:id" component={ViewResume} />
          <Route path="/subscription" component={Subscription} />
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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
