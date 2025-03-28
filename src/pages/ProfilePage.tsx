
import React, { useState } from 'react';
import { useAppContext } from '../App';

const ProfilePage = () => {
  const { userProfile, updateUserProfile } = useAppContext();
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    title: userProfile.title || '',
    bio: userProfile.bio || '',
    location: userProfile.location || '',
    linkedinUrl: userProfile.socialLinks?.linkedin || '',
    githubUrl: userProfile.socialLinks?.github || '',
    twitterUrl: userProfile.socialLinks?.twitter || '',
    websiteUrl: userProfile.socialLinks?.website || '',
  });
  const [shareableLink, setShareableLink] = useState(`${window.location.origin}/profile/${userProfile.id}`);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      title: formData.title,
      bio: formData.bio,
      location: formData.location,
      socialLinks: {
        linkedin: formData.linkedinUrl,
        github: formData.githubUrl,
        twitter: formData.twitterUrl,
        website: formData.websiteUrl,
      },
    });
    
    alert('Profile updated successfully');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          {copied ? 'Copied!' : 'Share Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Professional Title
                </label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Computer Science Student"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., New York, USA"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="mb-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto overflow-hidden">
                {userProfile.avatarUrl ? (
                  <img src={userProfile.avatarUrl} alt={userProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-2xl font-bold text-gray-400">
                    {userProfile.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            <h3 className="text-xl font-semibold">{userProfile.name}</h3>
            <p className="text-gray-600">{userProfile.title || "No title set"}</p>
            <p className="text-sm text-gray-500 mt-1">{userProfile.location || "No location set"}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Social Links</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="LinkedIn profile URL"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700">
                  GitHub
                </label>
                <input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="GitHub profile URL"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <input
                  id="twitterUrl"
                  name="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Twitter profile URL"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
                  Personal Website
                </label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your website URL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
