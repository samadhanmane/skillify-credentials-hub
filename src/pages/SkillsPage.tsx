
import React, { useState } from 'react';
import { useAppContext } from '../App';

const SkillsPage = () => {
  const { skills, addSkill, deleteSkill } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: '' });
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill(newSkill);
    setNewSkill({ name: '', level: 50, category: '' });
    setShowAddForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: name === 'level' ? parseInt(value) : value });
  };

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(search.toLowerCase()) || 
    skill.category.toLowerCase().includes(search.toLowerCase())
  );

  const getLevelText = (level: number) => {
    if (level < 30) return 'Beginner';
    if (level < 60) return 'Intermediate';
    if (level < 85) return 'Advanced';
    return 'Expert';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Skills</h1>
          <p className="text-gray-600">
            Manage and track your professional skills
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {showAddForm ? 'Cancel' : 'Add Skill'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-4">Add New Skill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Skill Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={newSkill.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  value={newSkill.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                  Proficiency Level
                </label>
                <span className="text-sm text-gray-500">
                  {newSkill.level}% - {getLevelText(newSkill.level)}
                </span>
              </div>
              <input
                id="level"
                name="level"
                type="range"
                min="1"
                max="100"
                value={newSkill.level}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div key={skill.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{skill.name}</h3>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
              
              <div className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mb-3">
                {skill.category}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Proficiency</span>
                  <span>{getLevelText(skill.level)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      skill.level < 30 ? 'bg-blue-500' :
                      skill.level < 60 ? 'bg-green-500' :
                      skill.level < 85 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No skills found.</p>
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
