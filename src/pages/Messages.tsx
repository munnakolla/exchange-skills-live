import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import SkillSwapModal from '../components/SkillSwapModal';
import VideoCallModal from '../components/VideoCallModal';
import MeetupSchedulerModal from '../components/MeetupSchedulerModal';
import { useVideoSession } from '../hooks/use-video-session';
import { 
  MessageCircle, 
  Send, 
  Search,
  Plus,
  Clock,
  Check,
  RefreshCw,
  Video,
  MapPin,
  Calendar,
  Navigation,
  Coffee,
  BookOpen,
  Building,
  Trees,
  Home,
  Briefcase,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Users,
  X
} from 'lucide-react';
import Header from '../components/Header';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  read: boolean;
}

interface Conversation {
  user_id: string;
  user_name: string;
  user_avatar?: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  skill_offered: string;
  skill_wanted: string;
  chat_stage: 'initial' | 'discussing' | 'ready_to_swap' | 'swap_confirmed';
  scheduled_meetup?: {
    location: {
      name: string;
      address: string;
      city?: string;
      district?: string;
      state?: string;
      country?: string;
      type: string;
      latitude?: number;
      longitude?: number;
    };
    date: string;
    time: string;
    message?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  };
}

interface SkillPartner {
  id: string;
  name: string;
  avatar?: string;
  skills_offered: string[];
  skills_wanted: string[];
  location: string;
  rating: number;
  completed_sessions: number;
  bio?: string;
}

