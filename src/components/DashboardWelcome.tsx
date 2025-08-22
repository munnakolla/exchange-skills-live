import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Search, Users, BookOpen, Calendar, MessageSquare, TrendingUp, Clock, Star, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DashboardWelcome = () => {
  const { user, profile } = useAuth();

  // Recent activities mock data
  const recentActivities = [
    {
      id: 1,
      type: 'session',
      title: 'JavaScript Fundamentals with Sarah',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'message',
      title: 'New message from Mike about Guitar lessons',
      time: '4 hours ago',
      status: 'unread'
    },
    {
      id: 3,
      type: 'match',
      title: 'Found 3 new partners for Python learning',
      time: '1 day ago',
      status: 'new'
    }
  ];

  return (
    <div className="container mx-auto px-4 pt-20 pb-8 space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Welcome back, {profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ready to continue your learning journey? Here's what you can do today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 text-center">
          <div className="space-y-2">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-sm text-muted-foreground">Skills Learning</p>
          </div>
        </Card>
        <Card className="p-6 text-center">
          <div className="space-y-2">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto" />
            <h3 className="text-2xl font-bold">8</h3>
            <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
          </div>
        </Card>
        <Card className="p-6 text-center">
          <div className="space-y-2">
            <Users className="h-8 w-8 text-purple-600 mx-auto" />
            <h3 className="text-2xl font-bold">24</h3>
            <p className="text-sm text-muted-foreground">Learning Partners</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Completed JavaScript session with Sarah</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">New learning partner request from Mike</p>
              <p className="text-sm text-muted-foreground">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Scheduled Guitar lesson for tomorrow</p>
              <p className="text-sm text-muted-foreground">2 days ago</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-semibold">Ready to learn something new?</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/find-partners">
              <Search className="h-5 w-5 mr-2" />
              Find Learning Partners
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/my-skills">
              <BookOpen className="h-5 w-5 mr-2" />
              Manage My Skills
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardWelcome;
