import React, { useState, useRef } from 'react';
import { Upload, X, User, Camera } from 'lucide-react';

interface ProfilePictureUploadProps {
  value?: string;
  onChange: (imageData: string) => void;
  className?: string;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image smaller than 5MB');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for image processing
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size for profile picture (square, 400x400)
        const size = 400;
        canvas.width = size;
        canvas.height = size;

        // Calculate dimensions to crop to square
        const minDimension = Math.min(img.width, img.height);
        const sourceX = (img.width - minDimension) / 2;
        const sourceY = (img.height - minDimension) / 2;

        // Draw cropped and resized image
        ctx.drawImage(
          img,
          sourceX, sourceY, minDimension, minDimension,
          0, 0, size, size
        );

        // Convert to base64 with validation
        try {
          const imageData = canvas.toDataURL('image/jpeg', 0.9);
          
          // Validate the generated image data
          if (!imageData || !imageData.startsWith('data:image/')) {
            throw new Error('Failed to process image');
          }
          
          // Test if the base64 data is valid
          const base64Data = imageData.split(',')[1];
          if (!base64Data || base64Data.length === 0) {
            throw new Error('Invalid image data generated');
          }
          
          // Validate base64 format
          atob(base64Data);
          
          onChange(imageData);
          setIsUploading(false);
        } catch (error) {
          setIsUploading(false);
          console.error('Image processing error:', error);
          alert('Failed to process the image. Please try a different image file.');
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleRemove = () => {
    onChange('');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Current Image Display */}
      {value ? (
        <div className="relative group">
          <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md border-2 border-gray-200">
            <img
              src={value}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center space-x-2">
            <button
              onClick={triggerFileInput}
              className="p-1.5 bg-white rounded text-gray-700 hover:bg-gray-100 transition-colors"
              title="Change Photo"
            >
              <Camera className="w-3 h-3" />
            </button>
            <button
              onClick={handleRemove}
              className="p-1.5 bg-red-500 rounded text-white hover:bg-red-600 transition-colors"
              title="Remove Photo"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ) : (
        /* Upload Area - More compact */
        <div
          className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-200 cursor-pointer group ${
            isDragOver
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={triggerFileInput}
        >
          {isUploading ? (
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-primary-100 rounded-full flex items-center justify-center animate-pulse">
                <Upload className="w-6 h-6 text-primary-600" />
              </div>
              <div className="text-sm text-primary-600 font-medium">Processing...</div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <User className="w-8 h-8 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              
              <div className="space-y-1">
                <div className="text-sm font-semibold text-gray-900">
                  Add Photo
                </div>
                <div className="text-xs text-gray-500">
                  Click or drag to upload
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
    </div>
  );
};