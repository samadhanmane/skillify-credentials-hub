
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import AuthProvider from '@/hooks/useAuth';
import { UserProfile } from '@/lib/types';

// Type definitions
type Theme = 'light' | 'dark' | 'system';

interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  category: string;
  imageUrl: string;
}

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  skills: Skill[];
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  certificates: Certificate[];
  addCertificate: (certificate: Omit<Certificate, 'id'>) => void;
  updateCertificate: (certificate: Certificate) => void;
  deleteCertificate: (id: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Get stored theme preference or default to system
  const initialTheme = localStorage.getItem('theme') as Theme || 'system';
  const [theme, setTheme] = useState<Theme>(initialTheme);

  // Skills state
  const [skills, setSkills] = useState<Skill[]>([
    { id: '1', name: 'JavaScript', level: 85, category: 'Programming' },
    { id: '2', name: 'React', level: 80, category: 'Frontend' },
    { id: '3', name: 'Node.js', level: 75, category: 'Backend' },
    { id: '4', name: 'Python', level: 70, category: 'Programming' },
    { id: '5', name: 'UI/UX Design', level: 65, category: 'Design' },
  ]);

  // Certificates state
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'React Developer',
      issuer: 'Meta',
      date: '2023-06-15',
      credentialId: 'CERT-12345',
      credentialUrl: 'https://example.com/cert/12345',
      skills: ['React', 'JavaScript', 'Redux'],
      category: 'Frontend',
      imageUrl: '/placeholder.svg',
    },
    {
      id: '2',
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-03-10',
      expiryDate: '2026-03-10',
      credentialId: 'AWS-SA-12345',
      credentialUrl: 'https://example.com/aws/12345',
      skills: ['AWS', 'Cloud Architecture', 'Infrastructure'],
      category: 'Cloud',
      imageUrl: '/placeholder.svg',
    },
  ]);

  // User profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    title: 'Full Stack Developer',
    bio: 'Passionate developer with experience in React, Node.js, and cloud technologies.',
    location: 'San Francisco, CA',
    avatarUrl: '/placeholder.svg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      website: 'https://johndoe.com',
    },
  });

  // Update theme handler
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      toast.success('Dark theme activated');
    } else {
      document.documentElement.classList.remove('dark');
      toast.success('Light theme activated');
    }
  };

  // Skill CRUD functions
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = {
      ...skill,
      id: Date.now().toString(),
    };
    setSkills([...skills, newSkill]);
    toast.success(`Added ${skill.name} to your skills`);
  };

  const updateSkill = (updatedSkill: Skill) => {
    setSkills(
      skills.map((skill) => (skill.id === updatedSkill.id ? updatedSkill : skill))
    );
    toast.success(`Updated ${updatedSkill.name}`);
  };

  const deleteSkill = (id: string) => {
    const skillToDelete = skills.find((skill) => skill.id === id);
    setSkills(skills.filter((skill) => skill.id !== id));
    if (skillToDelete) {
      toast.success(`Removed ${skillToDelete.name} from your skills`);
    }
  };

  // Certificate CRUD functions
  const addCertificate = (certificate: Omit<Certificate, 'id'>) => {
    const newCertificate = {
      ...certificate,
      id: Date.now().toString(),
    };
    setCertificates([...certificates, newCertificate]);
    toast.success(`Added ${certificate.title} certificate`);
  };

  const updateCertificate = (updatedCertificate: Certificate) => {
    setCertificates(
      certificates.map((cert) =>
        cert.id === updatedCertificate.id ? updatedCertificate : cert
      )
    );
    toast.success(`Updated ${updatedCertificate.title} certificate`);
  };

  const deleteCertificate = (id: string) => {
    const certToDelete = certificates.find((cert) => cert.id === id);
    setCertificates(certificates.filter((cert) => cert.id !== id));
    if (certToDelete) {
      toast.success(`Removed ${certToDelete.title} certificate`);
    }
  };

  // User profile update function
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...profile,
    }));
    toast.success('Profile updated successfully');
  };

  // Context value
  const value = {
    theme,
    setTheme: handleThemeChange,
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    certificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    userProfile,
    updateUserProfile,
  };

  return (
    <AppContext.Provider value={value}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Export the renamed hook for backward compatibility
export const useAppContext = useApp;
