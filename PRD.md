# Product Requirements Document (PRD)
## Menu Maker - Restaurant Menu Generator & Play Kit

### 1. Overview
Menu Maker is a web application that generates professional restaurant menus with accompanying printable images of menu items. Designed for both practical use and family entertainment, it allows users to create authentic-looking restaurant menus and play restaurant at home.

### 2. Goals & Objectives
- Enable users to generate restaurant-style menus quickly and easily
- Provide printable, professional-looking menu layouts
- Create printable individual item cards with images for interactive play
- Support AI-powered custom menu generation based on user prompts
- Include a ready-to-use starter menu (Sushi Restaurant)

### 3. Target Users
- **Primary**: Families looking for creative play activities
- **Secondary**: Small restaurant owners needing quick menu mockups
- **Tertiary**: Educators and party planners

### 4. Core Features

#### 4.1 Starter Menu
- Pre-loaded sushi restaurant menu including:
  - Rolls (California, Spicy Tuna, Dragon, etc.)
  - Nigiri (Salmon, Tuna, Yellowtail, etc.)
  - Appetizers (Miso Soup, Edamame, Gyoza)
  - Beverages (Ramune, Green Tea, Sake)
- Complete with descriptions and prices
- Immediately usable without configuration

#### 4.2 Menu Display
- Restaurant-style layout with sections
- Item names, descriptions, and prices
- Professional typography and spacing
- Print-optimized formatting
- Responsive design for screen viewing

#### 4.3 Printable Item Cards
- Individual cards for each menu item
- AI-generated images of each dish
- Item name and description on card
- Sized appropriately for handling (playing restaurant)
- Print multiple items per page efficiently

#### 4.4 AI Menu Generation
- User inputs a prompt (e.g., "Italian pizzeria", "French bistro", "Taco truck")
- User provides their own OpenAI API key
- System generates:
  - Restaurant name
  - Menu categories
  - 10-20 menu items with names, descriptions, and prices
  - Images for each menu item
- Generated menu replaces current menu

#### 4.5 Print Functionality
- Separate print views:
  - Full menu (restaurant-style)
  - Item cards (grid layout)
- Print-specific CSS for clean output
- Browser print dialog integration

### 5. User Flow

#### 5.1 First-Time User
1. Opens app, sees starter sushi menu
2. Can immediately print menu or item cards
3. Can explore AI generation feature

#### 5.2 Custom Menu Generation
1. User clicks "Generate New Menu"
2. Enters OpenAI API key (stored locally)
3. Enters menu prompt (e.g., "Mexican street food")
4. Clicks "Generate"
5. System generates menu (shows loading state)
6. New menu appears, ready to print

### 6. Technical Constraints
- Must run in web browser (no backend required)
- API key stored locally (localStorage)
- All generation happens client-side using OpenAI API
- Print functionality uses browser native print

### 7. Success Metrics
- User can generate a menu in under 2 minutes
- Print output is professional quality
- Families can successfully use printed materials for play
- Menu generation succeeds with valid API key

### 8. Out of Scope (v1)
- User accounts / authentication
- Saving multiple menus
- Editing individual menu items
- Custom image uploads
- Backend storage
- Menu templates beyond AI generation

### 9. Design Requirements
- Clean, modern interface
- High contrast for readability
- Professional menu aesthetics
- Child-friendly item cards
- Mobile-responsive for viewing (print is primary output)

### 10. Future Considerations
- Save/load multiple menus
- Menu item editing
- Additional menu templates
- Export to PDF
- Sharing capabilities
