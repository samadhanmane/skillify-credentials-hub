
export type Skill = {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  category: string;
  imageUrl?: string;
};

export type UserProfile = {
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
