import React from 'react';
import { type GeneratedImage } from '../types';
import { WallpaperCard } from './WallpaperCard';
import { ImageIcon, WarningIcon } from './icons';

interface WallpaperGridProps {
  isLoading: boolean;
  error: string | null;
  images: GeneratedImage[];
}

const LoadingSkeleton: React.FC = () => (
  <div className="aspect-[9/16] sm:aspect-video lg:aspect-[16/9] bg-gray-800 rounded-lg animate-pulse"></div>
);

export const WallpaperGrid: React.FC<WallpaperGridProps> = ({ isLoading, error, images }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      );
    }

    if (error) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-800/50 border border-red-500/30 rounded-lg p-8 text-center">
          <WarningIcon className="w-16 h-16 text-red-400 mb-4" />
          <h3 className="text-xl font-semibold text-red-300">An Error Occurred</h3>
          <p className="text-gray-400 mt-2 max-w-md">{error}</p>
        </div>
      );
    }

    if (images.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
          <ImageIcon className="w-16 h-16 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300">Your wallpapers will appear here</h3>
          <p className="text-gray-400 mt-2">Fill out the details on the left and click "Generate" to start.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
        {images.map((image) => (
          <WallpaperCard key={image.id} image={image} />
        ))}
      </div>
    );
  };
  
  return <div className="min-h-[50vh] lg:min-h-full">{renderContent()}</div>;
};
