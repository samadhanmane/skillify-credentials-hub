
import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SkillCard } from "@/components/SkillCard";
import { CertificateCard } from "@/components/CertificateCard";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PublicProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { userProfile, skills, certificates } = useAppContext();
  
  // In a real app, you would fetch the profile data for the given ID
  // For now, we'll use the current user's profile data

  if (!userProfile) {
    return <div className="flex items-center justify-center h-[80vh]">Profile not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userProfile.avatarUrl} />
                <AvatarFallback>{userProfile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{userProfile.name}</CardTitle>
              <p className="text-muted-foreground">{userProfile.title || "No title set"}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {userProfile.location && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {userProfile.location}
                </div>
              )}
              
              {userProfile.bio && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">{userProfile.bio}</p>
                </div>
              )}
              
              {userProfile.socialLinks && Object.values(userProfile.socialLinks).some(link => link) && (
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-2">Connect</h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.socialLinks.linkedin && (
                      <a href={userProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                        LinkedIn
                      </a>
                    )}
                    {userProfile.socialLinks.github && (
                      <a href={userProfile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 dark:text-gray-200 hover:underline text-sm">
                        GitHub
                      </a>
                    )}
                    {userProfile.socialLinks.twitter && (
                      <a href={userProfile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                        Twitter
                      </a>
                    )}
                    {userProfile.socialLinks.website && (
                      <a href={userProfile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline text-sm">
                        Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <div key={skill.id} className="w-full">
                      <SkillCard skill={skill} readOnly />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full">No skills added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.length > 0 ? (
                  certificates.map((certificate) => (
                    <div key={certificate.id} className="w-full">
                      <CertificateCard certificate={certificate} readOnly />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full">No certificates added yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
