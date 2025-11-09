export enum DeviceType {
  Desktop = 'Desktop',
  Tablet = 'Tablet',
  Mobile = 'Mobile',
}

export interface WallpaperSize {
  label: string;
  width: number;
  height: number;
  aspectRatio: '16:9' | '9:16' | '4:3' | '3:4' | '1:1';
}

export interface ArtStyle {
  id: string;
  name: string;
  promptModifier: string;
}

export interface WallpaperGenerationOptions {
  prompt: string;
  artStyleId: string;
  size: WallpaperSize;
  count: number;
}

export interface GeneratedImage {
  id: string;
  base64: string;
}
