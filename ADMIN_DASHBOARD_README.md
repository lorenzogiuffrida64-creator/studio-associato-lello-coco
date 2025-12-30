# Admin Dashboard - Setup & Usage Guide

## 🎉 Implementation Complete!

Your admin dashboard has been successfully implemented with the following features:

### ✅ Completed Features

1. **Next.js Migration** - Migrated from Vite to Next.js 15 with App Router
2. **Google Sheets Integration** - Read/write form submissions to Google Sheets
3. **SQLite Database** - Store metadata (notes, read status, soft deletes)
4. **Authentication System** - Secure password-based login with JWT tokens
5. **Admin Dashboard UI** - Beautiful, responsive dashboard with:
   - Real-time stats (Total, Unread, Today)
   - Search & filters (by status, date range)
   - Table view (desktop) & card view (mobile)
   - Mark as read/unread
   - Add/edit notes on submissions
   - Soft delete functionality
6. **Export Functionality** - Export to CSV or Excel
7. **Contact Form API** - Updated to use Next.js API routes

---

## 📋 Setup Instructions

### Step 1: Configure Google Cloud

1. **Create Google Cloud Project**
   - Go to https://console.cloud.google.com/
   - Create project: "Studio Giuliano Admin Dashboard"

2. **Enable Google Sheets API**
   - Go to "APIs & Services" → "Library"
   - Search "Google Sheets API" and enable it

3. **Create Service Account**
   - Go to "APIs & Services" → "Credentials"
   - Create Credentials → Service Account
   - Name: "admin-dashboard-service"
   - Role: "Editor"
   - Download the JSON key file

4. **Share Your Google Sheet**
   - Open your Google Sheet
   - Click "Share"
   - Add the service account email (from JSON file)
   - Give "Editor" permissions

### Step 2: Configure Environment Variables

Open `.env.local` and update the following:

```bash
# 1. Google Sheet ID (from your sheet URL)
GOOGLE_SHEET_ID=your_actual_sheet_id

# 2. Service Account Email (from downloaded JSON)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com

# 3. Private Key (from downloaded JSON - keep the \n characters!)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourActualKey\n-----END PRIVATE KEY-----\n"

# 4. Generate Admin Password Hash
# Run: npx ts-node -e "import('bcryptjs').then(bcrypt => bcrypt.hash('YourPassword', 12).then(console.log))"
ADMIN_PASSWORD_HASH=$2a$12$your_generated_hash

# JWT_SECRET is already set (no need to change)
# DATABASE_URL is already set (no need to change)
```

### Step 3: Verify Google Sheet Structure

Your Google Sheet should have these columns (in Sheet1):

| A (Timestamp) | B (Name) | C (Email) | D (Subject) | E (Message) |
|---------------|----------|-----------|-------------|-------------|

The first row can be headers (will be skipped).

### Step 4: Generate Password Hash

Run this command to create your admin password:

```bash
npx ts-node -e "import('bcryptjs').then(bcrypt => bcrypt.hash('YourSecurePassword123!', 12).then(hash => console.log('ADMIN_PASSWORD_HASH=' + hash)))"
```

Copy the output and paste it into `.env.local`

---

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

Visit:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
- Admin dashboard: http://localhost:3000/admin (requires login)

### Production Build

```bash
npm run build
npm start
```

---

## 📱 Using the Admin Dashboard

### Login

1. Go to `/admin/login`
2. Enter the password you set when generating the hash
3. Click "Accedi"

### Dashboard Features

**Stats Bar**
- Total submissions
- Unread submissions
- Submissions received today

**Search & Filters**
- Search by name, email, subject, or message
- Filter by status (All, Read, Unread)
- Filter by date range (7d, 30d, 90d, All)

**Submissions Table**
- **Desktop**: Full table with all columns
- **Mobile**: Card view with expand/collapse

**Actions per Submission**
- 👁 **Eye icon**: Toggle read/unread status
- 📝 **Note icon**: Add or edit notes
- 🗑️ **Trash icon**: Soft delete (doesn't remove from Google Sheets)

**Export**
- **CSV**: Download all submissions as CSV file
- **Excel**: Download all submissions as Excel file

### Logout

Click the "Logout" button in the top-right corner.

---

## 🔒 Security Features

- ✅ Password hashed with bcrypt (12 rounds)
- ✅ JWT tokens stored in httpOnly cookies
- ✅ Secure & sameSite flags (CSRF protection)
- ✅ Middleware protects all /admin routes
- ✅ 24-hour session expiration
- ✅ Environment variables for all secrets

---

## 📁 Project Structure

```
/app
  /admin
    /components      # Dashboard components
    /utils           # Filter utilities
    /login           # Login page
    page.tsx         # Dashboard main page
  /api
    /auth            # Login/logout endpoints
    /submissions     # CRUD operations
    /export          # CSV/Excel export
    /contact         # Contact form endpoint
  /about             # About page
  /services          # Services page
  layout.tsx         # Root layout
  page.tsx           # Home page

/components          # Shared React components
/lib                 # Backend utilities
  google-sheets.ts   # Google Sheets API
  db.ts              # SQLite database
  merge-data.ts      # Merge Sheets + metadata
  auth.ts            # Authentication
  export.ts          # CSV/Excel generation

/types               # TypeScript types
/data                # SQLite database file (created automatically)

middleware.ts        # Route protection
next.config.mjs      # Next.js configuration
.env.local           # Environment variables (DO NOT COMMIT)
```

---

## 🐛 Troubleshooting

### "Google Sheets credentials not configured"

- Make sure `.env.local` has `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY`
- Check that the private key includes `\n` characters (not actual newlines)

### "Invalid password" on login

- Regenerate the password hash using the command above
- Make sure you're using the same password you hashed
- Update `ADMIN_PASSWORD_HASH` in `.env.local`

### "Failed to fetch submissions"

- Check that Google Sheets API is enabled
- Verify the service account has access to your sheet
- Check browser console for detailed errors

### Can't access /admin

- Make sure you're logged in at `/admin/login` first
- Check that JWT_SECRET is set in `.env.local`
- Try clearing browser cookies

---

## 📈 Next Steps / Future Enhancements

Possible additions for the future:
- Email notifications when new submissions arrive
- Multiple admin users with different permissions
- Advanced analytics and charts
- Auto-reply to form submissions
- Integration with CRM systems
- Spam filtering

---

## 🔧 Deployment to Production

### Recommended: Vercel (Free Tier)

1. Push your code to GitHub

2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. In Vercel Dashboard, add environment variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `ADMIN_PASSWORD_HASH`
   - `JWT_SECRET`

5. Redeploy if needed

**Important**: The SQLite database will need to persist between deployments. Consider:
- Using Vercel Blob Storage (recommended)
- Migrating to PostgreSQL (Vercel Postgres or Supabase)

---

## 📞 Support

If you encounter issues:
1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure Google Sheets API is properly configured
4. Test with a simple submission from the contact form first

---

## 🎨 Customization

The dashboard uses your existing design system:
- Glass-morphism effects
- Purple accent color (#a855f7)
- Dark theme
- Tailwind CSS

To customize:
- Colors: Update in component files (search for `purple-`)
- Layout: Modify components in `/app/admin/components`
- Features: Add new API routes in `/app/api`

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
