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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const signinSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type SigninValues = z.infer<typeof signinSchema>;

export default function SignIn() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SigninValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninValues) {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/signin", values);
      toast({
        title: "Signed in successfully",
        description: "Welcome back to ResumeBuilder!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in failed:", error);
      toast({
        title: "Sign in failed",
        description: "Please check your username and password.",
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
          <h1 className="text-2xl font-bold">Sign in to ResumeCV</h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Email" 
                        type="text" 
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-right">
                <a href="#" className="text-secondary hover:underline">
                  Forgot your password?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-secondary hover:bg-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-500">Already have an account?</span>{" "}
            <Link href="/signup" className="text-secondary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
