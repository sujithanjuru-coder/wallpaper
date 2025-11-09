import { type ArtStyle, type WallpaperSize, DeviceType } from './types';

export const ART_STYLES: ArtStyle[] = [
  { id: 'photorealistic', name: 'Photorealistic', promptModifier: 'photorealistic, 8k, hyper-detailed, cinematic lighting' },
  { id: 'anime', name: 'Anime', promptModifier: 'anime style, vibrant, detailed, by studio ghibli and makoto shinkai' },
  { id: 'cyberpunk', name: 'Cyberpunk', promptModifier: 'cyberpunk style, neon-drenched, dystopian future, high-tech, Blade Runner aesthetic' },
  { id: 'fantasy', name: 'Fantasy', promptModifier: 'epic fantasy art, majestic, ethereal, detailed, lord of the rings style' },
  { id: 'abstract', name: 'Abstract', promptModifier: 'abstract art, geometric shapes, vibrant colors, minimalist' },
  { id: 'impressionism', name: 'Impressionism', promptModifier: 'impressionist painting, soft light, visible brush strokes, style of Monet' },
];

export const WALLPAPER_SIZES: Record<DeviceType, WallpaperSize[]> = {
  [DeviceType.Desktop]: [
    { label: '4K (3840x2160)', width: 3840, height: 2160, aspectRatio: '16:9' },
    { label: 'WQHD (2560x1440)', width: 2560, height: 1440, aspectRatio: '16:9' },
    { label: 'FHD (1920x1080)', width: 1920, height: 1080, aspectRatio: '16:9' },
    { label: 'Ultrawide (3440x1440)', width: 3440, height: 1440, aspectRatio: '16:9' },
  ],
  [DeviceType.Tablet]: [
    { label: 'iPad Pro 12.9" (2732x2048)', width: 2732, height: 2048, aspectRatio: '4:3' },
    { label: 'iPad Air (2360x1640)', width: 2360, height: 1640, aspectRatio: '4:3' },
    { label: 'Galaxy Tab S9 (2560x1600)', width: 2560, height: 1600, aspectRatio: '16:9' },
  ],
  [DeviceType.Mobile]: [
    { label: 'iPhone 15 Pro Max (1290x2796)', width: 1290, height: 2796, aspectRatio: '9:16' },
    { label: 'Pixel 8 Pro (1344x2992)', width: 1344, height: 2992, aspectRatio: '9:16' },
    { label: 'Galaxy S24 Ultra (1440x3120)', width: 1440, height: 3120, aspectRatio: '9:16' },
  ],
};
