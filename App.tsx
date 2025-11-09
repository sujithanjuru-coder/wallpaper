import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ControlsPanel } from './components/ControlsPanel';
import { WallpaperGrid } from './components/WallpaperGrid';
import { generateWallpapers } from './services/geminiService';
import { type WallpaperGenerationOptions, type GeneratedImage } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const handleGenerate = useCallback(async (options: WallpaperGenerationOptions) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateWallpapers(options);
      setGeneratedImages(images);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate wallpapers: ${err.message}. Please check your API key and try again.`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          <div className="lg:col-span-4 xl:col-span-3">
            <ControlsPanel onGenerate={handleGenerate} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <WallpaperGrid
              isLoading={isLoading}
              error={error}
              images={generatedImages}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
