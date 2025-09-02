# SkillSwap - Peer-to-Peer Skill Exchange Platform

## 🚀 Features

### ✅ Authentication System
- **Sign In/Sign Up**: Complete authentication flow with form validation
- **User Context**: Global state management for authentication
- **Protected Routes**: Dashboard and user-specific pages require authentication
- **Persistent Sessions**: User data persists across browser sessions
- **Loading States**: Smooth loading indicators during authentication

### 🎯 User Experience
- **Dynamic Navigation**: Header changes based on authentication status
- **User Dashboard**: Personalized dashboard with stats, sessions, and activities
- **Profile Management**: User avatars, skills, and profile information
- **Toast Notifications**: Real-time feedback for user actions

### 🛡️ Security & Validation
- **Form Validation**: Email validation, password confirmation, required fields
- **Error Handling**: Comprehensive error messages and user feedback
- **Route Protection**: Automatic redirects for unauthorized access

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open vercel and login with your github and click on repo and then deploy
