-- Step 6: Create RLS Policies for Profiles and Skills
-- Run this in Supabase SQL Editor after Step 5

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for skills
CREATE POLICY "Users can view all skills" ON public.skills
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own skills" ON public.skills
    FOR ALL USING (auth.uid() = user_id);
