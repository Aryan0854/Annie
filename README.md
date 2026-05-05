# Netflix Anniversary Celebration 🎬❤️

A personalized Netflix-style web application celebrating an anniversary, built with React, Tailwind CSS, and Framer Motion.

## ✨ Key Features - UPDATED

### 1. **Intro Sequence with Video** 🎬
- **Netflix.jpg Logo**: Real Netflix logo image displayed prominently
- **Intro Video**: `/Intro.mp4` auto-plays on background with gradient overlay
- **3D Flip Animation**: Logo rotates and scales in with spring physics
- **Animated Rings**: Pulsing red borders create dramatic entrance
- **NETFLIX Text**: Bold uppercase text with letter spacing

### 2. **Who's Watching? Profile Selection** 👤
- Clean Netflix-style design
- **Year 1, Year 2, Year 3** profile labels
- Character silhouette icons
- **Year badges**: Red Netflix badges on each profile
- Hover effects: Scale + white border
- "Add Profile" option with plus icon

### 3. **Home Page (Netflix Experience)** 🏠
- Hero section with photo background
- Title: "Life of Jia & Aryan"
- "Play" and "More Info" buttons
- 3 Content Rows with hover-expand cards

### 4. **Credits Sequence** 🎭
- Movie-style scrolling credits
- Custom entries for the celebration

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS 3.4** for styling
- **Framer Motion** for animations
- **Heroicons** for UI icons

## 📁 Project Structure

```
public/
  Intro.mp4              # Intro video
  Netflix.jpg            # Netflix logo image
src/
  App.tsx               # Main component (UPDATED)
  ContentRow.tsx        # Content row component
  main.tsx              # Entry point
  index.css             # Global styles
  App.css               # App styles
```

## 🚀 Getting Started

### Installation

```bash
cd netflix-anniversary
npm install
```

### Development Server

```bash
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## 🎨 Customization

### Replace Intro Video

1. Replace `public/Intro.mp4` with your own video
2. Video should be short (3-5 seconds recommended)

### Replace Logo

1. Replace `public/Netflix.jpg` with your preferred logo
2. Or change the src in App.tsx line 59

### Update Profile Years

Edit the profile array in `App.tsx` (lines 92-115):
- Change "Year 1", "Year 2", "Year 3"
- Add more profiles as needed

### Modify Credits

Edit the credits section in `App.tsx` (lines 140-152):
- Update directed by, cast, soundtrack, etc.

### Change Colors

Update `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      netflixRed: '#e50914', // Netflix red
    },
  },
}
```

## 🔍 Technical Details

### Animations

- **Framer Motion** for all transitions
- Spring physics for natural movement
- Staggered reveals for content rows
- Smooth hover interactions

### Responsive Design

- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interactions

### Performance

- Optimized bundle: ~106 kB
- Lazy loading where applicable
- Efficient re-renders

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm install gh-pages --save-dev
```
Add to package.json:
```json
"homepage": "https://<username>.github.io/<repo>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

## 🎯 Features Checklist

- [x] Netflix.jpg logo everywhere
- [x] Intro video (Intro.mp4)
- [x] Year 1, 2, 3 profiles
- [x] Netflix red color scheme
- [x] Smooth animations
- [x] Responsive design
- [x] Production build
- [x] No TypeScript errors

## 🤝 License

Personal use - Customize freely for your celebration! ❤️

## 📝 Notes

- Built for Jia & Aryan Anniversary
- All placeholder content easily customizable
- Optimized for mobile viewing
- Ready for deployment to Vercel/GitHub Pages
