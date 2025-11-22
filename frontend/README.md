# TinyLink Frontend

Modern, responsive frontend for TinyLink URL Shortener built with Next.js, TypeScript, and shadcn/ui.

## Features

- ✅ **Dashboard**: View all links with search/filter functionality
- ✅ **Create Links**: Add new short links with custom or auto-generated codes
- ✅ **Statistics**: Detailed analytics for each short link
- ✅ **Real-time Updates**: React Query for optimistic updates and caching
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Modern UI**: shadcn/ui components with Tailwind CSS
- ✅ **Toast Notifications**: User feedback for all actions

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Context API
- **Data Fetching**: TanStack React Query (formerly React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Notifications**: Sonner

## Project Structure

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── code/[code]/          # Stats page for individual links
│   │   │   └── page.tsx
│   │   ├── globals.css           # Global styles & CSS variables
│   │   ├── layout.tsx            # Root layout with providers
│   │   └── page.tsx              # Dashboard page (home)
│   ├── apis/                     # API request functions
│   │   └── links.ts              # Link-related API calls
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── alert.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   └── table.tsx
│   │   ├── AddLinkDialog.tsx    # Dialog for creating links
│   │   ├── LinksTable.tsx        # Table component for displaying links
│   │   ├── Providers.tsx         # App-wide providers
│   │   └── SearchBar.tsx         # Search/filter component
│   ├── config/                   # Configuration files
│   │   └── axiosConfig.ts        # Axios instance setup
│   ├── context/                  # React Context
│   │   └── LinkContext.tsx       # Global link state
│   ├── hooks/                    # Custom React hooks
│   │   ├── useCreateLink.ts      # Create link mutation
│   │   ├── useDeleteLink.ts      # Delete link mutation
│   │   ├── useFetchLinks.ts      # Fetch all links query
│   │   └── useFetchSingleLink.ts # Fetch single link query
│   ├── lib/                      # Utility libraries
│   │   └── utils.ts              # Helper functions (cn, etc.)
│   └── types/                    # TypeScript types
│       └── link.ts               # Link-related types
├── .env.local                    # Local environment variables
├── .env.example                  # Environment variables template
├── components.json               # shadcn/ui configuration
├── next.config.ts                # Next.js configuration
├── package.json
├── tailwind.config.ts            # Tailwind CSS v4 config
└── tsconfig.json                 # TypeScript configuration
```

## Setup

### Prerequisites

- Node.js 18+ and npm
- Backend server running (see `backend/README.md`)

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

   Update the values:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier

## Pages & Routes

### Dashboard (`/`)
The main page where users can:
- View all shortened links in a table
- See total stats (total links, total clicks, active links)
- Search/filter links by code or URL
- Create new short links
- Delete existing links
- View detailed stats for each link

### Stats Page (`/code/:code`)
Detailed statistics page for a single link showing:
- Total clicks
- Creation date/time
- Last clicked date/time
- Short code with copy button
- Full short URL with copy button
- Target URL with copy and open buttons
- Status badge (Active/Unused)

## Key Features

### 1. Dashboard
- **Summary Cards**: Quick overview of total links, clicks, and active links
- **Search/Filter**: Real-time filtering by code or target URL
- **Actions**: Add new links, refresh data, delete links
- **Responsive Table**: Shows code, target URL, clicks, last clicked, and actions
- **Loading States**: Skeleton loaders while data is fetching
- **Empty States**: Helpful message when no links exist

### 2. Create Link Dialog
- **Target URL Input**: Required field with URL validation
- **Custom Code Input**: Optional 6-8 character alphanumeric code
- **Auto-generation**: Automatically generates code if not provided
- **Validation**: Client-side validation with pattern matching
- **Error Handling**: Clear error messages for duplicate codes or invalid inputs

### 3. Link Statistics
- **Real-time Data**: Auto-refreshes when returning to the page
- **Detailed Metrics**: View all stats for a specific link
- **Copy Functionality**: One-click copy for code, short URL, and target URL
- **External Link**: Quick access to target URL
- **Navigation**: Easy back button to return to dashboard

### 4. State Management
- **React Query**: Automatic caching, background updates, and refetching
- **Context API**: Global state for search query and selected link
- **Optimistic Updates**: Instant UI feedback before server confirmation

### 5. User Experience
- **Toast Notifications**: Success/error messages for all actions
- **Confirmation Dialogs**: Prevent accidental deletions
- **Loading Indicators**: Clear feedback during async operations
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

## API Integration

All API calls go through Axios instance configured in `src/config/axiosConfig.ts`.

### Endpoints Used

| Method | Endpoint | Hook | Description |
|--------|----------|------|-------------|
| `POST` | `/api/links` | `useCreateLink` | Create a new link |
| `GET` | `/api/links` | `useFetchLinks` | Get all links |
| `GET` | `/api/links/:code` | `useFetchSingleLink` | Get link by code |
| `DELETE` | `/api/links/:code` | `useDeleteLink` | Delete a link |

### React Query Configuration

```typescript
{
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,        // 1 minute
      refetchOnWindowFocus: false,  // Don't refetch on window focus
      retry: 1,                     // Retry failed requests once
    },
  },
}
```

## Styling

### Tailwind CSS v4
This project uses Tailwind CSS v4 with CSS variables for theming.

### CSS Variables
All colors and spacing are defined in `src/app/globals.css` using CSS custom properties:
- `--background`, `--foreground`
- `--primary`, `--secondary`
- `--muted`, `--accent`
- `--destructive`, `--border`
- And more...

### Dark Mode Ready
The app includes dark mode CSS variables but doesn't implement a theme switcher yet. You can add one easily using the existing CSS variables.

## Type Safety

All API responses, component props, and state are fully typed with TypeScript.

Example types:
```typescript
interface Link {
  _id: string;
  code: string;
  targetUrl: string;
  totalClicks: number;
  lastClicked: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
```

## Performance Optimizations

1. **React Query Caching**: Reduces unnecessary API calls
2. **Memoization**: `useMemo` for filtered data
3. **Code Splitting**: Next.js automatic code splitting
4. **Image Optimization**: Next.js Image component (if needed)
5. **Server Components**: Can convert non-interactive parts to RSC

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend.com
   ```
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend base URL (for healthcheck) | `http://localhost:4000` |

**Note**: All environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Known Issues

- None currently

## Future Enhancements

- [ ] Dark mode toggle
- [ ] QR code generation for short links
- [ ] Export links to CSV
- [ ] Bulk delete
- [ ] Link expiration dates
- [ ] Password-protected links
- [ ] Custom domains
- [ ] Analytics dashboard with charts
- [ ] User authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC
