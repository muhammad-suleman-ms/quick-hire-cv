import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms of service and privacy policy",
  }),
});

type SignupValues = z.infer<typeof signupSchema>;

export default function SignUp() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      agreeToTerms: false,
    },
  });

  async function onSubmit(values: SignupValues) {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/signup", {
        username: values.email,
        password: values.password,
      });
      toast({
        title: "Account created successfully",
        description: "Welcome to ResumeBuilder!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign up failed:", error);
      toast({
        title: "Sign up failed",
        description: "This email might already be in use or there was a server error.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-neutral-50">
      <div className="flex flex-col justify-center w-full max-w-md mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Sign up for a free account</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Email" 
                        type="email" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Password" 
                        type="password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms of service and privacy policy.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90 mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-500">Already have an account?</span>{" "}
            <Link href="/signin" className="text-secondary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
