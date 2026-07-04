# Media Folder Structure

This folder stores all local videos, images, and thumbnails for the project.

## Organization

```
media/
├── images/          # Full-size images
├── videos/          # Video files (MP4, WebM, etc.)
└── thumbnails/      # Thumbnail images for cards
```

## How to Add Media

1. **Images**: Add full-size images to `media/images/`
   - Example: `media/images/year1-first-date.jpg`

2. **Videos**: Add video files to `media/videos/`
   - Example: `media/videos/year1-first-date.mp4`

3. **Thumbnails**: Add thumbnail versions to `media/thumbnails/`
   - Example: `media/thumbnails/year1-first-date.jpg`

## Reference in Code

In `src/data/memories.ts`, reference files like:

```typescript
// For thumbnail
thumbnail: 'to-pink-400',

// For image paths
imageUrl: '/media/images/year1-first-date.jpg',

// For video paths
imageUrl: '/media/videos/year1-first-date.mp4',
```

## Naming Convention

- Use kebab-case: `year1-first-date` (not `Year1FirstDate`)
- Include context: `year1-travel-beach-day`
- Keep names short and descriptive
