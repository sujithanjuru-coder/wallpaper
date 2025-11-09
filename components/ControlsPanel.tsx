import React, { useState, useMemo } from 'react';
import { ART_STYLES, WALLPAPER_SIZES } from '../constants';
import { DeviceType, type WallpaperSize, type WallpaperGenerationOptions } from '../types';
import { DesktopIcon, TabletIcon, MobileIcon, SparklesIcon } from './icons';

interface ControlsPanelProps {
  onGenerate: (options: WallpaperGenerationOptions) => void;
  isLoading: boolean;
}

const deviceIcons: Record<DeviceType, React.ReactNode> = {
  [DeviceType.Desktop]: <DesktopIcon className="w-5 h-5" />,
  [DeviceType.Tablet]: <TabletIcon className="w-5 h-5" />,
  [DeviceType.Mobile]: <MobileIcon className="w-5 h-5" />,
};

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('A serene alien jungle at night, glowing flora and fauna');
  const [artStyleId, setArtStyleId] = useState<string>(ART_STYLES[0].id);
  const [activeDeviceType, setActiveDeviceType] = useState<DeviceType>(DeviceType.Desktop);
  const [size, setSize] = useState<WallpaperSize>(WALLPAPER_SIZES[DeviceType.Desktop][0]);
  const [count, setCount] = useState<number>(2);

  const availableSizes = useMemo(() => WALLPAPER_SIZES[activeDeviceType], [activeDeviceType]);

  const handleDeviceTypeChange = (deviceType: DeviceType) => {
    setActiveDeviceType(deviceType);
    setSize(WALLPAPER_SIZES[deviceType][0]);
  };
  
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = availableSizes.find(s => s.label === event.target.value);
    if(selectedSize) {
      setSize(selectedSize);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate({ prompt, artStyleId, size, count });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 space-y-6 sticky top-24"
    >
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          1. Describe your wallpaper
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
          placeholder="e.g., A majestic dragon flying over a cyberpunk city"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          2. Choose a style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ART_STYLES.map((style) => (
            <button
              type="button"
              key={style.id}
              onClick={() => setArtStyleId(style.id)}
              className={`text-center py-2 px-3 rounded-md text-sm transition-all duration-200 border-2 ${
                artStyleId === style.id
                  ? 'bg-indigo-600 border-indigo-500 text-white font-semibold shadow-lg'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
            3. Select device & size
        </label>
        <div className="flex bg-gray-900 rounded-md border border-gray-600 p-1">
            {Object.values(DeviceType).map((deviceType) => (
                <button
                    type="button"
                    key={deviceType}
                    onClick={() => handleDeviceTypeChange(deviceType)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm transition-colors ${
                        activeDeviceType === deviceType ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                    }`}
                >
                    {deviceIcons[deviceType]}
                    {deviceType}
                </button>
            ))}
        </div>
        <select
            value={size.label}
            onChange={handleSizeChange}
            className="mt-2 w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
            {availableSizes.map((s) => (
                <option key={s.label} value={s.label}>{s.label}</option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          4. Number of wallpapers
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((num) => (
            <button
              type="button"
              key={num}
              onClick={() => setCount(num)}
              className={`flex-1 py-2 px-3 rounded-md text-sm transition-all duration-200 border-2 ${
                count === num
                  ? 'bg-indigo-600 border-indigo-500 text-white font-semibold'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-4 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate
          </>
        )}
      </button>
    </form>
  );
};
