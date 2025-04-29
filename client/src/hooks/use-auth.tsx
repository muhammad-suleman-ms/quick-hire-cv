import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (credentials: SignInCredentials) => Promise<User>;
  signUp: (credentials: SignUpCredentials) => Promise<User>;
  signOut: () => Promise<void>;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpCredentials {
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/me"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/me");
        if (res.status === 401) {
          return null;
        }
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return await res.json();
      } catch (error) {
        console.error("Error fetching user:", error);
        return null;
      }
    },
  });

  const signInMutation = useMutation({
    mutationFn: async (credentials: SignInCredentials) => {
      const res = await apiRequest("POST", "/api/signin", credentials);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to sign in");
      }
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/me"], user);
      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${user.username}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (credentials: SignUpCredentials) => {
      const res = await apiRequest("POST", "/api/signup", credentials);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to sign up");
      }
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/me"], user);
      toast({
        title: "Signed up successfully",
        description: `Welcome, ${user.username}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/signout");
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to sign out");
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/me"], null);
      queryClient.invalidateQueries({
        queryKey: ["/api/subscription"],
      });
      toast({
        title: "Signed out successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const signIn = async (credentials: SignInCredentials) => {
    return await signInMutation.mutateAsync(credentials);
  };

  const signUp = async (credentials: SignUpCredentials) => {
    return await signUpMutation.mutateAsync(credentials);
  };

  const signOut = async () => {
    await signOutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error: error || null,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}