-- Step 3: Insert Default Data
-- Run this in Supabase SQL Editor after Step 2

-- Insert default skill categories
INSERT INTO public.skill_categories (name, description, icon) VALUES
('Programming', 'Software development and coding skills', '💻'),
('Design', 'UI/UX, graphic design, and creative skills', '🎨'),
('Music', 'Musical instruments and music theory', '🎵'),
('Languages', 'Foreign language learning and practice', '🗣️'),
('Academic', 'Academic subjects and tutoring', '📚'),
('Business', 'Business skills and entrepreneurship', '💼'),
('Sports', 'Physical activities and sports training', '⚽'),
('Cooking', 'Culinary skills and cooking techniques', '👨‍🍳'),
('Photography', 'Photography and video editing', '📸'),
('Crafts', 'Arts, crafts, and DIY projects', '✂️')
ON CONFLICT (name) DO NOTHING;
