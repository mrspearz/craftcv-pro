import React, { useState } from 'react';
import { Trash2, Edit3, Save, X, Zap, Tag, Plus } from 'lucide-react';
import type { Skill, SkillLevel } from '../../types';

interface SkillsFormProps {
  skills: Skill[];
  onAdd: (skill: Omit<Skill, 'id'>) => void;
  onUpdate: (id: string, skill: Partial<Skill>) => void;
  onDelete: (id: string) => void;
}

const skillLevels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const commonCategories = [
  'Programming Languages',
  'Frameworks & Libraries', 
  'Tools & Technologies',
  'Databases',
  'Cloud & DevOps',
  'Design & Creative',
  'Languages',
  'Soft Skills',
  'Other'
];

export const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    level: 'Intermediate',
    category: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      level: 'Intermediate',
      category: '',
    });
  };

  const handleAdd = () => {
    if (formData.name && formData.category) {
      onAdd(formData);
      resetForm();
      setIsAddingNew(false);
    }
  };

  const handleUpdate = (id: string) => {
    if (formData.name && formData.category) {
      onUpdate(id, formData);
      resetForm();
      setEditingId(null);
    }
  };

  const startEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setEditingId(skill.id);
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

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case 'Expert': return 'bg-green-100 text-green-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            {isAddingNew ? 'Add New Skill' : 'Edit Skill'}
          </h3>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <label className="text-xs font-medium text-gray-700">Skill Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
                placeholder="JavaScript"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Select...</option>
                {commonCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">Level *</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value as SkillLevel })}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500"
              >
                {skillLevels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom category input */}
          {!commonCategories.includes(formData.category) && formData.category && (
            <div className="mb-4">
              <label className="form-label">Custom Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-field"
                placeholder="Enter custom category"
              />
            </div>
          )}

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
      {!isAddingNew && !editingId && skills.length > 0 && (
        <button
          onClick={startAdd}
          className="w-full border-2 border-dashed border-primary-300 rounded-lg p-3 text-center text-primary-600 hover:bg-primary-50 hover:border-primary-400 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Skill</span>
        </button>
      )}

      {/* Skills by Category */}
      <div className="space-y-2">
        {Object.keys(skillsByCategory).length === 0 ? (
          <div className="border border-gray-200 rounded-lg p-3 text-center text-gray-500">
            <Zap className="w-6 h-6 mx-auto mb-1 text-gray-400" />
            <p className="text-xs font-medium text-gray-700">No skills added yet</p>
          </div>
        ) : (
          Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="border border-gray-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Tag className="w-3 h-3 mr-1 text-primary-600" />
                {category}
                <span className="ml-1 text-xs font-normal text-gray-500">
                  ({categorySkills.length})
                </span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between bg-gray-50 rounded p-2 group hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-medium text-gray-900">{skill.name}</span>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(skill)}
                        disabled={editingId !== null || isAddingNew}
                        className="p-1 text-gray-500 hover:text-primary-600 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDelete(skill.id)}
                        disabled={editingId !== null || isAddingNew}
                        className="p-1 text-gray-500 hover:text-red-600 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Add Popular Skills */}
      {skills.length === 0 && !isAddingNew && !editingId && (
        <div className="card p-6 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Popular Skills</h3>
          <p className="text-sm text-gray-600 mb-4">
            Click on any of these popular skills to quick-add them to your resume:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { name: 'JavaScript', category: 'Programming Languages', level: 'Advanced' as SkillLevel },
              { name: 'React', category: 'Frameworks & Libraries', level: 'Advanced' as SkillLevel },
              { name: 'Node.js', category: 'Frameworks & Libraries', level: 'Intermediate' as SkillLevel },
              { name: 'Python', category: 'Programming Languages', level: 'Advanced' as SkillLevel },
              { name: 'Git', category: 'Tools & Technologies', level: 'Advanced' as SkillLevel },
              { name: 'AWS', category: 'Cloud & DevOps', level: 'Intermediate' as SkillLevel },
              { name: 'SQL', category: 'Databases', level: 'Advanced' as SkillLevel },
              { name: 'Leadership', category: 'Soft Skills', level: 'Advanced' as SkillLevel },
            ].map((skill) => (
              <button
                key={skill.name}
                onClick={() => onAdd(skill)}
                className="text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-sm"
              >
                <div className="font-medium text-gray-900">{skill.name}</div>
                <div className="text-xs text-gray-500">{skill.category}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};