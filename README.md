# GroomArc AI Frontend

React-based frontend for the GroomArc AI chat application.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The frontend will start on: http://localhost:3000

### 3. Build for Production
```bash
npm run build
```

## Features

- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** via CDN (no build dependencies)
- **Responsive Design** for mobile and desktop
- **Real-time Chat Interface** with typing indicators
- **Avatar Selection** with multiple personalities
- **Category-based Navigation**

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── assets/         # Images and static files
│   ├── types.ts        # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── styles.css      # Global styles
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Development

- **Hot Reload**: Changes reflect immediately
- **TypeScript**: Full type safety
- **ESLint**: Code quality and consistency
- **Proxy**: API calls automatically routed to backend

## Backend Integration

The frontend expects the backend to be running on `http://localhost:5000`. Make sure to start the backend separately.

## Troubleshooting

1. **Port conflicts**: Change port in `vite.config.ts`
2. **API errors**: Ensure backend is running on port 5000
3. **Styling issues**: Check that Tailwind CDN is loading
