# Studio Associato Giuliano Lello Coco - Website

Professional tax and accounting consulting firm website built with modern web technologies.

## Features

- Modern, responsive React + TypeScript interface
- Smooth animations and interactive UI with glass-morphism design
- Mobile-first responsive design
- Contact form with client-side persistence
- Multi-section layout (Hero, Services, Benefits, Testimonials, About, Contact)
- ElevenLabs ConvAI integration for interactive customer support
- Dynamic background effects with cursor tracking

## Tech Stack

- **Frontend Framework:** React 19.2.3 with TypeScript 5.8
- **Build Tool:** Vite 6.2.0
- **Styling:** Tailwind CSS (CDN)
- **Icons:** Lucide React 0.562.0
- **Fonts:** Google Fonts (Instrument Serif + Inter)
- **AI Integration:** ElevenLabs ConvAI widget

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lorenzogiuffrida64-creator/studio-associato-lello-coco.git
   cd studio-associato-lello-coco
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
studio-associato-giuliano-lello-coco/
├── components/          # React components
│   ├── Header.tsx      # Navigation header with mobile menu
│   ├── Hero.tsx        # Landing section with image carousel
│   ├── About.tsx       # About/Chi Siamo page
│   ├── Benefits.tsx    # Services and benefits section
│   ├── Testimonials.tsx # Client reviews
│   ├── Contact.tsx     # Contact form
│   ├── Footer.tsx      # Footer navigation
│   └── BackgroundEffects.tsx # Animated background
├── App.tsx             # Main application component
├── index.tsx           # React entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Features Breakdown

### Contact Form
- Client-side form with localStorage persistence
- Stores submissions locally under `studio_giuliano_contatti` key
- **Note for Production:** Integrate with an email service (SendGrid, Mailgun, etc.) or backend API for real form submissions

### Responsive Navigation
- Fixed header with smooth scroll navigation
- Mobile hamburger menu with slide-in animation
- Active section indicators

### Dynamic Background Effects
- Cursor-following gradient effect
- Scroll-based animations
- Glass-morphism design pattern throughout

### ElevenLabs ConvAI Widget
- Interactive conversational AI widget
- Agent ID: `agent_6501kdehcr3cehsbxmv5ak7hhdrd`
- Provides automated customer support and engagement

## Customization

### Contact Information

**IMPORTANT:** The contact details are currently placeholders and need to be updated with real information.

Located in `/components/Contact.tsx` (lines 63, 73, 83):
- **Address:** Via Asiago, 38, 95127 Catania CT
- **Email:** studiocomgls@tiscali.it
- **Phone:** +39 095 444183

Please update these with your actual studio contact information before going live.

### Images

**IMPORTANT:** The site currently uses placeholder images from Unsplash that need to be replaced with real studio photos.

Images to replace:
- **Hero Section** (`/components/Hero.tsx`): Team and office photos
- **About Section** (`/components/About.tsx`): Team member photos

Replace Unsplash URLs with your actual studio images for a professional appearance.

## Development Notes

### TypeScript
- Strict mode enabled with comprehensive type coverage
- React 19 with full TypeScript support
- Component-level type definitions

### Performance Optimizations
- Lazy image loading with `loading="lazy"` attribute
- Scroll event listeners use passive flag
- CSS animations leverage GPU acceleration (transform, opacity)
- Vite's fast Hot Module Replacement (HMR)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS Safari, Chrome Mobile)
- Responsive breakpoints: mobile, tablet (md), desktop (lg)

## Environment Variables

This project uses environment variables for configuration. See `.env.example` for available options:

```bash
GEMINI_API_KEY=your_api_key_here
```

**Note:** The Gemini API key is currently not used in the application but is documented for potential future integrations.

## Production Deployment

Before deploying to production:

1. ✅ Update contact information in `Contact.tsx`
2. ✅ Replace placeholder images with real studio photos
3. ✅ Integrate contact form with backend email service
4. ✅ Configure ElevenLabs ConvAI widget settings
5. ✅ Add Google Analytics or similar tracking (optional)
6. ✅ Test on multiple devices and browsers
7. ✅ Verify all links and navigation work correctly

### Deployment Options

- **Vercel:** `npm run build` and connect GitHub repository
- **Netlify:** Drag & drop `dist/` folder or connect repository
- **GitHub Pages:** Use `gh-pages` package
- **Traditional Hosting:** Upload `dist/` contents to web server

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests with improvements.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contact

For inquiries about the Studio Associato Giuliano Lello Coco services or this website:
- Email: studiocomgls@tiscali.it
- Location: Catania, Sicily, Italy

---

Built with React, TypeScript, and Vite
