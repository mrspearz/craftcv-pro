import React, { useState } from 'react';
import { Palette, Type, ZoomIn, ZoomOut, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface FontPair {
  id: string;
  name: string;
  heading: string;
  body: string;
  preview: string;
}

interface StyleCustomizerProps {
  selectedColor: string;
  selectedFont: string;
  fontSize: 'small' | 'medium' | 'large';
  onColorChange: (scheme: ColorScheme) => void;
  onFontChange: (fontPair: FontPair) => void;
  onFontSizeChange: (size: 'small' | 'medium' | 'large') => void;
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
    text: '#000000'
  },
  {
    id: 'teal-professional',
    name: 'Professional Teal',
    primary: '#0d9488',
    secondary: '#0f766e',
    accent: '#14b8a6',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'purple-creative',
    name: 'Creative Purple',
    primary: '#7c3aed',
    secondary: '#6d28d9',
    accent: '#8b5cf6',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'rose-elegant',
    name: 'Elegant Rose',
    primary: '#e11d48',
    secondary: '#be123c',
    accent: '#f43f5e',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'emerald-nature',
    name: 'Nature Emerald',
    primary: '#059669',
    secondary: '#047857',
    accent: '#10b981',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'indigo-executive',
    name: 'Executive Indigo',
    primary: '#4f46e5',
    secondary: '#4338ca',
    accent: '#6366f1',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'amber-warm',
    name: 'Warm Amber',
    primary: '#d97706',
    secondary: '#b45309',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'slate-minimal',
    name: 'Minimal Slate',
    primary: '#475569',
    secondary: '#334155',
    accent: '#64748b',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'fuchsia-bold',
    name: 'Bold Fuchsia',
    primary: '#c026d3',
    secondary: '#a21caf',
    accent: '#d946ef',
    background: '#ffffff',
    text: '#000000'
  },
  {
    id: 'cyan-tech',
    name: 'Tech Cyan',
    primary: '#0891b2',
    secondary: '#0e7490',
    accent: '#06b6d4',
    background: '#ffffff',
    text: '#000000'
  }
];

const fontPairs: FontPair[] = [
  {
    id: 'inter-inter',
    name: 'Modern Sans',
    heading: 'Inter',
    body: 'Inter',
    preview: 'Clean and contemporary'
  },
  {
    id: 'playfair-inter',
    name: 'Classic Serif',
    heading: 'Playfair Display',
    body: 'Inter',
    preview: 'Traditional and elegant'
  },
  {
    id: 'roboto-roboto',
    name: 'Professional',
    heading: 'Roboto',
    body: 'Roboto',
    preview: 'Clear and readable'
  },
  {
    id: 'lora-lora',
    name: 'Editorial',
    heading: 'Lora',
    body: 'Lora',
    preview: 'Sophisticated serif'
  },
  {
    id: 'playfair-roboto',
    name: 'Executive Mix',
    heading: 'Playfair Display',
    body: 'Roboto',
    preview: 'Authoritative and clear'
  },
  {
    id: 'lora-inter',
    name: 'Creative Mix',
    heading: 'Lora',
    body: 'Inter',
    preview: 'Balanced and refined'
  }
];

