
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to SkillTrack</h1>
      <p className="text-xl text-center text-muted-foreground mb-8 max-w-xl">
        Your professional skills and certifications management platform. Track your progress, showcase your achievements, and share your profile.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => navigate('/login')} size="lg">
          Get Started
        </Button>
        <Button onClick={() => navigate('/skills')} variant="outline" size="lg">
          Explore Platform
        </Button>
      </div>
    </div>
  );
};

export default Index;
