# कॉफी हाउस (Coffee House) - Rajasthani Themed Coffee Shop Website

A React and TypeScript-based coffee shop website featuring a rich Rajasthani cultural theme with sophisticated animations using GSAP.

## Features

- **Rajasthani Cultural Theme**: Authentic design elements from Rajasthani culture integrated throughout
- **Advanced GSAP Animations**: Smooth, theatrical animations including curtain transitions
- **Responsive Design**: Fully responsive across all device sizes
- **Multiple Theme Options**: Switch between standard, GSAP, and Rajasthani themed versions
- **TypeScript**: Type-safe code throughout the application
- **TailwindCSS**: Custom extended theme with Rajasthani color palette

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yashchitale96/Coffee-.git
   cd Coffee-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Theme Selection

You can switch between three different theme versions by modifying the `APP_VERSION` variable in `src/main.tsx`:

- `'standard'`: Original design with Framer Motion animations
- `'gsap'`: Enhanced design with GSAP animations
- `'rajasthani'`: Full Rajasthani cultural theme (default)

## Key Components

- `RajasthaniLoadingScreen`: Theatrical loading screen with Rajasthani cultural elements
- `RajasthaniNavigation`: Navigation with cultural styling
- `RajasthaniHero`: Hero section with Rajasthani character and cultural motifs
- `RajasthaniMenu`: Menu display with ornate Rajasthani styling

## Customization

The Rajasthani theme can be customized through:

- `tailwind.config.js`: Contains the Rajasthani color palette and theme extensions
- `src/utils/rajasthaniTheme.css`: Custom CSS utilities for Rajasthani design elements
- `src/utils/rajasthaniAnimations.ts`: GSAP animation utilities for cultural animations

## Technologies Used

- React
- TypeScript
- TailwindCSS
- GSAP (GreenSock Animation Platform)
- Vite

## License

This project is licensed under the MIT License - see the LICENSE file for details.