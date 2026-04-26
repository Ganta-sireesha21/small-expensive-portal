# Job Dashboard Admin Panel 🚀

A full-featured admin dashboard for managing job listings with Supabase backend. Built with React + Vite + Supabase.

## Features ✨

- 🔐 **Admin Authentication** - Email/password login with Supabase
- 📋 **Complete CRUD** - Create, read, update, delete job listings
- 🔍 **Search & Filter** - Search by job title or location
- 📄 **Pagination** - View jobs with 5 items per page
- ✅ **Form Validation** - Client-side validation with error messages
- 🔔 **Toast Notifications** - Real-time feedback on all actions
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean interface with professional styling

## Tech Stack

- **Frontend**: React 19, Vite
- **Backend**: Supabase (PostgreSQL + Auth)
- **UI Enhancements**: React Hot Toast, React Icons
- **Styling**: CSS3 with modern features

## Quick Start

### Prerequisites
- Node.js v14+
- Supabase account (free at https://supabase.com)

### Installation

1. **Clone or navigate to project**:
```bash
cd job-dashboard
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up Supabase** (see [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions):
   - Create a Supabase project
   - Create `jobs` table
   - Get your credentials

4. **Configure environment**:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

5. **Start development server**:
```bash
npm run dev
```

6. **Open browser**:
Navigate to `http://localhost:5173` and login with your admin credentials.

## Project Structure

```
src/
├── components/          # React components
│   ├── JobForm.jsx     # Add/Edit job form
│   ├── JobsTable.jsx   # Jobs table with search
│   └── Sidebar.jsx     # Navigation sidebar
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   └── Login.jsx       # Login page
├── styles/             # Component styles
├── supabase/           # Supabase client config
├── utils/              # Utility functions
└── App.jsx             # Root component
```

## Usage

### Login
1. Enter your admin email and password
2. Click "Login"

### Manage Jobs
- **View**: All jobs displayed in a sortable table
- **Create**: Click "Add New Job" and fill in the form
- **Edit**: Click edit icon in the jobs table
- **Delete**: Click delete icon (with confirmation)

### Search & Filter
- Use the search box to find jobs by title or location
- Use the location dropdown to filter by specific location
- Results update in real-time

## Database Schema

```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  salary INTEGER NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment Variables

Create a `.env.local` file:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Troubleshooting

**Login fails?**
- Verify user exists in Supabase Authentication
- Check email and password are correct
- Ensure user is "Auto confirmed"

**Can't see jobs?**
- Verify jobs table exists in Supabase
- Check RLS policies aren't blocking access
- Check console for error messages

**Styles not loading?**
- Clear browser cache
- Restart dev server

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for more detailed troubleshooting.

## Production Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Deploy to Vercel, Netlify, or GitHub Pages
- Push to GitHub
- Connect to hosting platform
- Set environment variables
- Deploy!

### Security Checklist
- [ ] Enable Row Level Security (RLS) on Supabase
- [ ] Use service role keys for admin operations only
- [ ] Implement proper authentication
- [ ] Add rate limiting
- [ ] Enable CORS properly
- [ ] Use HTTPS only
- [ ] Audit logs enabled

## Features Included

### Bonus Features Implemented ✅
- ✅ Search/filter jobs by title and location
- ✅ Pagination (5 jobs per page)
- ✅ Client-side form validation
- ✅ Toast notifications for all actions
- ✅ Error handling with user feedback
- ✅ Loading states on buttons
- ✅ Confirmation dialog for delete
- ✅ Responsive design
- ✅ Clean, professional UI
- ✅ Comprehensive documentation

## Future Enhancements

Consider adding:
- Admin user management
- Job analytics dashboard
- Bulk import/export
- Advanced filtering
- Dark mode
- Application tracking system

## Support

For issues or questions, check the [SETUP_GUIDE.md](./SETUP_GUIDE.md) or review component documentation.

## License

MIT License - feel free to use this project for learning or production!

---

**Built with ❤️ for job management excellence**

