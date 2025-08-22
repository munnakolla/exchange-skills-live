import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Users, 
  Star, 
  Calendar, 
  MessageSquare, 
  Plus,
  TrendingUp,
  Award
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { user, profile } = useAuth();

  const stats = [
    { icon: BookOpen, label: "Skills Learned", value: "12", color: "text-blue-600" },
    { icon: Users, label: "Skills Taught", value: "8", color: "text-green-600" },
    { icon: Star, label: "Average Rating", value: "4.9", color: "text-yellow-600" },
    { icon: Calendar, label: "Sessions This Month", value: "15", color: "text-purple-600" }
  ];

  const recentActivities = [
    {
      type: "session",
      title: "Guitar Lesson with Sarah",
      subtitle: "Completed 1 hour ago",
      icon: "🎸"
    },
    {
      type: "skill",
      title: "Added Python Programming",
      subtitle: "Added to teaching skills",
      icon: "🐍"
    },
    {
      type: "review",
      title: "Received 5-star review",
      subtitle: "From Mike for JavaScript tutoring",
      icon: "⭐"
    }
  ];

  const upcomingSessions = [
    {
      title: "Spanish Conversation",
      time: "Today at 3:00 PM",
      partner: "Maria Rodriguez",
      type: "Learning"
    },
    {
      title: "Web Development",
      time: "Tomorrow at 10:00 AM",
      partner: "Alex Kim",
      type: "Teaching"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 sm:pt-18 lg:pt-20 pb-12 sm:pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <Avatar className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
                <AvatarFallback className="text-base sm:text-lg lg:text-xl">
                  {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!</h1>
                <p className="text-muted-foreground text-sm sm:text-base">Ready to learn something new today?</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs sm:text-sm">JavaScript</Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm">Guitar</Badge>
              <Badge variant="secondary" className="text-xs sm:text-sm">Spanish</Badge>
              <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                <Link to="/profile">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${stat.color}`} />
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold">Upcoming Sessions</h2>
                  <Button variant="outline" size="sm" asChild className="self-start sm:self-auto">
                    <Link to="/sessions">
                      <Calendar className="h-4 w-4 mr-2" />
                      View All
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {upcomingSessions.map((session, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-muted rounded-lg gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{session.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{session.time}</p>
                        <p className="text-xs sm:text-sm truncate">with {session.partner}</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
                        <Badge variant={session.type === "Teaching" ? "default" : "secondary"} className="text-xs whitespace-nowrap">
                          {session.type}
                        </Badge>
                        <Button size="sm" variant="outline" asChild className="text-xs">
                          <Link to="/messages">
                            <MessageSquare className="h-4 w-4 mr-1 sm:mr-2" />
                            Chat
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-3 sm:mt-4" variant="hero" asChild>
                  <Link to="/skills">
                    <Plus className="h-4 w-4 mr-2" />
                    Find Skills to Learn
                  </Link>
                </Button>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Recent Activity</h2>
                
                <div className="space-y-3 sm:space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="text-xl sm:text-2xl">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base">{activity.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{activity.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 sm:mt-6 text-sm" asChild>
                  <Link to="/sessions">
                    View All Activity
                  </Link>
                </Button>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4 sm:p-6 mt-4 sm:mt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Actions</h3>
                <div className="space-y-2 sm:space-y-3">
                  <Button variant="outline" className="w-full justify-start text-sm" asChild>
                    <Link to="/find-partners">
                      <Users className="h-4 w-4 mr-2" />
                      Find Learning Partners
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" asChild>
                    <Link to="/browse-skills">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Browse Popular Skills
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm" asChild>
                    <Link to="/achievements">
                      <Award className="h-4 w-4 mr-2" />
                      View Achievements
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
