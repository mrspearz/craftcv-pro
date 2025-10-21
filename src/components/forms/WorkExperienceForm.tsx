import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, Briefcase, Calendar, MapPin } from 'lucide-react';
import type { WorkExperience } from '../../types';

interface WorkExperienceFormProps {
  workExperience: WorkExperience[];
  onAdd: (experience: Omit<WorkExperience, 'id'>) => void;
  onUpdate: (id: string, experience: Partial<WorkExperience>) => void;
  onDelete: (id: string) => void;
}

export const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  workExperience,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Omit<WorkExperience, 'id'>>({
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [''],
  });

  const resetForm = () => {
    setFormData({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    });
  };

  const handleAdd = () => {
    if (formData.jobTitle && formData.company) {
      const cleanedAchievements = formData.achievements.filter(achievement => achievement.trim() !== '');
      onAdd({
        ...formData,
        achievements: cleanedAchievements,
      });
      resetForm();
      setIsAddingNew(false);
    }
  };

  const handleUpdate = (id: string) => {
    if (formData.jobTitle && formData.company) {
      const cleanedAchievements = formData.achievements.filter(achievement => achievement.trim() !== '');
      onUpdate(id, {
        ...formData,
        achievements: cleanedAchievements,
      });
      resetForm();
      setEditingId(null);
    }
  };

  const startEdit = (experience: WorkExperience) => {
    setFormData({
      jobTitle: experience.jobTitle,
      company: experience.company,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
      achievements: experience.achievements.length > 0 ? experience.achievements : [''],
    });
    setEditingId(experience.id);
    setIsAddingNew(false);
  };

  const startAdd = () => {
    resetForm();
    setIsAddingNew(true);
    setEditingId(null);
  };

  const cancelEdit = () => {
    resetForm();
    setEditingId(null);
    setIsAddingNew(false);
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ''],
    });
  };

  const removeAchievement = (index: number) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      achievements: newAchievements.length > 0 ? newAchievements : [''],
    });
  };

  return (
    <div className="space-y-3">

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="border border-violet-500/30 rounded-xl p-4 bg-slate-800/50 backdrop-blur-sm">
          <h3 className="text-base font-semibold text-white mb-4">
            {isAddingNew ? 'Add New Experience' : 'Edit Experience'}
          </h3>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-sm font-medium text-slate-200 mb-1 block">Job Title *</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="Senior Software Engineer"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200 mb-1 block">Company *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="Tech Company Inc."
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="text-sm font-medium text-slate-200 mb-1 block">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
              placeholder="San Francisco, CA / Remote"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-sm font-medium text-slate-200 mb-1 block">Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="Jan 2022"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200 mb-1 block">End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors disabled:bg-slate-600 disabled:text-slate-400"
                placeholder="Present"
                disabled={formData.current}
              />
            </div>
            <div className="flex items-center pt-6">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  current: e.target.checked,
                  endDate: e.target.checked ? '' : formData.endDate
                })}
                className="h-4 w-4 text-violet-600 focus:ring-violet-500 bg-slate-700 border-slate-600 rounded"
              />
              <label htmlFor="current" className="ml-2 text-sm text-slate-200">
                Current
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-sm font-medium text-slate-200 mb-1 block">Job Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-none"
              rows={3}
              placeholder="Brief description of your role..."
            />
          </div>

          <div className="mb-3">
            <label className="text-xs font-medium text-gray-700">Key Achievements</label>
            <div className="space-y-1">
              {formData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                    placeholder="Achievement..."
                  />
                  <button
                    type="button"
                    onClick={() => removeAchievement(index)}
                    className="text-red-500 hover:text-red-700 p-1"
                    disabled={formData.achievements.length === 1}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAchievement}
                className="text-primary-600 hover:text-primary-700 text-xs flex items-center"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Achievement
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => isAddingNew ? handleAdd() : handleUpdate(editingId!)}
              className="px-2 py-1 bg-primary-600 text-white text-xs rounded hover:bg-primary-700 flex items-center space-x-1"
            >
              <Save className="w-3 h-3" />
              <span>{isAddingNew ? 'Add' : 'Save'}</span>
            </button>
            <button
              onClick={cancelEdit}
              className="px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 flex items-center space-x-1"
            >
              <X className="w-3 h-3" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Button - Always visible when not editing */}
      {!isAddingNew && !editingId && workExperience.length > 0 && (
        <button
          onClick={startAdd}
          className="w-full border-2 border-dashed border-primary-300 rounded-lg p-3 text-center text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Work Experience</span>
        </button>
      )}

      {/* Experience List */}
      <div className="space-y-2">
        {workExperience.length === 0 ? (
          <button
            onClick={startAdd}
            className="w-full border border-gray-200 rounded-lg p-4 text-center text-gray-500 hover:bg-gray-50 hover:border-primary-300 transition-colors"
          >
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700 mb-1">No work experience added yet</p>
            <p className="text-xs text-primary-600">Click to add your first experience</p>
          </button>
        ) : (
          workExperience.map((experience) => (
            <div key={experience.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {experience.jobTitle}
                  </h3>
                  <p className="text-xs text-primary-600 font-medium mb-1">
                    {experience.company}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                      </span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>
                  {experience.description && (
                    <p className="text-gray-700 mb-2 text-xs leading-relaxed">
                      {experience.description}
                    </p>
                  )}
                  {experience.achievements.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-gray-800 mb-1">Achievements:</h4>
                      <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                        {experience.achievements.slice(0, 3).map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                        {experience.achievements.length > 3 && (
                          <li className="text-gray-500">
                            +{experience.achievements.length - 3} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-1 ml-2 mr-2">
                  <button
                    onClick={() => startEdit(experience)}
                    disabled={editingId !== null || isAddingNew}
                    className="p-1 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDelete(experience.id)}
                    disabled={editingId !== null || isAddingNew}
                    className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-50 rounded transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};