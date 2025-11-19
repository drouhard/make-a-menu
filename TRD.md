# Technical Requirements Document (TRD)
## Menu Maker - Restaurant Menu Generator & Play Kit

### 1. Technical Overview
A client-side single-page application (SPA) built with React that generates restaurant menus using OpenAI's API and provides print-optimized outputs.

### 2. Technology Stack

#### 2.1 Frontend Framework
- **React 18+** with TypeScript
- **Vite** for build tooling and dev server
- **Tailwind CSS** for styling and print layouts

#### 2.2 External APIs
- **OpenAI API** (gpt-4 for text, dall-e-3 for images)
  - Text generation: menu items, descriptions, prices
  - Image generation: food photography for each item

#### 2.3 Storage
- **localStorage** for API key persistence
- No backend database required

### 3. Architecture

#### 3.1 Component Structure
```
App
├── Header
├── MenuGenerator (form for AI generation)
│   ├── APIKeyInput
│   └── PromptInput
├── MenuDisplay (shows current menu)
│   ├── MenuHeader (restaurant name)
│   └── MenuSection (category with items)
│       └── MenuItem (name, description, price)
├── ItemCards (printable cards view)
│   └── ItemCard (individual card with image)
└── PrintControls (print menu/cards buttons)
```

#### 3.2 Data Models

```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  category: string;
}

interface MenuSection {
  category: string;
  items: MenuItem[];
}

interface Restaurant {
  name: string;
  description?: string;
  sections: MenuSection[];
}
```

### 4. Core Functionality

#### 4.1 Starter Menu
- Hardcoded sushi restaurant data
- Includes all sections: Rolls, Nigiri, Appetizers, Beverages
- Pre-generated placeholder images or data URLs
- Loaded on app initialization

#### 4.2 AI Menu Generation

**Text Generation Flow:**
1. User submits prompt
2. Call OpenAI Chat Completions API with structured prompt:
   ```
   Generate a complete menu for a {user_prompt} restaurant.
   Include restaurant name, 3-5 categories, and 3-6 items per category.
   For each item provide: name, description (20-30 words), price.
   Return as JSON.
   ```
3. Parse JSON response into Restaurant data structure
4. Update application state

**Image Generation Flow:**
1. For each menu item, call DALL-E API:
   ```
   Professional food photography of {item_name}: {item_description}
   Restaurant quality, well-lit, appetizing
   ```
2. Receive image URL
3. Update menu item with imageUrl
4. Display in item cards

**Error Handling:**
- Invalid API key: Show error message
- API rate limits: Display friendly error
- Generation failures: Allow retry
- Partial failures: Show menu without images

#### 4.3 Print Functionality

**Print Stylesheets:**
```css
@media print {
  /* Hide UI elements (buttons, forms) */
  /* Optimize layout for 8.5x11" paper */
  /* Ensure page breaks don't split items */
  /* High contrast for readability */
}
```

**Print Views:**
1. **Menu Print**: Single/multi-page restaurant menu
   - Header with restaurant name
   - Sections with items
   - Professional typography

2. **Item Cards Print**: Grid of cards (4-6 per page)
   - Item image (large)
   - Item name and description
   - Cut lines/borders for separation

### 5. Technical Implementation Details

#### 5.1 State Management
- React useState for current menu
- React useState for loading states
- localStorage utilities for API key

#### 5.2 API Integration

**OpenAI Client Setup:**
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: userProvidedKey,
  dangerouslyAllowBrowser: true // Client-side usage
});
```

**Text Generation:**
- Model: gpt-4 or gpt-3.5-turbo
- Temperature: 0.7 (creative but consistent)
- Response format: JSON mode
- Max tokens: 2000

**Image Generation:**
- Model: dall-e-3
- Size: 1024x1024
- Quality: standard
- Async generation with loading states

#### 5.3 Performance Considerations
- Lazy load images
- Show loading states during generation
- Cache generated images (localStorage/sessionStorage if needed)
- Debounce API calls

#### 5.4 Security
- API key never sent to backend (client-side only)
- Validate API key format before use
- Clear security warning about API key storage
- No sensitive data stored

### 6. File Structure
```
make-a-menu/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MenuGenerator.tsx
│   │   ├── MenuDisplay.tsx
│   │   ├── MenuItem.tsx
│   │   ├── MenuSection.tsx
│   │   ├── ItemCards.tsx
│   │   ├── ItemCard.tsx
│   │   └── PrintControls.tsx
│   ├── data/
│   │   └── sushiMenu.ts (starter menu)
│   ├── services/
│   │   └── openai.ts (API integration)
│   ├── types/
│   │   └── menu.ts (TypeScript interfaces)
│   ├── utils/
│   │   └── storage.ts (localStorage helpers)
│   ├── App.tsx
│   ├── App.css (print styles)
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── index.html
```

### 7. Development Phases

**Phase 1: Setup & Structure**
- Initialize Vite + React + TypeScript
- Install dependencies
- Set up Tailwind CSS
- Create basic component structure

**Phase 2: Starter Menu**
- Define TypeScript types
- Create sushi menu data
- Build MenuDisplay components
- Style menu layout

**Phase 3: Print Functionality**
- Add print CSS
- Create ItemCards view
- Implement print buttons
- Test print output

**Phase 4: AI Generation**
- Integrate OpenAI SDK
- Build MenuGenerator UI
- Implement text generation
- Implement image generation
- Add loading states

**Phase 5: Polish**
- Error handling
- UI improvements
- Responsive design
- Testing

### 8. Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Print functionality tested in all browsers

### 9. Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "openai": "^4.20.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2",
    "typescript": "^5.0.0",
    "vite": "^4.3.9"
  }
}
```

### 10. Environment Variables
None required - API key provided by user at runtime

### 11. Build & Deployment
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- Deploy to static hosting (Vercel, Netlify, GitHub Pages)

### 12. Testing Strategy
- Manual testing of menu generation
- Print output testing on physical printer
- API error scenario testing
- Browser compatibility testing
- Mobile responsive testing (view mode)

### 13. Known Limitations
- API costs borne by user
- Image generation takes time (20-30s per image)
- Browser print dialog limitations
- localStorage size limits (minimal concern)
- CORS considerations for client-side OpenAI usage
