import { useState } from "react";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setIsSubmitting(true);
    try {
      // In a real application, this would send a request to your backend
      // For demo purposes, we'll just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, we'll always show success
      setIsSuccess(true);
      toast({
        title: "Reset link sent",
        description: "If an account exists with that email, you will receive a password reset link.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
          <CardDescription>
            Enter your email address below and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSuccess ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col items-center py-4 text-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Check your email</h3>
              <p className="text-muted-foreground mb-4">
                We've sent a password reset link to your email address.
              </p>
              <Button variant="outline" onClick={() => form.reset()} className="w-full">
                Send again
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full text-center">
            <Link to="/signin" className="inline-flex items-center text-sm text-primary hover:text-primary/80">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}