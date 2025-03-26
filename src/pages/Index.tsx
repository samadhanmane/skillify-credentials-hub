
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to SkillTrack</h1>
        <p className="text-xl text-center text-muted-foreground mb-8 max-w-xl mx-auto">
          Your professional skills and certifications management platform. Track your progress, showcase your achievements, and share your profile.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/login')} size="lg">
            Get Started
          </Button>
          <Button onClick={() => navigate('/signup')} variant="outline" size="lg">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
