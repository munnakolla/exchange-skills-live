import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface VideoSessionConfig {
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  sessionTitle?: string;
  sessionId?: string;
  sessionType?: 'learning' | 'consultation' | 'mentoring';
}

export interface VideoSession {
  id: string;
  config: VideoSessionConfig;
  startTime: Date;
  status: 'active' | 'ended';
  duration?: number;
}

export const useVideoSession = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState<VideoSession | null>(null);
  const [activeSessions, setActiveSessions] = useState<VideoSession[]>([]);
  const { toast } = useToast();

  const startVideoSession = useCallback((config: VideoSessionConfig) => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: VideoSession = {
      id: sessionId,
      config,
      startTime: new Date(),
      status: 'active'
    };

    setCurrentSession(session);
    setActiveSessions(prev => [...prev, session]);
    setIsModalOpen(true);

    // Log session start for analytics/tracking
    console.log('Video session started:', {
      sessionId,
      participant: config.participantName,
      type: config.sessionType || 'learning',
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Starting Video Session",
      description: `Connecting with ${config.participantName}...`,
    });

    return sessionId;
  }, [toast]);

  const endVideoSession = useCallback((sessionId?: string) => {
    const targetSessionId = sessionId || currentSession?.id;
    
    if (!targetSessionId) return;

    setActiveSessions(prev => 
      prev.map(session => 
        session.id === targetSessionId 
          ? { 
              ...session, 
              status: 'ended' as const,
              duration: Date.now() - session.startTime.getTime()
            }
          : session
      )
    );

    if (currentSession?.id === targetSessionId) {
      setCurrentSession(null);
      setIsModalOpen(false);
    }

    // Log session end for analytics/tracking
    const session = activeSessions.find(s => s.id === targetSessionId);
    if (session) {
      const duration = Math.round((Date.now() - session.startTime.getTime()) / 1000);
      console.log('Video session ended:', {
        sessionId: targetSessionId,
        participant: session.config.participantName,
        duration: `${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
        timestamp: new Date().toISOString()
      });
    }

    toast({
      title: "Session Ended",
      description: session ? `Call with ${session.config.participantName} has ended` : "Video session ended",
    });
  }, [currentSession, activeSessions, toast]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (currentSession) {
      endVideoSession(currentSession.id);
    }
  }, [currentSession, endVideoSession]);

  const getActiveSessionsCount = useCallback(() => {
    return activeSessions.filter(session => session.status === 'active').length;
  }, [activeSessions]);

  const getSessionHistory = useCallback(() => {
    return activeSessions.filter(session => session.status === 'ended');
  }, [activeSessions]);

  return {
    // Modal state
    isModalOpen,
    currentSession,
    
    // Session management
    startVideoSession,
    endVideoSession,
    closeModal,
    
    // Session data
    activeSessions: activeSessions.filter(session => session.status === 'active'),
    sessionHistory: getSessionHistory(),
    activeSessionsCount: getActiveSessionsCount(),
    
    // Utilities
    setIsModalOpen
  };
};

// Utility functions for session management
export const formatSessionDuration = (startTime: Date, endTime?: Date): string => {
  const end = endTime || new Date();
  const durationMs = end.getTime() - startTime.getTime();
  const durationSeconds = Math.floor(durationMs / 1000);
  
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);
  const seconds = durationSeconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const generateMeetingLink = (sessionId: string): string => {
  return `https://meet.skillswap.com/room/${sessionId}`;
};

export const validateVideoCapabilities = async (): Promise<{
  hasCamera: boolean;
  hasMicrophone: boolean;
  isSupported: boolean;
}> => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const hasCamera = devices.some(device => device.kind === 'videoinput');
    const hasMicrophone = devices.some(device => device.kind === 'audioinput');
    const isSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    
    return { hasCamera, hasMicrophone, isSupported };
  } catch (error) {
    console.warn('Could not check video capabilities:', error);
    return { hasCamera: false, hasMicrophone: false, isSupported: false };
  }
};
