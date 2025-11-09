import React from 'react';
import { type GeneratedImage } from '../types';
import { DownloadIcon } from './icons';

interface WallpaperCardProps {
  image: GeneratedImage;
}

export const WallpaperCard: React.FC<WallpaperCardProps> = ({ image }) => {
  const imageUrl = `data:image/jpeg;base64,${image.base64}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `sujipaper-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg aspect-[9/16] sm:aspect-video lg:aspect-[16/9]">
      <img
        src={imageUrl}
        alt="Generated Wallpaper"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white font-semibold py-2 px-4 rounded-md hover:bg-white/30 transition-colors"
        >
          <DownloadIcon className="w-5 h-5" />
          Download
        </button>
      </div>
    </div>
  );
};
