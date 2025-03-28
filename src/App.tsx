
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SkillsPage from "./pages/SkillsPage";
import CertificatesPage from "./pages/CertificatesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Index from "./pages/Index";
import PublicProfilePage from "./pages/PublicProfilePage";
import { Toaster } from "sonner";

// Auth Context
type AuthContextType = {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
};

type UserType = {
  id: string;
  name: string;
  email: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// App Context
type Skill = {
  id: string;
  name: string;
  level: number;
  category: string;
};

type Certificate = {
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
};

type UserProfile = {
  id: string;
  name: string;
  email: string;
  title?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
};

type AppContextType = {
  skills: Skill[];
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  certificates: Certificate[];
  addCertificate: (certificate: Omit<Certificate, "id">) => void;
  updateCertificate: (certificate: Certificate) => void;
  deleteCertificate: (id: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

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

  // Auth functions
  const login = (email: string, password: string) => {
    // Simple mock login
    if (email && password) {
      setUser({ id: '1', name: 'John Doe', email });
      setIsAuthenticated(true);
    }
  };

  const signup = (name: string, email: string, password: string) => {
    // Simple mock signup
    if (name && email && password) {
      setUser({ id: '1', name, email });
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Skill functions
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (updatedSkill: Skill) => {
    setSkills(skills.map(skill => 
      skill.id === updatedSkill.id ? updatedSkill : skill
    ));
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  // Certificate functions
  const addCertificate = (certificate: Omit<Certificate, "id">) => {
    const newCert = { ...certificate, id: Date.now().toString() };
    setCertificates([...certificates, newCert]);
  };

  const updateCertificate = (updatedCert: Certificate) => {
    setCertificates(certificates.map(cert => 
      cert.id === updatedCert.id ? updatedCert : cert
    ));
  };

  const deleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  // Profile functions
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile({ ...userProfile, ...profile });
  };

  const authValue = {
    isAuthenticated,
    user,
    login,
    signup,
    logout
  };

  const appValue = {
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
    certificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    userProfile,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authValue}>
      <AppContext.Provider value={appValue}>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Public profile route */}
            <Route path="/profile/:id" element={<PublicProfilePage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/skills" element={
              <ProtectedRoute>
                <Layout>
                  <SkillsPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/certificates" element={
              <ProtectedRoute>
                <Layout>
                  <CertificatesPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
