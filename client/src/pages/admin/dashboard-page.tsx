import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Redirect } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { Loader2, Users, FileText, Download, Award, ArrowDown } from "lucide-react";

type AnalyticsData = {
  id: number;
  date: string;
  visits: number;
  signups: number;
  resumesCreated: number;
  subscriptionsPurchased: number;
  subscriptionsCanceled: number;
  totalActiveUsers: number;
  totalPremiumUsers: number;
}

type UserStats = {
  totalUsers: number;
  premiumUsers: number;
  activeUsersLast30Days: number;
}

type ResumeStats = {
  totalResumes: number;
  totalDownloads: number;
  popularTemplates: { templateId: string; count: number }[];
}

type DashboardData = {
  dailyData: AnalyticsData[];
  userStats: UserStats;
  resumeStats: ResumeStats;
}

type ActivityLog = {
  id: number;
  userId: number | null;
  action: string;
  details: any;
  ipAddress: string | null;
  userAgent: string | null;
  timestamp: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

export default function AdminDashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [timeRange, setTimeRange] = useState<number>(30);

  // Fetch analytics data
  const { data: dashboardData, isLoading: isAnalyticsLoading } = useQuery<DashboardData>({
    queryKey: ['/api/admin/analytics', timeRange],
    queryFn: async () => {
      const res = await fetch(`/api/admin/analytics?days=${timeRange}`);
      if (!res.ok) throw new Error('Failed to fetch analytics data');
      return res.json();
    },
    enabled: !!user && user.role === 'admin'
  });

  // Fetch recent activity logs
  const { data: activityLogs, isLoading: isActivityLoading } = useQuery<ActivityLog[]>({
    queryKey: ['/api/admin/activity'],
    queryFn: async () => {
      const res = await fetch('/api/admin/activity?limit=50');
      if (!res.ok) throw new Error('Failed to fetch activity logs');
      return res.json();
    },
    enabled: !!user && user.role === 'admin'
  });

  // Fetch all users
  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ['/api/admin/users'],
    queryFn: async () => {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
    enabled: !!user && user.role === 'admin'
  });

  // If loading auth state, show loading
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not logged in or not an admin, redirect to login
  if (!user || user.role !== 'admin') {
    return <Redirect to="/auth" />;
  }

  // Format data for charts
  const formatDailyData = () => {
    if (!dashboardData?.dailyData) return [];
    
    return dashboardData.dailyData.map(day => ({
      ...day,
      date: new Date(day.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
    }));
  };

  const formatTemplateData = () => {
    if (!dashboardData?.resumeStats?.popularTemplates) return [];
    
    return dashboardData.resumeStats.popularTemplates.map(template => ({
      name: template.templateId,
      value: template.count
    }));
  };

  const isLoading = isAnalyticsLoading || isActivityLoading || isUsersLoading;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 flex flex-wrap overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="resumes">Resumes</TabsTrigger>
            <TabsTrigger value="activity">Activity Logs</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {/* Stats Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{dashboardData?.userStats.totalUsers || 0}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Premium Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{dashboardData?.userStats.premiumUsers || 0}</div>
                    <div className="text-xs text-muted-foreground ml-2">
                      ({Math.round((dashboardData?.userStats.premiumUsers / dashboardData?.userStats.totalUsers) * 100) || 0}%)
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Resumes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{dashboardData?.resumeStats.totalResumes || 0}</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{dashboardData?.resumeStats.totalDownloads || 0}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Site Visits Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Site Visits</CardTitle>
                  <CardDescription>Daily visits over the past {timeRange} days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={formatDailyData()}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#0088FE" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Signups & Resumes Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Signups and resumes created</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={formatDailyData()}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="signups" fill="#8884d8" name="New Signups" />
                        <Bar dataKey="resumesCreated" fill="#82ca9d" name="Resumes Created" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Premium Subscription Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Premium Subscriptions</CardTitle>
                  <CardDescription>Subscriptions purchased and canceled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={formatDailyData()}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="subscriptionsPurchased" stroke="#82ca9d" name="Purchased" />
                        <Line type="monotone" dataKey="subscriptionsCanceled" stroke="#ff8042" name="Canceled" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Templates Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Templates</CardTitle>
                  <CardDescription>Most used resume templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={formatTemplateData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {formatTemplateData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Username
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subscription
                        </th>
                        <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users && users.map((user: any) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-[150px]">{user.email}</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.subscriptionStatus === 'premium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.subscriptionStatus}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Resumes Tab */}
          <TabsContent value="resumes">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Statistics</CardTitle>
                  <CardDescription>Overview of resume creation and usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Total Resumes</span>
                      <span>{dashboardData?.resumeStats.totalResumes || 0}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Total Downloads</span>
                      <span>{dashboardData?.resumeStats.totalDownloads || 0}</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">Avg. Resumes per User</span>
                      <span>
                        {dashboardData?.userStats.totalUsers ? 
                          (dashboardData.resumeStats.totalResumes / dashboardData.userStats.totalUsers).toFixed(1) : 
                          '0'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Templates</CardTitle>
                  <CardDescription>Most used resume templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {dashboardData?.resumeStats.popularTemplates?.map((template, index) => (
                      <div key={template.templateId} className="flex items-center">
                        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm">{template.templateId}</span>
                          <span className="text-sm font-medium">{template.count} uses</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Activity Logs Tab */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions performed on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User ID
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          IP Address
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                      {activityLogs && activityLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                            {log.userId || 'Anonymous'}
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              log.action.includes('login') ? 'bg-green-100 text-green-800' : 
                              log.action.includes('logout') ? 'bg-yellow-100 text-yellow-800' :
                              log.action.includes('register') ? 'bg-blue-100 text-blue-800' :
                              log.action.includes('premium') ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-gray-500 text-xs sm:text-sm truncate max-w-[150px]">
                            {log.details ? JSON.stringify(log.details) : 'N/A'}
                          </td>
                          <td className="px-3 sm:px-4 py-3 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                            {log.ipAddress || 'Unknown'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}