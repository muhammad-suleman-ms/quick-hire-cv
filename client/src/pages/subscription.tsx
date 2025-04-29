import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid recreating the `Stripe` object on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

function CheckoutForm() {
  const [, navigate] = useLocation();
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/dashboard",
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for subscribing to our premium plan!",
      });
      navigate("/dashboard");
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />
      <Button 
        type="submit" 
        className="w-full bg-secondary hover:bg-secondary/90"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Subscribe Now"}
      </Button>
    </form>
  );
}

export default function Subscription() {
  const [clientSecret, setClientSecret] = useState("");
  const { toast } = useToast();
  
  const { data: user, isLoading: userLoading } = useQuery<{ username: string } | null>({
    queryKey: ["/api/me"],
  });
  
  const { data: subscription, isLoading: subscriptionLoading } = useQuery<{ isPremium: boolean, expiresAt?: string }>({
    queryKey: ["/api/subscription"],
    enabled: !!user,
  });
  
  // Fetch payment intent when component mounts
  useState(() => {
    if (!user) return;
    
    apiRequest("POST", "/api/create-payment-intent", { amount: 1995 }) // $19.95
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        toast({
          title: "Error",
          description: "There was a problem setting up the payment. Please try again.",
          variant: "destructive",
        });
      });
  });

  if (userLoading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            You need to be signed in to access premium features.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4 justify-center">
          <Link to="/signin">
            <Button variant="default">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline">Create Account</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // If user already has a premium subscription
  if (subscription?.isPremium) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">You're a Premium Member!</h1>
          <p className="text-neutral-600 mb-6">
            Thank you for being a premium subscriber. You have full access to all features.
            {subscription.expiresAt && (
              <span className="block mt-2">
                Your subscription is valid until {new Date(subscription.expiresAt).toLocaleDateString()}.
              </span>
            )}
          </p>
          <Button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
        <p className="text-neutral-600 mt-2">
          Get unlimited access to all premium templates and features
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-xl font-bold mb-4">Premium Benefits</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5" />
              <span>Access to all 15+ premium templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5" />
              <span>No watermarks on any templates</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5" />
              <span>Download your resume in multiple formats (PDF, DOCX, TXT)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5" />
              <span>Advanced AI-powered content suggestions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5" />
              <span>Priority customer support</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5" />
              <span>Unlimited resume versions and updates</span>
            </li>
          </ul>
          
          <div className="bg-neutral-50 p-6 rounded-lg mt-6">
            <h3 className="font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Subscribe today for just
            </h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">$19.95</span>
              <span className="text-neutral-500 ml-1">/month</span>
            </div>
            <p className="text-sm text-neutral-500 mt-2">
              Cancel anytime. No long-term commitment required.
            </p>
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Payment Details</h2>
              {clientSecret ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm />
                </Elements>
              ) : (
                <div className="flex justify-center p-8">
                  <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full"></div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
