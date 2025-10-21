import React from 'react';
import { ProfilePictureUpload } from '../ProfilePictureUpload';
import type { PersonalInfo } from '../../types';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onUpdate: (info: Partial<PersonalInfo>) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  personalInfo,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      {/* Profile Picture + Name - Stack on mobile */}
      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex justify-center sm:justify-start">
          <ProfilePictureUpload
            value={personalInfo.profilePicture || ''}
            onChange={(imageData) => onUpdate({ profilePicture: imageData })}
          />
        </div>
        <div className="flex-1 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">First Name*</label>
              <input
                type="text"
                value={personalInfo.firstName}
                onChange={(e) => onUpdate({ firstName: e.target.value })}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">Last Name*</label>
              <input
                type="text"
                value={personalInfo.lastName}
                onChange={(e) => onUpdate({ lastName: e.target.value })}
                className="w-full px-3 py-2 text-base sm:text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Professional Title*</label>
            <input
              type="text"
              value={personalInfo.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full px-3 py-2 text-base sm:text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              placeholder="Senior Software Engineer"
            />
          </div>
        </div>
      </div>

      {/* Contact Information - Stack on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">Email*</label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="w-full px-3 py-2 text-base sm:text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            placeholder="john@example.com"
            inputMode="email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">Phone*</label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            className="w-full px-3 py-2 text-base sm:text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            placeholder="+1 (555) 123-4567"
            inputMode="tel"
          />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Location</label>
        <input
          type="text"
          value={personalInfo.location}
          onChange={(e) => onUpdate({ location: e.target.value })}
          className="w-full px-3 py-2 text-base sm:text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
          placeholder="San Francisco, CA / Remote"
        />
      </div>

      {/* Professional Summary */}
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-1">Professional Summary*</label>
        <textarea
          value={personalInfo.summary}
          onChange={(e) => onUpdate({ summary: e.target.value })}
          className="w-full px-3 py-2 text-base sm:text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-none"
          rows={4}
          placeholder="Brief summary of your experience and goals..."
        />
      </div>
    </div>
  );
};