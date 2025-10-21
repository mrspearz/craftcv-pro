import React, { useState } from 'react';
import { Trash2, Edit3, Save, X, GraduationCap, Calendar, MapPin, Plus } from 'lucide-react';
import type { Education } from '../../types';

interface EducationFormProps {
  education: Education[];
  onAdd: (education: Omit<Education, 'id'>) => void;
  onUpdate: (id: string, education: Partial<Education>) => void;
  onDelete: (id: string) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
    });
  };

  const handleAdd = () => {
    if (formData.degree && formData.institution) {
      onAdd({
        ...formData,
        gpa: formData.gpa || undefined,
        description: formData.description || undefined,
      });
      resetForm();
      setIsAddingNew(false);
    }
  };

  const handleUpdate = (id: string) => {
    if (formData.degree && formData.institution) {
      onUpdate(id, {
        ...formData,
        gpa: formData.gpa || undefined,
        description: formData.description || undefined,
      });
      resetForm();
      setEditingId(null);
    }
  };

  const startEdit = (edu: Education) => {
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      current: edu.current,
      gpa: edu.gpa || '',
      description: edu.description || '',
    });
    setEditingId(edu.id);
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

  return (
    <div className="space-y-3">

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            {isAddingNew ? 'Add New Education' : 'Edit Education'}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-xs font-medium text-gray-700">Degree *</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                placeholder="Bachelor of Science"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Institution *</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                placeholder="Stanford University"
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="text-xs font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
              placeholder="Stanford, CA"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2">
            <div>
              <label className="text-xs font-medium text-gray-700">Start Date</label>
              <input
                type="text"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                placeholder="Aug 2018"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">End Date</label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                placeholder="May 2022"
                disabled={formData.current}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">GPA</label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                placeholder="3.8/4.0"
              />
            </div>
            <div className="flex items-center pt-4">
              <input
                type="checkbox"
                id="currentEducation"
                checked={formData.current}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  current: e.target.checked,
                  endDate: e.target.checked ? '' : formData.endDate
                })}
                className="h-3 w-3 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="currentEducation" className="ml-1 text-xs text-gray-700">
                Current
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-xs font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 resize-none"
              rows={2}
              placeholder="Relevant coursework..."
            />
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
      {!isAddingNew && !editingId && education.length > 0 && (
        <button
          onClick={startAdd}
          className="w-full border-2 border-dashed border-primary-300 rounded-lg p-3 text-center text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Education</span>
        </button>
      )}

      {/* Education List */}
      <div className="space-y-2">
        {education.length === 0 ? (
          <button
            onClick={startAdd}
            className="w-full border border-gray-200 rounded-lg p-4 text-center text-gray-500 hover:bg-gray-50 hover:border-primary-300 transition-colors"
          >
            <GraduationCap className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-700 mb-1">No education added yet</p>
            <p className="text-xs text-primary-600">Click to add your education</p>
          </button>
        ) : (
          education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-primary-600 font-medium mb-1">
                    {edu.institution}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-2 space-x-3">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      </span>
                    </div>
                    {edu.location && (
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{edu.location}</span>
                      </div>
                    )}
                    {edu.gpa && (
                      <div className="text-xs font-medium text-gray-700">
                        GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-1 ml-2 mr-2">
                  <button
                    onClick={() => startEdit(edu)}
                    disabled={editingId !== null || isAddingNew}
                    className="p-1 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onDelete(edu.id)}
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