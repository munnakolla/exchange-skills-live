import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export interface SkillWithTeacher {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  teacher: {
    id: string;
    name: string;
    avatar_url?: string;
    location: string;
    rating?: number;
  };
  description?: string;
  tags?: string[];
  available_slots?: number;
}

export const useSkills = () => {
  const [skills, setSkills] = useState<SkillWithTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      // Query skills where people are teaching
      const { data: skillsData, error: skillsError } = await supabase
        .from('skills')
        .select(`
          id,
          name,
          category,
          level,
          user_id,
          profiles:user_id (
            id,
            full_name,
            avatar_url,
            location
          )
        `)
        .eq('is_teaching', true);

      if (skillsError) {
        throw skillsError;
      }

      // Transform the data to match our interface
      const transformedSkills: SkillWithTeacher[] = (skillsData || []).map((skill: any) => ({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        level: skill.level,
        teacher: {
          id: skill.profiles?.id || skill.user_id,
          name: skill.profiles?.full_name || 'Unknown Teacher',
          avatar_url: skill.profiles?.avatar_url,
          location: skill.profiles?.location || 'Location not specified',
          rating: 4.5 + Math.random() * 0.5, // Mock rating for now
        },
        description: `Learn ${skill.name} with an experienced instructor`,
        tags: [skill.category], // Simple tags for now
        available_slots: Math.floor(Math.random() * 5) + 1, // Mock available slots
      }));

      setSkills(transformedSkills);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Fallback to mock data if there's an error or no data
      setSkills([
        {
          id: '1',
          name: 'JavaScript Programming',
          category: 'Programming',
          level: 'intermediate',
          teacher: {
            id: '1',
            name: 'Sarah Johnson',
            avatar_url: '',
            location: 'New York, NY',
            rating: 4.9,
          },
          description: 'Learn modern JavaScript, ES6+, and web development fundamentals',
          tags: ['React', 'Node.js', 'Frontend'],
          available_slots: 3,
        },
        {
          id: '2',
          name: 'Guitar Lessons',
          category: 'Music',
          level: 'beginner',
          teacher: {
            id: '2',
            name: 'Mike Rodriguez',
            avatar_url: '',
            location: 'Los Angeles, CA',
            rating: 4.8,
          },
          description: 'Acoustic and electric guitar for beginners, learn your favorite songs',
          tags: ['Acoustic', 'Electric', 'Rock', 'Folk'],
          available_slots: 2,
        },
        {
          id: '3',
          name: 'Spanish Conversation',
          category: 'Languages',
          level: 'intermediate',
          teacher: {
            id: '3',
            name: 'Maria Garcia',
            avatar_url: '',
            location: 'Miami, FL',
            rating: 5.0,
          },
          description: 'Practice conversational Spanish with native speaker',
          tags: ['Conversation', 'Grammar', 'Culture'],
          available_slots: 5,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [user]);

  return { skills, loading, error, refetch: fetchSkills };
};
