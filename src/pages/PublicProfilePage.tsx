
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../App';

const PublicProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { userProfile, skills, certificates } = useAppContext();
  
  // In a real app, you would fetch the profile data for the given ID
  // For now, we'll use the current user's profile data

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Profile not found</h1>
          <p className="text-gray-600">The profile you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  const getLevelText = (level: number) => {
    if (level < 30) return 'Beginner';
    if (level < 60) return 'Intermediate';
    if (level < 85) return 'Advanced';
    return 'Expert';
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4">
                {userProfile.avatarUrl ? (
                  <img src={userProfile.avatarUrl} alt={userProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-2xl font-bold text-gray-400">
                    {userProfile.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold">{userProfile.name}</h2>
              <p className="text-gray-600">{userProfile.title || "No title set"}</p>
            </div>

            {userProfile.location && (
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {userProfile.location}
              </div>
            )}
            
            {userProfile.bio && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold mb-2">About</h3>
                <p className="text-sm text-gray-600">{userProfile.bio}</p>
              </div>
            )}
            
            {userProfile.socialLinks && Object.values(userProfile.socialLinks).some(link => link) && (
              <div className="pt-4 border-t border-gray-200 mt-4">
                <h3 className="text-sm font-semibold mb-2">Connect</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.socialLinks.linkedin && (
                    <a href={userProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      LinkedIn
                    </a>
                  )}
                  {userProfile.socialLinks.github && (
                    <a href={userProfile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline text-sm">
                      GitHub
                    </a>
                  )}
                  {userProfile.socialLinks.twitter && (
                    <a href={userProfile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                      Twitter
                    </a>
                  )}
                  {userProfile.socialLinks.website && (
                    <a href={userProfile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm">
                      Website
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            {skills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="border rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.category}</span>
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
              <p className="text-gray-500">No skills added yet.</p>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Certificates</h2>
            {certificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-md p-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{cert.title}</span>
                      <span className="text-sm text-gray-500">{cert.category}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{cert.issuer}</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    {cert.credentialUrl && (
                      <div className="mt-2">
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-indigo-600 hover:underline"
                        >
                          View Credential
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No certificates added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
