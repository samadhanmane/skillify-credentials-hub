
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to SkillTrack</h1>
        <p className="text-xl text-center text-gray-600 mb-8 max-w-xl mx-auto">
          Your professional skills and certifications management platform. Track your progress, showcase your achievements, and share your profile.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors">
            Get Started
          </Link>
          <Link to="/signup" className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
