import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import VideoCallModal from '../components/VideoCallModal';
import { useVideoSession } from '../hooks/use-video-session';
import { 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  Plus, 
  Search,
  MapPin,
  MessageCircle,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Header from '../components/Header';

interface Session {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  teacher_id: string;
  learner_id: string;
  skill_name: string;
  other_user_name: string;
  other_user_avatar?: string;
  is_teacher: boolean;
}

export default function Sessions() {
  const { user, supabase } = useAuth();
  const { toast } = useToast();
  const { startVideoSession, isModalOpen, currentSession, closeModal } = useVideoSession();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadSessions = async () => {
    if (!user || !supabase) return;

    try {
      const { data, error } = await supabase
        .from('sessions')
        .select(`
          *,
          skills (name),
          teacher:profiles!sessions_teacher_id_fkey (full_name, avatar_url),
          learner:profiles!sessions_learner_id_fkey (full_name, avatar_url)
        `)
        .or(`teacher_id.eq.${user.id},learner_id.eq.${user.id}`)
        .order('scheduled_at', { ascending: false });

      if (error) throw error;

      const formattedSessions = data?.map(session => ({
        id: session.id,
        scheduled_at: session.scheduled_at,
        duration_minutes: session.duration_minutes,
        status: session.status,
        notes: session.notes,
        teacher_id: session.teacher_id,
        learner_id: session.learner_id,
        skill_name: session.skills?.name || 'Unknown Skill',
        other_user_name: session.teacher_id === user.id 
          ? session.learner?.full_name || 'Unknown User'
          : session.teacher?.full_name || 'Unknown User',
        other_user_avatar: session.teacher_id === user.id
          ? session.learner?.avatar_url
          : session.teacher?.avatar_url,
        is_teacher: session.teacher_id === user.id
      })) || [];

      setSessions(formattedSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load sessions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSessionStatus = async (sessionId: string, status: 'completed' | 'cancelled') => {
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('sessions')
        .update({ status })
        .eq('id', sessionId);

      if (error) throw error;

      loadSessions();
      toast({
        title: 'Success',
        description: `Session ${status} successfully`,
      });
    } catch (error) {
      console.error('Error updating session:', error);
      toast({
        title: 'Error',
        description: 'Failed to update session',
        variant: 'destructive',
      });
    }
  };

  const handleJoinVideoSession = (session: Session) => {
    const participantId = session.is_teacher ? session.learner_id : session.teacher_id;
    
    startVideoSession({
      participantId: participantId,
      participantName: session.other_user_name,
      participantAvatar: session.other_user_avatar,
      sessionTitle: `${session.skill_name} Learning Session`,
      sessionId: session.id,
      sessionType: 'learning'
    });
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.skill_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.other_user_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p>Please sign in to view your sessions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="h-8 w-8" />
          <h1 className="text-3xl font-bold">My Sessions</h1>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filter Sessions</CardTitle>
            <CardDescription>Find and manage your skill exchange sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Schedule New Session
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sessions List */}
        {loading ? (
          <div className="grid gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Calendar className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No sessions found</h3>
              <p className="text-gray-600 text-center max-w-md">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your filters to find more sessions.'
                  : 'You haven\'t scheduled any sessions yet. Start by browsing skills and connecting with other users!'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredSessions.map((session) => (
              <Card key={session.id} className={`${isUpcoming(session.scheduled_at) ? 'ring-2 ring-blue-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.other_user_avatar} alt={session.other_user_name} />
                        <AvatarFallback>
                          {session.other_user_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* Session Details */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{session.skill_name}</h3>
                          <Badge className={getStatusColor(session.status)}>
                            {getStatusIcon(session.status)}
                            <span className="ml-1">{session.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>
                              {session.is_teacher ? 'Teaching' : 'Learning from'} {session.other_user_name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{formatDateTime(session.scheduled_at)} ({session.duration_minutes} min)</span>
                          </div>
                          {session.notes && (
                            <div className="flex items-start gap-2 mt-2">
                              <BookOpen className="h-4 w-4 mt-0.5" />
                              <span className="text-sm">{session.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-4">
                      {session.status === 'scheduled' && isUpcoming(session.scheduled_at) && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800"
                            onClick={() => handleJoinVideoSession(session)}
                          >
                            <Video className="h-4 w-4" />
                            Join Video Session
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            Chat
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => updateSessionStatus(session.id, 'completed')}
                          >
                            Mark Complete
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => updateSessionStatus(session.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                      {session.status === 'completed' && (
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          Leave Review
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Video Call Modal */}
      {currentSession && (
        <VideoCallModal
          isOpen={isModalOpen}
          onClose={closeModal}
          participantName={currentSession.config.participantName}
          participantAvatar={currentSession.config.participantAvatar}
          sessionTitle={currentSession.config.sessionTitle}
        />
      )}
    </div>
  );
}
