// Simple video service without external dependencies for now
export interface VideoCallConfig {
  sessionId: string;
  participantId: string;
  isInitiator: boolean;
}

export interface VideoCallEvents {
  onStreamReceived: (stream: MediaStream) => void;
  onConnectionEstablished: () => void;
  onConnectionFailed: (error: Error) => void;
  onConnectionClosed: () => void;
  onSignalData: (data: any) => void;
}

export class WebRTCVideoService {
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private config: VideoCallConfig | null = null;
  private events: VideoCallEvents | null = null;

  constructor() {
    this.localStream = null;
    this.remoteStream = null;
  }

  async initializeCall(config: VideoCallConfig, events: VideoCallEvents): Promise<void> {
    this.config = config;
    this.events = events;

    try {
      // Get user media (this part works without external dependencies)
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Simulate connection for now (until we properly set up WebRTC)
      setTimeout(() => {
        this.events?.onConnectionEstablished();
      }, 2000);

    } catch (error) {
      console.error('Failed to initialize video call:', error);
      this.events?.onConnectionFailed(error as Error);
    }
  }

  toggleVideo(enabled: boolean): void {
    if (this.localStream) {
      const videoTracks = this.localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = enabled;
      });
    }
  }

  toggleAudio(enabled: boolean): void {
    if (this.localStream) {
      const audioTracks = this.localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = enabled;
      });
    }
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }

  endCall(): void {
    try {
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => {
          track.stop();
        });
        this.localStream = null;
      }
      this.remoteStream = null;
      console.log('Video call ended successfully');
    } catch (error) {
      console.error('Error ending video call:', error);
    }
  }

  static isSupported(): boolean {
    return !!(
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      window.RTCPeerConnection
    );
  }

  static async getAvailableDevices(): Promise<{
    videoDevices: MediaDeviceInfo[];
    audioDevices: MediaDeviceInfo[];
  }> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return {
        videoDevices: devices.filter(device => device.kind === 'videoinput'),
        audioDevices: devices.filter(device => device.kind === 'audioinput')
      };
    } catch (error) {
      console.error('Error enumerating devices:', error);
      return { videoDevices: [], audioDevices: [] };
    }
  }

  static async testMediaAccess(): Promise<{
    camera: boolean;
    microphone: boolean;
    error?: string;
  }> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();
      
      stream.getTracks().forEach(track => track.stop());
      
      return {
        camera: videoTracks.length > 0,
        microphone: audioTracks.length > 0
      };
    } catch (error) {
      return {
        camera: false,
        microphone: false,
        error: (error as Error).message
      };
    }
  }
}

// Mock signaling service
export class MockSignalingService {
  private static instance: MockSignalingService;
  private sessions: Map<string, {
    participants: string[];
    signals: Map<string, any[]>;
  }> = new Map();

  static getInstance(): MockSignalingService {
    if (!MockSignalingService.instance) {
      MockSignalingService.instance = new MockSignalingService();
    }
    return MockSignalingService.instance;
  }

  joinSession(sessionId: string, participantId: string): void {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        participants: [],
        signals: new Map()
      });
    }

    const session = this.sessions.get(sessionId)!;
    if (!session.participants.includes(participantId)) {
      session.participants.push(participantId);
      session.signals.set(participantId, []);
    }
  }

  sendSignal(sessionId: string, fromParticipant: string, toParticipant: string, signalData: any): void {
    const session = this.sessions.get(sessionId);
    if (session && session.signals.has(toParticipant)) {
      session.signals.get(toParticipant)!.push({
        from: fromParticipant,
        data: signalData,
        timestamp: Date.now()
      });
    }
  }

  getSignals(sessionId: string, participantId: string): any[] {
    const session = this.sessions.get(sessionId);
    if (session && session.signals.has(participantId)) {
      const signals = session.signals.get(participantId)!;
      session.signals.set(participantId, []);
      return signals;
    }
    return [];
  }

  leaveSession(sessionId: string, participantId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.participants = session.participants.filter(p => p !== participantId);
      session.signals.delete(participantId);
      
      if (session.participants.length === 0) {
        this.sessions.delete(sessionId);
      }
    }
  }
}
