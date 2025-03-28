
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';

const Dashboard = () => {
  const { skills, certificates, userProfile } = useAppContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {userProfile.name}</h1>
        <p className="text-gray-600">
          Here's an overview of your skills and certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <Link to="/skills" className="text-indigo-600 text-sm">
              View all
            </Link>
          </div>
          
          {skills.length > 0 ? (
            <div className="space-y-4">
              {skills.slice(0, 3).map((skill) => (
                <div key={skill.id} className="border rounded-md p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.category}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills added yet.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Certificates</h2>
            <Link to="/certificates" className="text-indigo-600 text-sm">
              View all
            </Link>
          </div>
          
          {certificates.length > 0 ? (
            <div className="space-y-4">
              {certificates.slice(0, 3).map((cert) => (
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No certificates added yet.</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Profile Completion</h2>
          <Link to="/profile" className="text-indigo-600 text-sm">
            Edit profile
          </Link>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: '75%' }}
          ></div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>Complete your profile to improve visibility and track your progress better.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
