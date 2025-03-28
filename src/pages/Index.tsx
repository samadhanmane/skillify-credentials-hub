
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container flex justify-between items-center h-16">
          <div className="text-xl font-bold" style={{ color: 'var(--primary-color)' }}>
            SkillTrack
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-primary">Login</Link>
            <Link to="/signup" className="text-sm font-medium hover:text-primary">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="max-w-3xl text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl font-bold mb-6">Welcome to SkillTrack</h1>
          <p className="text-xl text-muted mb-8 max-w-xl mx-auto">
            Your professional skills and certifications management platform. Track your progress, showcase your achievements, and share your profile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/signup" className="btn btn-outline">
              Create Account
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Track Skills</h2>
              <p className="text-muted">Organize and track all your skills in one place with proficiency levels and categories.</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Manage Certificates</h2>
              <p className="text-muted">Store and organize all your professional certifications with issuer details and expiry dates.</p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-color)' }}>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Share Profile</h2>
              <p className="text-muted">Create a shareable public profile to showcase your skills and certifications to recruiters and schools.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted">
            © 2023 SkillTrack. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="#" className="text-sm text-muted hover:text-primary">
              Terms
            </Link>
            <Link to="#" className="text-sm text-muted hover:text-primary">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-muted hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
