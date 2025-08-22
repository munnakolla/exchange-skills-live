# Email Confirmation Fix Guide

## Quick Fix: Disable Email Confirmation (Recommended for Development)

### Step 1: Access Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/nawesrqtowenldfegasl
2. Navigate to **Authentication** → **Settings**

### Step 2: Disable Email Confirmation
1. Scroll down to **"Email Confirmations"** section
2. **Toggle OFF** "Enable email confirmations"
3. Click **Save**

### Step 3: Test Sign-Up
- Try creating a new account
- You should be able to sign up immediately without email verification

---

## Alternative: Configure Email Delivery (For Production)

### Option A: Use Supabase Built-in Email (Limited)
1. In **Authentication** → **Settings**
2. Keep "Enable email confirmations" ON
3. Configure email templates under **Email Templates**
4. Test with a real email address

### Option B: Configure Custom SMTP
1. Go to **Authentication** → **Settings**
2. Scroll to **"SMTP Settings"**
3. Configure your email provider:
   ```
   Provider: Custom SMTP
   Host: smtp.gmail.com (for Gmail)
   Port: 587
   Username: your-email@gmail.com
   Password: your-app-password
   ```

---

## Troubleshooting

### If emails still don't arrive:
1. **Check spam folder**
2. **Verify email settings** in Supabase dashboard
3. **Use a different email provider** (Gmail, Outlook, etc.)
4. **Temporarily disable email confirmation** for testing

### Console Logs:
- Check browser console for any authentication errors
- Look for Supabase-specific error messages

### Test Steps:
1. Open browser console (F12)
2. Try to sign up
3. Check console for detailed error messages
4. Verify network requests to Supabase

---

## Quick Test Commands

You can also test email configuration directly in the browser console:

```javascript
// Test Supabase connection
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Test sign-up manually
const { supabase } = require('@/lib/supabase');
supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123'
}).then(console.log).catch(console.error);
```

Most likely solution: **Disable email confirmations** in your Supabase dashboard for now, and you should be able to sign up immediately!
