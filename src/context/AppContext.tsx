import React, { createContext, useContext, useState, useEffect } from "react";
import { Certificate, Skill, UserProfile } from "@/lib/types";
import { mockCertificates, mockSkills, mockUserProfile } from "@/lib/mockData";
import { toast } from "sonner";

type AppContextProps = {
  skills: Skill[];
  certificates: Certificate[];
  userProfile: UserProfile;
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (skill: Skill) => void;
  deleteSkill: (id: string) => void;
  addCertificate: (certificate: Omit<Certificate, "id">) => void;
  updateCertificate: (certificate: Certificate) => void;
  deleteCertificate: (id: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  expiringCertificates: Certificate[];
  checkCertificateExpiry: () => Certificate[];
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile);
  const [expiringCertificates, setExpiringCertificates] = useState<Certificate[]>([]);

  const checkCertificateExpiry = () => {
    const now = new Date();
    const ninetyDaysFromNow = new Date(now);
    ninetyDaysFromNow.setDate(now.getDate() + 90);
    
    const expiring = certificates.filter(cert => {
      if (!cert.expiryDate) return false;
      
      const expiryDate = new Date(cert.expiryDate);
      return expiryDate <= ninetyDaysFromNow && expiryDate >= now;
    });

    setExpiringCertificates(expiring);
    return expiring;
  };

  useEffect(() => {
    const expiring = checkCertificateExpiry();
    
    if (expiring.length > 0) {
      toast.warning(`You have ${expiring.length} certificate(s) expiring soon`);
    }
  }, [certificates]);

  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = {
      ...skill,
      id: crypto.randomUUID(),
    };
    setSkills([...skills, newSkill]);
    toast.success("Skill added successfully");
  };

  const updateSkill = (updatedSkill: Skill) => {
    setSkills(skills.map(skill => skill.id === updatedSkill.id ? updatedSkill : skill));
    toast.success("Skill updated successfully");
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
    toast.success("Skill deleted successfully");
  };

  const addCertificate = (certificate: Omit<Certificate, "id">) => {
    const newCertificate = {
      ...certificate,
      id: crypto.randomUUID(),
    };
    setCertificates([...certificates, newCertificate]);
    toast.success("Certificate added successfully");
    
    checkCertificateExpiry();
  };

  const updateCertificate = (updatedCertificate: Certificate) => {
    setCertificates(certificates.map(cert => cert.id === updatedCertificate.id ? updatedCertificate : cert));
    toast.success("Certificate updated successfully");
    
    checkCertificateExpiry();
  };

  const deleteCertificate = (id: string) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
    toast.success("Certificate deleted successfully");
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile({ ...userProfile, ...profile });
    toast.success("Profile updated successfully");
  };

  return (
    <AppContext.Provider
      value={{
        skills,
        certificates,
        userProfile,
        addSkill,
        updateSkill,
        deleteSkill,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        updateUserProfile,
        expiringCertificates,
        checkCertificateExpiry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
