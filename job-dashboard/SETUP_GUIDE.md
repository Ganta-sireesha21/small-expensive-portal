# Job Dashboard Admin Panel - Complete Setup Guide

## Overview

This is a full-featured Mini Admin Dashboard for managing job listings with Supabase backend. Features include:

✅ Admin authentication (email/password)
✅ Complete CRUD operations for jobs
✅ Search and filter functionality
✅ Pagination support
✅ Form validation
✅ Toast notifications
✅ Responsive design
✅ Clean, modern UI

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account (free tier available at https://supabase.com)

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- React & React DOM
- Supabase Client
- React Hot Toast (for notifications)
- React Icons (for UI icons)
- Vite (build tool)

### 2. Set Up Supabase

#### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in project details:
   - Name: `job-dashboard` (or your preferred name)
   - Database Password: Create a strong password
   - Region: Choose closest to you
4. Wait for project initialization (2-3 minutes)

#### Create the Jobs Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste the following SQL:

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  salary INTEGER NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended for production)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all users to read and modify jobs
CREATE POLICY "Enable all operations for all users" ON jobs
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

4. Click "Run"

#### Get Your Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (looks like: `https://xxxxxxxxxxxx.supabase.co`)
   - **anon key** (public key)

### 3. Configure Environment Variables

1. In the project root, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Open `.env.local` and replace with your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Authentication

#### Create Admin User in Supabase

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Create new user"
3. Enter:
   - Email: `admin@example.com` (or your email)
   - Password: Create a strong password
   - Auto confirm user: Check this box

### 5. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 6. Login & Test

1. Go to the login page
2. Enter your admin credentials
3. You should see the dashboard with the Jobs management interface

## Project Structure

```
src/
├── components/
│   ├── JobForm.jsx         # Add/Edit job form
│   ├── JobsTable.jsx       # Jobs table with search & filter
│   └── Sidebar.jsx         # Navigation sidebar
├── pages/
│   ├── Dashboard.jsx       # Main dashboard page
│   └── Login.jsx           # Login page
├── styles/
│   ├── Auth.css            # Login & auth styles
│   ├── Dashboard.css       # Dashboard layout
│   ├── JobForm.css         # Form styles
│   ├── JobsTable.css       # Table & search styles
│   └── Sidebar.css         # Sidebar styles
├── supabase/
│   └── client.js           # Supabase client setup
├── utils/
│   └── validation.js       # Form validation functions
├── App.jsx                 # Main app component
└── main.jsx                # Entry point
```

## Features

### 1. Authentication
- Email/password login
- Session management
- Auto-redirect to login if not authenticated
- Logout functionality

### 2. Job Management
- **Create**: Add new jobs with title, salary, location
- **Read**: View all jobs in a clean table format
- **Update**: Edit existing job details
- **Delete**: Remove jobs with confirmation dialog

### 3. Search & Filter
- Search jobs by title or location
- Filter jobs by location
- Real-time search results

### 4. Pagination
- Display 5 jobs per page
- Navigation buttons
- Shows total count of jobs

### 5. Form Validation
- Required field validation
- Email format validation
- Salary minimum validation
- Error messages displayed to user

### 6. User Experience
- Toast notifications for all actions
- Loading states for async operations
- Responsive design (mobile, tablet, desktop)
- Clean, modern UI with consistent colors

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## API Endpoints Used

All data operations go through Supabase:

- **GET** /jobs - Fetch all jobs
- **POST** /jobs - Create new job
- **UPDATE** /jobs - Update existing job
- **DELETE** /jobs - Delete a job

## Styling

The dashboard uses a modern color scheme:
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Danger: `#dc3545` (Red)
- Background: `#f5f7fa` (Light Gray)

### Component-Specific Styles
- `Auth.css` - Login page styling
- `Sidebar.css` - Navigation styling
- `Dashboard.css` - Layout and header
- `JobForm.css` - Form styling
- `JobsTable.css` - Table and search styling

## Troubleshooting

### Issue: "Missing Supabase credentials"
**Solution**: Check that `.env.local` file exists and contains correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` values. Restart dev server after adding environment variables.

### Issue: Login fails with "Invalid credentials"
**Solution**: 
- Verify you created the admin user in Supabase Authentication
- Check that user is "Auto confirmed"
- Ensure email and password are correct

### Issue: "Failed to fetch jobs"
**Solution**:
- Verify the jobs table exists in Supabase
- Check that RLS policies allow access (or disable RLS for testing)
- Check browser console for detailed error messages

### Issue: Styles not loading
**Solution**: Make sure all CSS imports are correct in `App.jsx`. Clear browser cache and restart dev server.

## Security Notes

⚠️ **Development Mode**:
- Row Level Security (RLS) is disabled for easier testing
- Anonymous key is used (intended for public client)

🔒 **Production Setup**:
- Enable Row Level Security (RLS) policies
- Use service role key for admin operations
- Implement proper authentication and authorization
- Add rate limiting
- Enable CORS properly
- Implement audit logging

## Data Structure

### Jobs Table Schema

```sql
jobs {
  id: UUID (Primary Key)
  title: TEXT (Job title)
  salary: INTEGER (Annual salary in USD)
  location: TEXT (Job location)
  created_at: TIMESTAMP (Created timestamp, defaults to NOW())
}
```

## Sample Data

To add sample jobs for testing:

1. Go to Supabase **SQL Editor**
2. Run this query:

```sql
INSERT INTO jobs (title, salary, location) VALUES
  ('Senior React Developer', 120000, 'San Francisco, CA'),
  ('Full Stack Engineer', 110000, 'New York, NY'),
  ('DevOps Engineer', 130000, 'Remote'),
  ('UI/UX Designer', 95000, 'Los Angeles, CA'),
  ('Data Scientist', 125000, 'Seattle, WA');
```

## Performance Tips

1. **Pagination**: Jobs are loaded in pages of 5 items to keep performance high
2. **Search**: Uses client-side filtering for instant results
3. **Caching**: Supabase client automatically caches responses

## Future Enhancements

Consider adding:
- [ ] Admin user management
- [ ] Job analytics and statistics
- [ ] Bulk import/export jobs
- [ ] Email notifications
- [ ] Job status tracking (active/inactive)
- [ ] Application tracking system
- [ ] Advanced filtering by salary range
- [ ] Sorting options
- [ ] Dark mode

## Support & Contribution

For issues or contributions, please refer to the main project repository.

## License

This project is open source and available under the MIT License.

---

**Happy job listing managing! 🚀**