export default function Messages() {
  const { user, supabase } = useAuth();
  const { toast } = useToast();
  const { startVideoSession, isModalOpen, currentSession, closeModal } = useVideoSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isSkillSwapModalOpen, setIsSkillSwapModalOpen] = useState(false);
  const [isMeetupModalOpen, setIsMeetupModalOpen] = useState(false);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [availablePartners, setAvailablePartners] = useState<SkillPartner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [currentSwapDetails, setCurrentSwapDetails] = useState<{
    partnerName: string;
    partnerSkill: string;
    yourSkill: string;
    conversation: Conversation;
  } | null>(null);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadConversations = async () => {
    if (!user || !supabase) return;

    try {
      // For now, we'll create mock conversations since we don't have a messages table yet
      const mockConversations: Conversation[] = [
        {
          user_id: '1',
          user_name: 'Sarah Johnson',
          user_avatar: undefined,
          last_message: 'Looking forward to our guitar lesson!',
          last_message_time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          unread_count: 2,
          skill_offered: 'Guitar Lessons',
          skill_wanted: 'Photography',
          chat_stage: 'ready_to_swap',
          scheduled_meetup: {
            location: {
              name: 'Cafe Coffee Day',
              address: 'MG Road, Koramangala',
              city: 'Bangalore',
              district: 'Bangalore Urban',
              state: 'Karnataka',
              country: 'India',
              type: 'cafe',
              latitude: 12.9279,
              longitude: 77.6271
            },
            date: '2025-08-25',
            time: '14:00',
            message: 'Looking forward to our guitar lesson at this cozy cafe in Koramangala!',
            status: 'confirmed'
          }
        },
        {
          user_id: '2',
          user_name: 'Mike Chen',
          user_avatar: undefined,
          last_message: 'Thanks for the JavaScript tips!',
          last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          unread_count: 0,
          skill_offered: 'React Development',
          skill_wanted: 'UI/UX Design',
          chat_stage: 'discussing'
        },
        {
          user_id: '3',
          user_name: 'Emily Rodriguez',
          user_avatar: undefined,
          last_message: 'Can we reschedule our Spanish session?',
          last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          unread_count: 1,
          skill_offered: 'Spanish Language',
          skill_wanted: 'Cooking',
          chat_stage: 'swap_confirmed',
          scheduled_meetup: {
            location: {
              name: 'State Central Library',
              address: 'Cubbon Park, Kasturba Road',
              city: 'Bangalore',
              district: 'Bangalore Urban',
              state: 'Karnataka',
              country: 'India',
              type: 'library',
              latitude: 12.9762,
              longitude: 77.5993
            },
            date: '2025-08-22',
            time: '16:30',
            message: 'Perfect quiet place for our Spanish lesson in the heart of Bangalore!',
            status: 'pending'
          }
        },
        {
          user_id: '4',
          user_name: 'Alex Thompson',
          user_avatar: undefined,
          last_message: 'Hi! I\'m interested in learning Python from you.',
          last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
          unread_count: 1,
          skill_offered: 'Digital Marketing',
          skill_wanted: 'Python Programming',
          chat_stage: 'initial'
        },
        {
          user_id: '5',
          user_name: 'Lisa Park',
          user_avatar: undefined,
          last_message: 'Your yoga techniques sound amazing! When can we start?',
          last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
          unread_count: 0,
          skill_offered: 'Piano Lessons',
          skill_wanted: 'Yoga',
          chat_stage: 'discussing'
        }
      ];

      setConversations(mockConversations);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load conversations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (userId: string) => {
    if (!user || !supabase) return;

    // Mock messages for the selected conversation
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Hi! I saw you teach guitar. I\'m a beginner and would love to learn.',
        sender_id: userId,
        receiver_id: user.id,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: true
      },
      {
        id: '2',
        content: 'Hello! I\'d be happy to help you learn guitar. What style are you interested in?',
        sender_id: user.id,
        receiver_id: userId,
        created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        read: true
      },
      {
        id: '3',
        content: 'I\'m really interested in acoustic guitar and maybe some basic fingerpicking.',
        sender_id: userId,
        receiver_id: user.id,
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        read: true
      },
      {
        id: '4',
        content: 'Perfect! That\'s my specialty. Looking forward to our guitar lesson!',
        sender_id: userId,
        receiver_id: user.id,
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        read: false
      }
    ];

    setMessages(mockMessages);
  };

  const handleConversationSelect = (userId: string) => {
    setSelectedConversation(userId);
    loadMessages(userId);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    setSendingMessage(true);
    try {
      // Mock sending message
      const mockMessage: Message = {
        id: Date.now().toString(),
        content: newMessage,
        sender_id: user.id,
        receiver_id: selectedConversation,
        created_at: new Date().toISOString(),
        read: false
      };

      setMessages(prev => [...prev, mockMessage]);
      setNewMessage('');
      
      toast({
        title: 'Success',
        description: 'Message sent successfully',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const handleSkillSwapRequest = (conversation: Conversation) => {
    setCurrentSwapDetails({
      partnerName: conversation.user_name,
      partnerSkill: conversation.skill_offered,
      yourSkill: conversation.skill_wanted,
      conversation: conversation // Store the full conversation for callbacks
    });
    setIsSkillSwapModalOpen(true);
  };

  const loadAvailablePartners = async (query: string = '') => {
    setLoadingPartners(true);
    try {
      // Mock data for available skill partners
      const mockPartners: SkillPartner[] = [
        {
          id: '4',
          name: 'David Wilson',
          avatar: undefined,
          skills_offered: ['Photography', 'Photo Editing'],
          skills_wanted: ['Guitar', 'Music Theory'],
          location: 'Seattle, WA',
          rating: 4.8,
          completed_sessions: 15,
          bio: 'Professional photographer with 10+ years experience'
        },
        {
          id: '5',
          name: 'Lisa Zhang',
          avatar: undefined,
          skills_offered: ['Mandarin Chinese', 'Calligraphy'],
          skills_wanted: ['Web Development', 'React'],
          location: 'San Francisco, CA',
          rating: 4.9,
          completed_sessions: 23,
          bio: 'Native Mandarin speaker and art teacher'
        },
        {
          id: '6',
          name: 'Marcus Thompson',
          avatar: undefined,
          skills_offered: ['Basketball Coaching', 'Fitness Training'],
          skills_wanted: ['Cooking', 'Italian Language'],
          location: 'Los Angeles, CA',
          rating: 4.7,
          completed_sessions: 12,
          bio: 'Former college basketball player and certified trainer'
        },
        {
          id: '7',
          name: 'Elena Rossi',
          avatar: undefined,
          skills_offered: ['Italian Language', 'Wine Tasting'],
          skills_wanted: ['Digital Marketing', 'Social Media'],
          location: 'New York, NY',
          rating: 4.9,
          completed_sessions: 31,
          bio: 'Native Italian speaker living in NYC for 5 years'
        },
        {
          id: '8',
          name: 'Ahmed Hassan',
          avatar: undefined,
          skills_offered: ['Arabic Language', 'Middle Eastern Cooking'],
          skills_wanted: ['Python Programming', 'Data Science'],
          location: 'Austin, TX',
          rating: 4.6,
          completed_sessions: 8,
          bio: 'Engineer who loves teaching languages and cooking'
        }
      ];

      // Filter partners based on search query
      const filteredPartners = query 
        ? mockPartners.filter(partner => 
            partner.name.toLowerCase().includes(query.toLowerCase()) ||
            partner.skills_offered.some(skill => 
              skill.toLowerCase().includes(query.toLowerCase())
            ) ||
            partner.skills_wanted.some(skill => 
              skill.toLowerCase().includes(query.toLowerCase())
            )
          )
        : mockPartners;

      setAvailablePartners(filteredPartners);
    } catch (error) {
      console.error('Error loading partners:', error);
      toast({
        title: 'Error',
        description: 'Failed to load available partners',
        variant: 'destructive',
      });
    } finally {
      setLoadingPartners(false);
    }
  };

  const handleNewConversation = () => {
    setIsNewConversationModalOpen(true);
    loadAvailablePartners();
  };

  const startConversationWith = async (partner: SkillPartner) => {
    try {
      // Mock starting a new conversation
      const newConversation: Conversation = {
        user_id: partner.id,
        user_name: partner.name,
        user_avatar: partner.avatar,
        last_message: 'Hi! I\'d love to connect and discuss skill exchange.',
        last_message_time: new Date().toISOString(),
        unread_count: 0,
        skill_offered: partner.skills_offered[0],
        skill_wanted: partner.skills_wanted[0],
        chat_stage: 'initial'
      };

      // Add to conversations list
      setConversations(prev => [newConversation, ...prev]);
      
      // Select the new conversation
      setSelectedConversation(partner.id);
      
      // Close modal
      setIsNewConversationModalOpen(false);
      
      // Load initial message
      loadMessages(partner.id);

      toast({
        title: 'Success',
        description: `Started conversation with ${partner.name}`,
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to start conversation',
        variant: 'destructive',
      });
    }
  };

  const handleVideoMeetingConfirmed = () => {
    if (currentSwapDetails?.conversation) {
      handleStartVideoSession(currentSwapDetails.conversation);
    }
  };

  const handleOutdoorMeetupConfirmed = () => {
    if (currentSwapDetails?.conversation) {
      handleScheduleMeetup(currentSwapDetails.conversation);
    }
  };

  const handleStartVideoSession = (conversation: Conversation) => {
    startVideoSession({
      participantId: conversation.user_id,
      participantName: conversation.user_name,
      participantAvatar: conversation.user_avatar,
      sessionTitle: `${conversation.skill_offered} ↔ ${conversation.skill_wanted}`,
      sessionType: 'learning'
    });
  };

  const handleScheduleMeetup = (conversation: Conversation) => {
    setIsMeetupModalOpen(true);
  };

  const handleMeetupScheduled = (meetupRequest: any) => {
    console.log('Meetup scheduled:', meetupRequest);
    
    // Update the conversation with the scheduled meetup
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.user_id === meetupRequest.recipientId 
          ? {
              ...conv,
              scheduled_meetup: {
                location: {
                  name: meetupRequest.proposedLocation.name,
                  address: meetupRequest.proposedLocation.address,
                  city: meetupRequest.proposedLocation.city,
                  district: meetupRequest.proposedLocation.district,
                  state: meetupRequest.proposedLocation.state,
                  country: meetupRequest.proposedLocation.country,
                  type: meetupRequest.proposedLocation.type,
                  latitude: meetupRequest.proposedLocation.latitude,
                  longitude: meetupRequest.proposedLocation.longitude,
                },
                date: meetupRequest.proposedTime.split('T')[0],
                time: meetupRequest.proposedTime.split('T')[1],
                message: meetupRequest.message,
                status: 'pending'
              }
            }
          : conv
      )
    );

    toast({
      title: "Meetup Request Sent",
      description: `Your meetup request for ${meetupRequest.proposedLocation.name} has been sent to ${meetupRequest.recipientId}`,
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'cafe': return <Coffee className="h-4 w-4" />;
      case 'library': return <BookOpen className="h-4 w-4" />;
      case 'coworking': return <Building className="h-4 w-4" />;
      case 'park': return <Trees className="h-4 w-4" />;
      case 'home': return <Home className="h-4 w-4" />;
      case 'work': return <Briefcase className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getLocationMapUrl = (location: { 
    latitude?: number; 
    longitude?: number; 
    address: string; 
    name: string; 
    city?: string; 
    district?: string; 
    state?: string; 
    country?: string 
  }) => {
    if (location.latitude && location.longitude) {
      return `https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=16`;
    }
    
    // Enhanced address formatting with international and district support  
    const addressParts = [
      location.name,
      location.address,
      location.district || '',
      location.city || '',
      location.state || '',
      location.country || 'India'
    ].filter(part => part && part.trim() !== '');
    
    const formattedAddress = addressParts.join(', ');
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;
  };

  const selectedUser = conversations.find(c => c.user_id === selectedConversation);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p>Please sign in to view your messages.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 pt-16 sm:pt-20 lg:pt-24">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold">Messages</h1>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-4 xl:gap-6 h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] lg:h-[600px]">
          {/* Conversations List - Hidden on mobile when chat is open */}
          <Card className={`lg:col-span-1 h-full ${selectedConversation ? 'hidden lg:block' : ''}`}>
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">Conversations</CardTitle>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-8 w-8 sm:h-9 sm:w-9 p-0"
                  onClick={handleNewConversation}
                  title="Start new conversation"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-7 sm:pl-10 text-sm h-8 sm:h-10" 
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-100px)] sm:h-[calc(100%-120px)] overflow-hidden">
              {loading ? (
                <div className="space-y-3 sm:space-y-4 p-3 sm:p-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1 space-y-1 sm:space-y-2">
                        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500 px-4">
                  <MessageCircle className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">No conversations yet</p>
                  <p className="text-xs sm:text-sm">Start chatting with skill exchange partners!</p>
                </div>
              ) : (
                <div className="space-y-0 overflow-y-auto h-full">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.user_id}
                      onClick={() => handleConversationSelect(conversation.user_id)}
                      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b transition-colors touch-manipulation ${
                        selectedConversation === conversation.user_id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarImage src={conversation.user_avatar} alt={conversation.user_name} />
                        <AvatarFallback className="text-xs sm:text-sm">
                          {conversation.user_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium truncate text-sm sm:text-base">{conversation.user_name}</h4>
                          <span className="text-xs text-gray-500 flex-shrink-0 ml-1">
                            {formatTime(conversation.last_message_time)}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 truncate mb-2">{conversation.last_message}</p>
                        
                        {/* Skill Exchange Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              Offers: {conversation.skill_offered}
                            </Badge>
                            <RefreshCw className="h-2 w-2 sm:h-3 sm:w-3 text-gray-400 flex-shrink-0" />
                          </div>
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            Wants: {conversation.skill_wanted}
                          </Badge>
                        </div>
                        
                        {/* Chat Stage Indicator and Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            {conversation.chat_stage === 'ready_to_swap' && (
                              <Badge variant="default" className="text-xs bg-green-100 text-green-800 px-1 py-0">
                                Ready to Swap!
                              </Badge>
                            )}
                            {conversation.chat_stage === 'swap_confirmed' && (
                              <Badge variant="default" className="text-xs bg-blue-100 text-blue-800 px-1 py-0">
                                Swap Confirmed
                              </Badge>
                            )}
                            {conversation.chat_stage === 'discussing' && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                Discussing
                              </Badge>
                            )}
                            {conversation.chat_stage === 'initial' && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                Getting Started
                              </Badge>
                            )}
                            
                            {/* Scheduled Meetup Indicator */}
                            {conversation.scheduled_meetup && conversation.chat_stage === 'swap_confirmed' && (
                              <Badge 
                                variant="outline" 
                                className={`text-xs flex items-center gap-1 px-1 py-0 ${
                                  conversation.scheduled_meetup.status === 'confirmed' 
                                    ? 'bg-green-50 text-green-700 border-green-300'
                                    : conversation.scheduled_meetup.status === 'pending'
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-300'
                                    : 'bg-red-50 text-red-700 border-red-300'
                                }`}
                              >
                                <MapPin className="h-2 w-2 sm:h-3 sm:w-3" />
                                Meetup
                              </Badge>
                            )}
                          </div>
                          
                          {/* Ready to Swap Button for initial and discussing stages */}
                          {(conversation.chat_stage === 'initial' || conversation.chat_stage === 'discussing') && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Update conversation to ready_to_swap stage
                                setConversations(prevConversations => 
                                  prevConversations.map(conv => 
                                    conv.user_id === conversation.user_id 
                                      ? { ...conv, chat_stage: 'ready_to_swap' as const }
                                      : conv
                                  )
                                );
                                toast({
                                  title: "Ready to Swap!",
                                  description: `You've marked your conversation with ${conversation.user_name} as ready for skill exchange.`,
                                });
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 h-auto touch-manipulation"
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Ready to Swap
                            </Button>
                          )}
                        </div>
                      </div>
                      {conversation.unread_count > 0 && (
                        <div className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center flex-shrink-0">
                          {conversation.unread_count}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Area - Hidden on mobile when no conversation selected */}
          <Card className={`lg:col-span-2 h-full ${!selectedConversation ? 'hidden lg:block' : ''}`}>
            {selectedConversation ? (
              <>
                <CardHeader className="border-b pb-2 sm:pb-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      {/* Back button for mobile */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedConversation(null)}
                        className="lg:hidden h-8 w-8 p-0 flex-shrink-0"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarImage src={selectedUser?.user_avatar} alt={selectedUser?.user_name} />
                        <AvatarFallback className="text-xs sm:text-sm">
                          {selectedUser?.user_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base truncate">{selectedUser?.user_name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">Active now</p>
                      </div>
                    </div>
                    
                    {/* Skill Swap Actions */}
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      {selectedUser?.chat_stage === 'ready_to_swap' && (
                        <Button 
                          onClick={() => handleSkillSwapRequest(selectedUser)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9 touch-manipulation"
                        >
                          <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Start Skill Swap</span>
                          <span className="sm:hidden">Swap</span>
                        </Button>
                      )}
                      {selectedUser?.chat_stage === 'swap_confirmed' && (
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleStartVideoSession(selectedUser)}
                            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 text-xs px-2 sm:px-3 h-8 sm:h-9 touch-manipulation"
                          >
                            <Video className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Video</span>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleScheduleMeetup(selectedUser)}
                            className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 hover:text-green-800 text-xs px-2 sm:px-3 h-8 sm:h-9 touch-manipulation"
                          >
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Meetup</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {/* Scheduled Meetup Display */}
                {selectedUser?.scheduled_meetup && selectedUser?.chat_stage === 'swap_confirmed' && (
                  <div className="border-b bg-gradient-to-r from-green-50 to-blue-50 p-3 sm:p-4">
                    <div className="flex items-start gap-2 sm:gap-4">
                      <div className="p-2 bg-white rounded-lg border border-green-200 flex-shrink-0">
                        {getLocationIcon(selectedUser.scheduled_meetup.location.type)}
                      </div>
                      
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                          <h4 className="font-semibold text-green-800 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            Scheduled Meetup
                          </h4>
                          <Badge 
                            variant={selectedUser.scheduled_meetup.status === 'confirmed' ? 'default' : 'secondary'}
                            className={`text-xs self-start sm:self-auto ${
                              selectedUser.scheduled_meetup.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800 border-green-300'
                                : selectedUser.scheduled_meetup.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                                : 'bg-red-100 text-red-800 border-red-300'
                            }`}
                          >
                            {selectedUser.scheduled_meetup.status === 'confirmed' && <CheckCircle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />}
                            {selectedUser.scheduled_meetup.status === 'pending' && <Clock className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />}
                            {selectedUser.scheduled_meetup.status === 'cancelled' && <AlertTriangle className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />}
                            {selectedUser.scheduled_meetup.status.charAt(0).toUpperCase() + selectedUser.scheduled_meetup.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-xs sm:text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 text-xs sm:text-sm">{selectedUser.scheduled_meetup.location.name}</p>
                              <p className="text-gray-600 text-xs truncate">
                                {[
                                  selectedUser.scheduled_meetup.location.address,
                                  selectedUser.scheduled_meetup.location.district,
                                  selectedUser.scheduled_meetup.location.city,
                                  selectedUser.scheduled_meetup.location.state,
                                  selectedUser.scheduled_meetup.location.country
                                ].filter(Boolean).join(', ')}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-900 text-xs sm:text-sm">
                                {new Date(selectedUser.scheduled_meetup.date).toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                              <p className="text-gray-600 text-xs">
                                {new Date(`2000-01-01T${selectedUser.scheduled_meetup.time}`).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              asChild
                              className="text-xs h-8"
                            >
                              <a 
                                href={getLocationMapUrl(selectedUser.scheduled_meetup.location)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1"
                              >
                                <Navigation className="h-3 w-3" />
                                View on Map
                              </a>
                            </Button>
                            
                            {selectedUser.scheduled_meetup.status === 'pending' && (
                              <div className="flex gap-1">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 h-8 px-2"
                                  onClick={() => {
                                    // Handle meetup confirmation
                                    setConversations(prevConversations => 
                                      prevConversations.map(conv => 
                                        conv.user_id === selectedUser.user_id && conv.scheduled_meetup
                                          ? {
                                              ...conv,
                                              scheduled_meetup: {
                                                ...conv.scheduled_meetup,
                                                status: 'confirmed'
                                              }
                                            }
                                          : conv
                                      )
                                    );
                                    toast({
                                      title: "Meetup Confirmed",
                                      description: "You've confirmed the meetup with " + selectedUser.user_name,
                                    });
                                  }}
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 h-8 px-2"
                                  onClick={() => {
                                    // Handle meetup cancellation
                                    setConversations(prevConversations => 
                                      prevConversations.map(conv => 
                                        conv.user_id === selectedUser.user_id && conv.scheduled_meetup
                                          ? {
                                              ...conv,
                                              scheduled_meetup: {
                                                ...conv.scheduled_meetup,
                                                status: 'cancelled'
                                              }
                                            }
                                          : conv
                                      )
                                    );
                                    toast({
                                      title: "Meetup Cancelled",
                                      description: "You've cancelled the meetup with " + selectedUser.user_name,
                                    });
                                  }}
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {selectedUser.scheduled_meetup.message && (
                          <div className="mt-2 p-2 bg-white rounded border border-gray-200">
                            <p className="text-xs sm:text-sm text-gray-700 italic">"{selectedUser.scheduled_meetup.message}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                <CardContent className="flex flex-col h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)] lg:h-[400px] p-2 sm:p-3 lg:p-6">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 lg:space-y-4 py-2 sm:py-3 lg:py-4 px-1">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] sm:max-w-[85%] lg:max-w-xs xl:max-w-md px-2 sm:px-3 lg:px-4 py-2 rounded-lg ${
                            message.sender_id === user.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-xs sm:text-sm leading-relaxed break-words">{message.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className={`text-xs ${
                              message.sender_id === user.id ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.created_at)}
                            </span>
                            {message.sender_id === user.id && (
                              <Check className={`h-3 w-3 ${message.read ? 'text-blue-100' : 'text-blue-200'}`} />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t pt-2 sm:pt-3 lg:pt-4 bg-background">
                    <div className="flex gap-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        className="flex-1 text-sm h-10 sm:h-11 lg:h-10"
                      />
                      <Button 
                        onClick={sendMessage} 
                        disabled={!newMessage.trim() || sendingMessage}
                        size="sm"
                        className="h-10 w-10 sm:h-11 sm:w-11 lg:h-10 lg:w-10 p-0 touch-manipulation"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 px-4">
                  <MessageCircle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                  <h3 className="text-base sm:text-lg font-semibold mb-2">Select a conversation</h3>
                  <p className="text-sm sm:text-base">Choose a conversation from the left to start chatting</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
        
        {/* Skill Swap Modal */}
        {currentSwapDetails && (
          <SkillSwapModal
            isOpen={isSkillSwapModalOpen}
            onClose={() => setIsSkillSwapModalOpen(false)}
            partnerName={currentSwapDetails.partnerName}
            partnerSkill={currentSwapDetails.partnerSkill}
            yourSkill={currentSwapDetails.yourSkill}
            onVideoMeetingConfirmed={handleVideoMeetingConfirmed}
            onOutdoorMeetupConfirmed={handleOutdoorMeetupConfirmed}
          />
        )}

        {/* Video Call Modal */}
        {currentSession && (
          <VideoCallModal
            isOpen={isModalOpen}
            onClose={closeModal}
            participantName={currentSession.config.participantName}
            participantAvatar={currentSession.config.participantAvatar}
            sessionTitle={currentSession.config.sessionTitle}
            participantId={currentSession.config.participantId}
          />
        )}

        {/* Meetup Scheduler Modal */}
        {selectedUser && (
          <MeetupSchedulerModal
            isOpen={isMeetupModalOpen}
            onClose={() => setIsMeetupModalOpen(false)}
            participantName={selectedUser.user_name}
            participantId={selectedUser.user_id}
            sessionTitle={`${selectedUser.skill_offered} ↔ ${selectedUser.skill_wanted}`}
            onMeetupScheduled={handleMeetupScheduled}
          />
        )}

        {/* New Conversation Modal */}
        <Dialog open={isNewConversationModalOpen} onOpenChange={setIsNewConversationModalOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Start New Conversation
              </DialogTitle>
              <DialogDescription>
                Find and connect with skilled individuals in your community for knowledge exchange.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or skills..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    loadAvailablePartners(e.target.value);
                  }}
                  className="pl-10"
                />
              </div>

              {/* Partners List */}
              <div className="space-y-0 max-h-[400px] overflow-y-auto border rounded-lg">
                {loadingPartners ? (
                  <div className="space-y-3 p-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : availablePartners.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-base font-medium">No partners found</p>
                    <p className="text-sm">Try adjusting your search query</p>
                  </div>
                ) : (
                  availablePartners.map((partner) => (
                    <div
                      key={partner.id}
                      className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                      onClick={() => startConversationWith(partner)}
                    >
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={partner.avatar} alt={partner.name} />
                        <AvatarFallback className="text-sm">
                          {partner.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-base">{partner.name}</h4>
                            <p className="text-sm text-gray-600">{partner.location}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm font-medium">{partner.rating}</span>
                              </div>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-600">{partner.completed_sessions} sessions</span>
                            </div>
                          </div>
                        </div>
                        
                        {partner.bio && (
                          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{partner.bio}</p>
                        )}
                        
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Offers:</p>
                            <div className="flex flex-wrap gap-1">
                              {partner.skills_offered.map((skill, index) => (
                                <Badge key={index} variant="default" className="text-xs bg-green-100 text-green-800">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Wants:</p>
                            <div className="flex flex-wrap gap-1">
                              {partner.skills_wanted.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-xs px-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          startConversationWith(partner);
                        }}
                      >
                        Connect
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
