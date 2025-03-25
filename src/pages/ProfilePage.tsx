
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { userProfile, updateUserProfile } = useAppContext();
  const [formData, setFormData] = useState({
    name: userProfile.name || "",
    email: userProfile.email || "",
    title: userProfile.title || "",
    bio: userProfile.bio || "",
    location: userProfile.location || "",
    linkedinUrl: userProfile.socialLinks?.linkedin || "",
    githubUrl: userProfile.socialLinks?.github || "",
    twitterUrl: userProfile.socialLinks?.twitter || "",
    websiteUrl: userProfile.socialLinks?.website || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      title: formData.title,
      bio: formData.bio,
      location: formData.location,
      socialLinks: {
        linkedin: formData.linkedinUrl,
        github: formData.githubUrl,
        twitter: formData.twitterUrl,
        website: formData.websiteUrl,
      },
    });
    
    toast.success("Profile updated successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <Button className="hidden md:block" onClick={() => toast.info("Public profile sharing coming soon!")}>
          Share Public Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Your name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="Your email" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={formData.title || ""} 
                  onChange={handleInputChange} 
                  placeholder="e.g., Computer Science Student" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location || ""} 
                  onChange={handleInputChange} 
                  placeholder="e.g., New York, USA" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={formData.bio || ""} 
                  onChange={handleInputChange} 
                  placeholder="Tell us about yourself" 
                  rows={4} 
                />
              </div>

              <Button type="submit">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userProfile.avatarUrl} />
                <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <p className="text-muted-foreground">{userProfile.title || "No title set"}</p>
              <p className="text-sm text-muted-foreground mt-1">{userProfile.location || "No location set"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn</Label>
                  <Input 
                    id="linkedinUrl" 
                    name="linkedinUrl" 
                    value={formData.linkedinUrl || ""} 
                    onChange={handleInputChange} 
                    placeholder="LinkedIn profile URL" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub</Label>
                  <Input 
                    id="githubUrl" 
                    name="githubUrl" 
                    value={formData.githubUrl || ""} 
                    onChange={handleInputChange} 
                    placeholder="GitHub profile URL" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">Twitter</Label>
                  <Input 
                    id="twitterUrl" 
                    name="twitterUrl" 
                    value={formData.twitterUrl || ""} 
                    onChange={handleInputChange} 
                    placeholder="Twitter profile URL" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="websiteUrl">Personal Website</Label>
                  <Input 
                    id="websiteUrl" 
                    name="websiteUrl" 
                    value={formData.websiteUrl || ""} 
                    onChange={handleInputChange} 
                    placeholder="Your website URL" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
