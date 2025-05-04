import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, CrownIcon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { SubscriptionStatus } from "@shared/schema";
import { Link } from "wouter";

export default function PricingPage() {
  const { user } = useAuth();
  const isPremium = user?.subscriptionStatus === SubscriptionStatus.PREMIUM;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that's right for you and start building professional resumes today.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-2xl">Free</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground ml-1">/forever</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Create up to 3 resumes</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Access to basic templates</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>PDF download</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Basic formatting options</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {!user ? (
              <Link href="/auth">
                <Button className="w-full">Sign Up Free</Button>
              </Link>
            ) : (
              <Button disabled className="w-full">
                {isPremium ? "Current Plan: Premium" : "Current Plan"}
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="relative border-blue-200 shadow-lg">
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-md rounded-tr-md text-sm font-medium">
            RECOMMENDED
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <CrownIcon className="mr-2 h-6 w-6 text-amber-500" />
              Premium
            </CardTitle>
            <CardDescription>For serious job seekers</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="text-muted-foreground ml-1">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span><strong>Unlimited</strong> resumes</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Access to <strong>all premium templates</strong></span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>PDF, Word, and TXT downloads</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Advanced formatting options</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>AI content suggestions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Remove watermark</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            {!user ? (
              <Link href="/auth">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up for Premium</Button>
              </Link>
            ) : isPremium ? (
              <Button disabled className="w-full bg-green-600">
                Current Plan
              </Button>
            ) : (
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Upgrade to Premium
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6 text-left">
          <div>
            <h3 className="font-bold text-lg">Can I cancel my subscription anytime?</h3>
            <p className="text-muted-foreground">Yes, you can cancel your premium subscription at any time. You'll continue to have premium access until the end of your billing period.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">We accept all major credit cards including Visa, Mastercard, American Express, and Discover.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Is my data secure?</h3>
            <p className="text-muted-foreground">Absolutely. We use industry-standard encryption to protect your personal information and resume data.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">What happens to my resumes if I downgrade from Premium?</h3>
            <p className="text-muted-foreground">You'll still have access to all your created resumes, but you won't be able to create new ones beyond the free limit of 3 resumes.</p>
          </div>
        </div>
      </div>

      <div className="mt-16 py-10 px-6 bg-blue-50 rounded-lg max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
        <p className="text-lg text-muted-foreground mb-6">Our support team is here to help you make the right choice for your needs.</p>
        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
          Contact Support
        </Button>
      </div>
    </div>
  );
}