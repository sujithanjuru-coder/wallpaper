import { GoogleGenAI } from '@google/genai';
import { type WallpaperGenerationOptions, type GeneratedImage } from '../types';
import { ART_STYLES } from '../constants';

export async function generateWallpapers(
  options: WallpaperGenerationOptions
): Promise<GeneratedImage[]> {
  if (!process.env.API_KEY) {
    throw new Error('API_KEY environment variable not set');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const selectedStyle = ART_STYLES.find(style => style.id === options.artStyleId);
  if (!selectedStyle) {
    throw new Error('Invalid art style selected');
  }

  const fullPrompt = `${options.prompt}, ${selectedStyle.promptModifier}, wallpaper for ${options.size.label} screen`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: options.count,
        aspectRatio: options.size.aspectRatio,
        outputMimeType: 'image/jpeg',
      },
    });
    
    if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("The API did not return any images.");
    }

    return response.generatedImages.map((img, index) => ({
      id: `wallpaper-${Date.now()}-${index}`,
      base64: img.image.imageBytes,
    }));

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    // Rethrow a more user-friendly error
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error('Your API key is not valid. Please check it and try again.');
    }
    throw new Error('Failed to communicate with the AI model.');
  }
}
