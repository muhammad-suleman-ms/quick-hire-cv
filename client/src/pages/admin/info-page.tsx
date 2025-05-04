import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { Shield, Key, User, LockIcon, Settings, Server, Database, ArrowRight } from "lucide-react";

export default function AdminInfoPage() {
  const [, navigate] = useLocation();

  // Dummy admin credentials - these would normally come from environment variables
  const adminCredentials = {
    username: "admin",
    password: "admin123", // This would be a complex password in production
    email: "admin@resumebuilder.com"
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto border-purple-200">
        <CardHeader className="text-center bg-purple-50">
          <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-purple-700" />
          </div>
          <CardTitle className="text-3xl">Admin Access Portal</CardTitle>
          <CardDescription className="text-lg mt-2">
            Secure management dashboard for ResumeBuilder administrators
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 space-y-6">
          <p className="text-center text-muted-foreground mb-6">
            This portal provides access to the administrative features of the ResumeBuilder platform, 
            including user management, analytics, and system configuration.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <h3 className="font-medium flex items-center text-yellow-800 mb-2">
              <Key className="h-4 w-4 mr-2" />
              Demo Admin Credentials
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-yellow-700">Username:</span>
                <code className="bg-yellow-100 px-2 py-1 rounded">{adminCredentials.username}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-700">Password:</span>
                <code className="bg-yellow-100 px-2 py-1 rounded">{adminCredentials.password}</code>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-700">Email:</span>
                <code className="bg-yellow-100 px-2 py-1 rounded">{adminCredentials.email}</code>
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">
              Note: These are for demonstration purposes only. In a production environment, 
              secure credentials would be provided separately.
            </p>
          </div>
          
          <h3 className="font-bold text-lg mb-3">Administrative Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">User Management</h4>
                <p className="text-sm text-muted-foreground">View and manage user accounts, permissions, and subscription status.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <LockIcon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">Security Controls</h4>
                <p className="text-sm text-muted-foreground">Manage security settings, access logs, and authentication policies.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <Settings className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">System Configuration</h4>
                <p className="text-sm text-muted-foreground">Configure application settings, templates, and features.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                <Database className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">Data Management</h4>
                <p className="text-sm text-muted-foreground">Manage database records, backups, and perform maintenance tasks.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
            <h3 className="font-medium flex items-center text-blue-800 mb-2">
              <Server className="h-4 w-4 mr-2" />
              Environment Configuration
            </h3>
            <p className="text-sm text-blue-700">
              The admin portal utilizes environment variables for security configuration. In production, 
              these would be securely stored and not accessible in the application code.
            </p>
            <pre className="bg-blue-100 p-2 rounded mt-2 text-xs overflow-x-auto">
              <code>
{`# Admin credentials
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@resumebuilder.com
ADMIN_PASSWORD=complex_secure_password

# JWT configuration
JWT_SECRET=secure_jwt_secret_key
JWT_EXPIRY=8h

# Database access
DB_ADMIN_PASSWORD=database_admin_password`}
              </code>
            </pre>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col md:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={() => navigate("/")}>
            Return to Homepage
          </Button>
          <Link href="/auth">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Go to Admin Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}