export const StyleCustomizer: React.FC<StyleCustomizerProps> = ({
  selectedColor,
  selectedFont,
  fontSize,
  onColorChange,
  onFontChange,
  onFontSizeChange,
  className = ""
}) => {
  const [expandedSection, setExpandedSection] = useState<'color' | 'font' | 'size' | null>('color');

  const toggleSection = (section: 'color' | 'font' | 'size') => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Premium Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-white flex items-center mb-2">
          <Palette className="w-5 h-5 mr-2 text-violet-400" />
          Style Customizer
        </h2>
        <p className="text-slate-300 text-sm">Personalize your resume design</p>
      </div>

      <div className="space-y-6">
        {/* COLOR SCHEME SECTION */}
        <div className="bg-slate-800/50 rounded-xl border border-violet-500/20 p-4">
          <button
            onClick={() => toggleSection('color')}
            className="w-full flex items-center justify-between text-left mb-4 group"
          >
            <div className="flex items-center">
              <Palette className="w-5 h-5 text-violet-400 mr-3" />
              <h3 className="text-base font-semibold text-white">Color Scheme</h3>
            </div>
            {expandedSection === 'color' ? (
              <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            )}
          </button>
          
          {expandedSection === 'color' && (
            <div className="grid grid-cols-2 gap-3">
              {colorSchemes.map((scheme) => {
                const isSelected = selectedColor === scheme.id;
                return (
                  <button
                    key={scheme.id}
                    onClick={() => onColorChange(scheme)}
                    className={`relative group p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      isSelected 
                        ? 'border-violet-500 ring-2 ring-violet-500 ring-opacity-50 shadow-lg shadow-violet-500/20' 
                        : 'border-slate-600 hover:border-violet-400/50 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {/* Color Preview Bars */}
                    <div className="space-y-1.5 mb-2">
                      <div className="flex space-x-1 h-6 rounded-md overflow-hidden shadow-inner">
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
                      <div className="text-xs font-semibold text-slate-200 text-center">
                        {scheme.name}
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* FONT PAIRING SECTION */}
        <div className="bg-slate-800/50 rounded-xl border border-violet-500/20 p-4">
          <button
            onClick={() => toggleSection('font')}
            className="w-full flex items-center justify-between text-left mb-4 group"
          >
            <div className="flex items-center">
              <Type className="w-5 h-5 text-violet-400 mr-3" />
              <h3 className="text-base font-semibold text-white">Font Pairing</h3>
            </div>
            {expandedSection === 'font' ? (
              <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            )}
          </button>
          
          {expandedSection === 'font' && (
            <div className="space-y-3">
              {fontPairs.map((fontPair) => {
                const isSelected = selectedFont === fontPair.id;
                return (
                  <button
                    key={fontPair.id}
                    onClick={() => onFontChange(fontPair)}
                    className={`relative w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-102 ${
                      isSelected 
                        ? 'border-violet-500 ring-2 ring-violet-500 ring-opacity-50 shadow-lg shadow-violet-500/20 bg-slate-700/50' 
                        : 'border-slate-600 hover:border-violet-400/50 shadow-sm hover:shadow-md bg-slate-700/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 
                          className="text-sm font-bold text-white mb-1"
                          style={{ fontFamily: fontPair.heading }}
                        >
                          {fontPair.name}
                        </h4>
                        <p 
                          className="text-xs text-slate-300"
                          style={{ fontFamily: fontPair.body }}
                        >
                          {fontPair.preview}
                        </p>
                        <div className="mt-2 text-xs text-slate-400">
                          <span className="font-medium">Heading:</span> {fontPair.heading} • <span className="font-medium">Body:</span> {fontPair.body}
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="ml-2 w-5 h-5 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* FONT SIZE SECTION */}
        <div className="bg-slate-800/50 rounded-xl border border-violet-500/20 p-4">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between text-left mb-4 group"
          >
            <div className="flex items-center">
              <ZoomIn className="w-5 h-5 text-violet-400 mr-3" />
              <h3 className="text-base font-semibold text-white">Font Size</h3>
            </div>
            {expandedSection === 'size' ? (
              <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            )}
          </button>
          
          {expandedSection === 'size' && (
            <div className="space-y-3">
              {[
                { id: 'small', label: 'Compact', icon: ZoomOut, description: 'More content per page' },
                { id: 'medium', label: 'Standard', icon: Type, description: 'Balanced readability' },
                { id: 'large', label: 'Comfortable', icon: ZoomIn, description: 'Enhanced readability' }
              ].map((size) => {
                const isSelected = fontSize === size.id;
                const Icon = size.icon;
                return (
                  <button
                    key={size.id}
                    onClick={() => onFontSizeChange(size.id as 'small' | 'medium' | 'large')}
                    className={`relative w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-102 ${
                      isSelected 
                        ? 'border-violet-500 ring-2 ring-violet-500 ring-opacity-50 shadow-lg shadow-violet-500/20 bg-slate-700/50' 
                        : 'border-slate-600 hover:border-violet-400/50 shadow-sm hover:shadow-md bg-slate-700/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <Icon className={`w-5 h-5 mr-3 ${isSelected ? 'text-violet-400' : 'text-slate-400'}`} />
                        <div>
                          <h4 className="text-sm font-bold text-white">{size.label}</h4>
                          <p className="text-xs text-slate-300">{size.description}</p>
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="ml-2 w-5 h-5 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export { colorSchemes, fontPairs };
export type { ColorScheme, FontPair };
