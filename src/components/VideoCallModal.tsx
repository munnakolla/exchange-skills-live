import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Settings, 
  Users,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Monitor,
  MonitorOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WebRTCVideoService, MockSignalingService } from "@/services/videoService";

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  participantName: string;
  participantAvatar?: string;
  sessionTitle?: string;
  participantId?: string;
}

type CallState = 'connecting' | 'connected' | 'ended' | 'failed';

const VideoCallModal = ({ 
  isOpen, 
  onClose, 
  participantName, 
  participantAvatar,
  sessionTitle = "Learning Session",
  participantId = "participant"
}: VideoCallModalProps) => {
  const [callState, setCallState] = useState<CallState>('connecting');
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  
  // Video refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // WebRTC service
  const videoServiceRef = useRef<WebRTCVideoService | null>(null);
  const signalingServiceRef = useRef<MockSignalingService | null>(null);
  
  const { toast } = useToast();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoServiceRef.current) {
        videoServiceRef.current.endCall();
      }
    };
  }, []);

  // Handle call initialization when modal opens
  useEffect(() => {
    if (isOpen && callState === 'connecting') {
      initializeVideoCall();
    }
  }, [isOpen]);

  const initializeVideoCall = async () => {
    try {
      setConnectionError(null);
      
      // Check WebRTC support
      if (!WebRTCVideoService.isSupported()) {
        throw new Error('WebRTC is not supported in this browser');
      }

      // Test media access
      const mediaTest = await WebRTCVideoService.testMediaAccess();
      if (!mediaTest.camera && !mediaTest.microphone) {
        throw new Error('Camera and microphone access denied');
      }

      // Initialize services
      videoServiceRef.current = new WebRTCVideoService();
      signalingServiceRef.current = MockSignalingService.getInstance();
      
      const sessionId = `session_${Date.now()}`;
      const currentUserId = 'current_user'; // Replace with actual user ID
      
      // Join signaling session
      signalingServiceRef.current.joinSession(sessionId, currentUserId);
      signalingServiceRef.current.joinSession(sessionId, participantId);

      // Initialize video call
      await videoServiceRef.current.initializeCall(
        {
          sessionId,
          participantId,
          isInitiator: true // First person to join is initiator
        },
        {
          onStreamReceived: handleRemoteStream,
          onConnectionEstablished: handleConnectionEstablished,
          onConnectionFailed: handleConnectionFailed,
          onConnectionClosed: handleConnectionClosed,
          onSignalData: handleSignalData
        }
      );

      // Get local stream and display it
      const localStream = videoServiceRef.current.getLocalStream();
      if (localStream && localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      // Simulate receiving signals for demo
      setTimeout(() => {
        simulateSignalingExchange(sessionId, currentUserId);
      }, 2000);

    } catch (error) {
      console.error('Failed to initialize video call:', error);
      setConnectionError((error as Error).message);
      setCallState('failed');
    }
  };

  const simulateSignalingExchange = (sessionId: string, userId: string) => {
    // Simulate successful connection for demo
    setTimeout(() => {
      setCallState('connected');
      toast({
        title: "Connected",
        description: `You are now connected with ${participantName}`,
      });
    }, 1000);
  };

  const handleRemoteStream = (stream: MediaStream) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
    }
  };

  const handleConnectionEstablished = () => {
    setCallState('connected');
    toast({
      title: "Connected Successfully",
      description: `You are now connected with ${participantName}`,
    });
  };

  const handleConnectionFailed = (error: Error) => {
    setCallState('failed');
    setConnectionError(error.message);
    toast({
      title: "Connection Failed",
      description: error.message,
      variant: "destructive"
    });
  };

  const handleConnectionClosed = () => {
    setCallState('ended');
    toast({
      title: "Call Ended",
      description: "Video call has been ended",
    });
  };

  const handleSignalData = (data: any) => {
    // In a real app, this would send the signal data to the other participant
    // via your signaling server (WebSocket, Socket.IO, etc.)
    console.log('Signal data to send:', data);
  };

  const handleToggleVideo = () => {
    const newVideoState = !isVideoEnabled;
    setIsVideoEnabled(newVideoState);
    
    if (videoServiceRef.current) {
      videoServiceRef.current.toggleVideo(newVideoState);
    }

    toast({
      title: newVideoState ? "Camera On" : "Camera Off",
      description: `Your camera is now ${newVideoState ? 'enabled' : 'disabled'}`,
    });
  };

  const handleToggleAudio = () => {
    const newAudioState = !isAudioEnabled;
    setIsAudioEnabled(newAudioState);
    
    if (videoServiceRef.current) {
      videoServiceRef.current.toggleAudio(newAudioState);
    }

    toast({
      title: newAudioState ? "Microphone On" : "Microphone Off", 
      description: `Your microphone is now ${newAudioState ? 'enabled' : 'disabled'}`,
    });
  };

  const handleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        // Start screen sharing
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        
        setIsScreenSharing(true);
        toast({
          title: "Screen Sharing Started",
          description: "You are now sharing your screen",
        });

        // Handle screen share ending
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          toast({
            title: "Screen Sharing Stopped",
            description: "Screen sharing has ended",
          });
        };
      } else {
        // Stop screen sharing logic would go here
        setIsScreenSharing(false);
      }
    } catch (error) {
      toast({
        title: "Screen Share Failed",
        description: "Unable to start screen sharing",
        variant: "destructive"
      });
    }
  };

  // Mock meeting link for demo purposes
  const meetingLink = `https://meet.skillswap.com/room/${Math.random().toString(36).substr(2, 9)}`;

  const handleStartCall = async () => {
    try {
      setCallState('connecting');
      setConnectionError(null);
      
      // Simulate connection process
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        if (success) {
          setCallState('connected');
          toast({
            title: "Connected Successfully",
            description: `You are now connected with ${participantName}`,
          });
        } else {
          setCallState('failed');
          setConnectionError("Failed to establish connection. Please check your internet and try again.");
        }
      }, 2000);
    } catch (error) {
      setCallState('failed');
      setConnectionError("Unable to start video call. Please try again.");
    }
  };

  const handleEndCall = () => {
    setCallState('ended');
    setShowEndConfirm(false);
    onClose();
    toast({
      title: "Call Ended",
      description: "Video call has been ended successfully",
    });
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: "Link Copied",
      description: "Meeting link copied to clipboard",
    });
  };

  const openExternalMeeting = () => {
    window.open(meetingLink, '_blank');
  };

  const renderCallInterface = () => {
    switch (callState) {
      case 'connecting':
        return (
          <div className="flex flex-col items-center justify-center h-96 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                <Video className="h-12 w-12 text-blue-600" />
              </div>
              <div className="absolute -inset-2 border-2 border-blue-500 rounded-full animate-ping"></div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Connecting to {participantName}...</h3>
              <p className="text-muted-foreground">Please wait while we establish the connection</p>
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        );

      case 'connected':
        return (
          <div className="space-y-4">
            {/* Video Area */}
            <div className="relative bg-gray-900 rounded-lg h-80 overflow-hidden">
              {/* Remote Video (Participant) */}
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                style={{ display: callState === 'connected' ? 'block' : 'none' }}
              />
              
              {/* Fallback when no remote video */}
              {callState === 'connected' && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center"
                     style={{ display: 'none' }}>
                  <div className="text-center text-white space-y-2">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                      {participantAvatar ? (
                        <img 
                          src={participantAvatar} 
                          alt={participantName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-xl font-semibold">
                          {participantName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="font-medium">{participantName}</p>
                  </div>
                </div>
              )}
              
              {/* Local Video (Picture-in-Picture) */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ display: isVideoEnabled ? 'block' : 'none' }}
                />
                {!isVideoEnabled && (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                    <VideoOff className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* Connection Status */}
              <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Connected
              </div>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center items-center space-x-3 py-4">
              <Button
                variant={isAudioEnabled ? "outline" : "destructive"}
                size="sm"
                onClick={handleToggleAudio}
                className="w-12 h-12 rounded-full hover-lift smooth-transition hover:!rounded-full"
                title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
              >
                {isAudioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant={isVideoEnabled ? "outline" : "secondary"}
                size="sm"
                onClick={handleToggleVideo}
                className="w-12 h-12 rounded-full hover-lift smooth-transition hover:!rounded-full"
                title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
              >
                {isVideoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>

              <Button
                variant={isScreenSharing ? "default" : "outline"}
                size="sm"
                onClick={handleScreenShare}
                className="w-12 h-12 rounded-full hover-lift smooth-transition hover:!rounded-full"
                title={isScreenSharing ? "Stop screen share" : "Share screen"}
              >
                {isScreenSharing ? <MonitorOff className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-12 rounded-full hover-lift smooth-transition hover:!rounded-full"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowEndConfirm(true)}
                className="w-12 h-12 rounded-full hover-lift smooth-transition hover:!rounded-full"
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>

            {/* Session Info */}
            <Card className="p-3 bg-muted">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{sessionTitle}</span>
                  <p className="text-muted-foreground">with {participantName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={copyMeetingLink} className="hover-lift smooth-transition hover:!rounded-md">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={openExternalMeeting} className="hover-lift smooth-transition hover:!rounded-md">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'failed':
        return (
          <div className="flex flex-col items-center justify-center h-96 space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-red-600">Connection Failed</h3>
              <p className="text-muted-foreground max-w-md">
                {connectionError || "Unable to establish video connection. Please check your internet connection and try again."}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="hover-lift smooth-transition hover:!rounded-lg">
                Cancel
              </Button>
              <Button onClick={handleStartCall} className="hover-lift smooth-transition hover:!rounded-lg">
                Try Again
              </Button>
            </div>
          </div>
        );

      case 'ended':
        return (
          <div className="flex flex-col items-center justify-center h-96 space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Call Ended</h3>
              <p className="text-muted-foreground">Thank you for your learning session!</p>
            </div>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video Session
            </DialogTitle>
            <DialogDescription>
              {callState === 'connecting' && "Establishing secure video connection..."}
              {callState === 'connected' && "You are in a live video session"}
              {callState === 'failed' && "Connection encountered an issue"}
              {callState === 'ended' && "Video session has ended"}
            </DialogDescription>
          </DialogHeader>
          
          {callState === 'connecting' && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3 className="font-medium">Ready to start your session?</h3>
                <p className="text-sm text-muted-foreground">
                  You'll be connected with {participantName} for "{sessionTitle}"
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <Button variant="outline" onClick={onClose} className="hover-lift smooth-transition hover:!rounded-lg">
                  Cancel
                </Button>
                <Button onClick={handleStartCall} className="hover-lift smooth-transition hover:!rounded-lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Start Call
                </Button>
              </div>
            </div>
          )}
          
          {(callState === 'connected' || callState === 'failed' || callState === 'ended') && renderCallInterface()}
        </DialogContent>
      </Dialog>

      {/* End Call Confirmation */}
      <AlertDialog open={showEndConfirm} onOpenChange={setShowEndConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Video Call?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the video call with {participantName}? 
              This will disconnect both participants.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="hover-lift smooth-transition hover:!rounded-lg">Continue Call</AlertDialogCancel>
            <AlertDialogAction onClick={handleEndCall} className="bg-red-600 hover:bg-red-700 hover-lift smooth-transition hover:!rounded-lg">
              End Call
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VideoCallModal;
