# SkillSwap Supabase Setup Guide

## 🚀 Quick Setup Instructions

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization and project
4. Wait for the project to be set up

### 2. Get Your Project Credentials
1. Go to your project dashboard
2. Click on "Settings" → "API"
3. Copy your project URL and anon public key

### 3. Set Environment Variables
1. Copy `.env.example` to `.env`
2. Replace the placeholder values:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database Schema
1. Go to your Supabase dashboard
2. Click on "SQL Editor"
3. Copy and paste the contents of `database-schema.sql`
4. Click "Run" to execute the schema

### 5. Configure Authentication
1. In Supabase dashboard, go to "Authentication" → "Settings"
2. Enable email authentication
3. Configure your site URL (for development: `http://localhost:8080`)

### 6. Test Your Setup
1. Run `npm run dev`
2. Try signing up with a new account
3. Check your Supabase dashboard to see the user created

## 🔧 Database Schema Overview

### Tables Created:
- **profiles**: User profile information
- **skills**: User skills (teaching/learning)
- **sessions**: Skill exchange sessions
- **reviews**: Session reviews and ratings

### Security:
- Row Level Security (RLS) enabled
- Users can only access their own data
- Public read access for discovery features

## 🛠️ Development Notes

### Real-time Features Ready:
- User authentication
- Profile management
- Skill tracking
- Session scheduling

### Next Steps:
1. Set up email templates in Supabase
2. Configure file storage for avatars
3. Add real-time messaging
4. Implement payment processing (if needed)

## 🔍 Troubleshooting

### Common Issues:
1. **Environment variables not loaded**: Restart your dev server
2. **Database connection errors**: Check your URL and key
3. **RLS policies**: Ensure you ran the complete schema

### Support:
- Supabase Documentation: [docs.supabase.com](https://docs.supabase.com)
- SkillSwap specific questions: Check the database schema comments
