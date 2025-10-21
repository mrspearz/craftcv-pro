import React from 'react';
import { Palette, Check } from 'lucide-react';

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ColorCustomizerProps {
  selectedScheme: string;
  onSchemeChange: (scheme: ColorScheme) => void;
  className?: string;
}

const colorSchemes: ColorScheme[] = [
  {
    id: 'blue-modern',
    name: 'Modern Blue',
    primary: '#2563eb',
    secondary: '#1e40af',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1f2937'
  },
  {
    id: 'teal-professional',
    name: 'Professional Teal',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#14b8a6',
    background: '#ffffff',
    text: '#374151'
  },
  {
    id: 'purple-creative',
    name: 'Creative Purple',
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#8b5cf6',
    background: '#ffffff',
    text: '#374151'
  },
  {
    id: 'orange-vibrant',
    name: 'Vibrant Orange',
    primary: '#ea580c',
    secondary: '#c2410c',
    accent: '#fb923c',
    background: '#ffffff',
    text: '#374151'
  },
  {
    id: 'green-nature',
    name: 'Nature Green',
    primary: '#16a34a',
    secondary: '#15803d',
    accent: '#22c55e',
    background: '#ffffff',
    text: '#374151'
  },
  {
    id: 'red-bold',
    name: 'Bold Red',
    primary: '#dc2626',
    secondary: '#b91c1c',
    accent: '#ef4444',
    background: '#ffffff',
    text: '#374151'
  },
  {
    id: 'indigo-elegant',
    name: 'Elegant Indigo',
    primary: '#4338ca',
    secondary: '#3730a3',
    accent: '#6366f1',
    background: '#ffffff',
    text: '#374151'
  },
  {
    id: 'pink-modern',
    name: 'Modern Pink',
    primary: '#db2777',
    secondary: '#be185d',
    accent: '#ec4899',
    background: '#ffffff',
    text: '#374151'
  },
  {
    id: 'slate-professional',
    name: 'Professional Slate',
    primary: '#475569',
    secondary: '#334155',
    accent: '#64748b',
    background: '#ffffff',
    text: '#1e293b'
  },
  {
    id: 'amber-warm',
    name: 'Warm Amber',
    primary: '#d97706',
    secondary: '#b45309',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#374151'
  }
];

export const ColorCustomizer: React.FC<ColorCustomizerProps> = ({
  selectedScheme,
  onSchemeChange,
  className = ""
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <Palette className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-900">Choose Color Scheme</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {colorSchemes.map((scheme) => {
          const isSelected = selectedScheme === scheme.id;
          return (
            <button
              key={scheme.id}
              onClick={() => onSchemeChange(scheme)}
              className={`relative group p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                isSelected 
                  ? 'border-gray-800 ring-2 ring-gray-800 ring-opacity-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Color Preview */}
              <div className="space-y-2 mb-3">
                <div className="flex space-x-1 h-6 rounded-lg overflow-hidden">
                  <div 
                    className="flex-1"
                    style={{ backgroundColor: scheme.primary }}
                  ></div>
                  <div 
                    className="flex-1"
                    style={{ backgroundColor: scheme.secondary }}
                  ></div>
                  <div 
                    className="flex-1"
                    style={{ backgroundColor: scheme.accent }}
                  ></div>
                </div>
                <div className="text-xs font-medium text-gray-700 text-center">
                  {scheme.name}
                </div>
              </div>
              
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-200"></div>
            </button>
          );
        })}
      </div>
      
      {/* Custom Color Section */}
      <div className="pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-3">
          Or customize your own colors (Premium feature coming soon)
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg border border-gray-200"></div>
            <span className="text-sm text-gray-500">Primary</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg border border-gray-200"></div>
            <span className="text-sm text-gray-500">Secondary</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-400 rounded-lg border border-gray-200"></div>
            <span className="text-sm text-gray-500">Accent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { colorSchemes };
export type { ColorScheme };