# Menu Maker - Restaurant Menu Generator & Play Kit

A web application that generates professional restaurant menus with AI-generated images, perfect for both practical use and family entertainment.

## 🚀 Live Demo

**[View Live Demo](https://drouhard.github.io/make-a-menu/)**

Try it now! The starter sushi menu is ready to view and print immediately. To generate custom menus, you'll need your own OpenAI API key.

> **Note:** To enable the live demo, make sure to:
> 1. Make this repository public (Settings → General → Change visibility)
> 2. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
> 3. The app will auto-deploy when changes are pushed to main or the current branch

## Features

- **Starter Menu**: Pre-loaded authentic sushi restaurant menu
- **AI Menu Generation**: Create custom menus using OpenAI's GPT-4 and DALL-E 3
- **Printable Menus**: Professional restaurant-style menu layout
- **Item Cards**: Printable cards with images for playing restaurant at home
- **Two View Modes**:
  - Restaurant Menu: Traditional menu layout
  - Item Cards: Individual cards for interactive play

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- OpenAI API key (for custom menu generation)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

The app includes a GitHub Actions workflow that automatically deploys to GitHub Pages:

1. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Under "Source", select "GitHub Actions"

2. **Push to main or current branch** - the workflow will automatically build and deploy

3. **Access your live site** at `https://drouhard.github.io/make-a-menu/`

Alternatively, you can manually deploy:

```bash
npm run deploy
```

## Usage

### Using the Starter Menu

1. Open the application
2. The Sakura Sushi House menu is displayed by default
3. Toggle between "Restaurant Menu" and "Item Cards" views
4. Click "Print Menu" or "Print Cards" to print

### Generating a Custom Menu

1. Enter your OpenAI API key (it's stored locally in your browser)
2. Enter a restaurant type or description (e.g., "Italian pizzeria", "Thai restaurant")
3. Click "Generate Menu with Images"
4. Wait for the menu and images to be generated (this takes 1-2 minutes)
5. Your new menu will appear, ready to print!

### Printing

- **Restaurant Menu**: Print a traditional restaurant-style menu
- **Item Cards**: Print individual cards (2 per page) that can be cut out for playing restaurant

## Technology Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- OpenAI API (GPT-4 + DALL-E 3)

## Privacy & Security

- Your OpenAI API key is stored only in your browser's localStorage
- No data is sent to any server except OpenAI
- All processing happens client-side

## Cost Considerations

When generating custom menus:
- Menu text generation: ~$0.10 per menu
- Image generation: ~$0.04 per image (20-25 images per menu)
- Total cost per custom menu: ~$1-2

You control the costs by using your own API key.

## License

MIT

## Documentation

See also:
- [PRD.md](./PRD.md) - Product Requirements Document
- [TRD.md](./TRD.md) - Technical Requirements Document
