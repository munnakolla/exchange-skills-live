import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Video, 
  MapPin, 
  Clock, 
  Calendar,
  MessageSquare,
  Star,
  CheckCircle
} from "lucide-react";

interface SkillSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  partnerSkill: string;
  yourSkill: string;
  onVideoMeetingConfirmed?: () => void;
  onOutdoorMeetupConfirmed?: () => void;
}

const SkillSwapModal: React.FC<SkillSwapModalProps> = ({
  isOpen,
  onClose,
  partnerName,
  partnerSkill,
  yourSkill,
  onVideoMeetingConfirmed,
  onOutdoorMeetupConfirmed
}) => {
  const [selectedMeetingType, setSelectedMeetingType] = useState<'video' | 'outdoor' | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const { toast } = useToast();

  const handleMeetingTypeSelect = (type: 'video' | 'outdoor') => {
    setSelectedMeetingType(type);
  };

  const handleConfirmSwap = () => {
    setIsConfirming(true);
    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false);
      onClose();
      
      // Show success toast
      toast({
        title: "Skill Swap Confirmed!",
        description: `Your ${selectedMeetingType === 'video' ? 'video meeting' : 'outdoor meetup'} with ${partnerName} has been confirmed.`,
      });
      
      // Trigger the appropriate next step based on meeting type
      if (selectedMeetingType === 'video' && onVideoMeetingConfirmed) {
        onVideoMeetingConfirmed();
      } else if (selectedMeetingType === 'outdoor' && onOutdoorMeetupConfirmed) {
        onOutdoorMeetupConfirmed();
      }
    }, 2000);
  };

  const meetingOptions = [
    {
      type: 'video' as const,
      icon: Video,
      title: 'Video Call',
      description: 'Meet online through secure video chat',
      benefits: ['Convenient from home', 'Screen sharing available', 'Recording possible', 'Weather independent'],
      duration: '45-60 minutes recommended'
    },
    {
      type: 'outdoor' as const,
      icon: MapPin,
      title: 'Outdoor Meeting',
      description: 'Meet in person at a public location',
      benefits: ['Face-to-face interaction', 'Hands-on learning', 'Local community building', 'Real-world practice'],
      duration: '1-2 hours recommended'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Skill Swap Agreement
          </DialogTitle>
          <DialogDescription>
            Great! You and {partnerName} are ready to exchange skills. Choose how you'd like to meet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Skill Exchange Summary */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <h3 className="text-lg font-semibold mb-4 text-center">Skill Exchange Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-blue-600">You'll Teach</h4>
                  <p className="text-xl font-bold">{yourSkill}</p>
                  <Badge variant="secondary" className="mt-2">Your Expertise</Badge>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium text-purple-600">You'll Learn</h4>
                  <p className="text-xl font-bold">{partnerSkill}</p>
                  <Badge variant="secondary" className="mt-2">From {partnerName}</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Separator />

          {/* Meeting Type Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Choose Meeting Type
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {meetingOptions.map((option) => (
                <Card 
                  key={option.type}
                  className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedMeetingType === option.type 
                      ? 'border-2 border-blue-500 bg-blue-50' 
                      : 'border hover:border-gray-300'
                  }`}
                  onClick={() => handleMeetingTypeSelect(option.type)}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedMeetingType === option.type 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <option.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{option.title}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Benefits:</h5>
                      <ul className="space-y-1">
                        {option.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {option.duration}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {selectedMeetingType && (
            <>
              <Separator />
              
              {/* Next Steps */}
              <Card className="p-6 bg-green-50 border-green-200">
                <h3 className="text-lg font-semibold mb-3 text-green-800">Next Steps</h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Continue chatting to coordinate details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Schedule your {selectedMeetingType === 'video' ? 'video call' : 'meeting location'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>Prepare materials and questions for your exchange</span>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1"
                >
                  Continue Chatting
                </Button>
                <Button 
                  onClick={handleConfirmSwap}
                  disabled={isConfirming}
                  className="flex-1"
                >
                  {isConfirming ? 'Confirming...' : `Confirm ${selectedMeetingType === 'video' ? 'Video' : 'Outdoor'} Meeting`}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillSwapModal;
