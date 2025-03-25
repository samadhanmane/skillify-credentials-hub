
import React from "react";
import { Certificate } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Link2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface CertificateCardProps {
  certificate: Certificate;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onEdit, onDelete }) => {
  const { title, issuer, date, expiryDate, credentialUrl, skills, category, imageUrl } = certificate;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedExpiryDate = expiryDate
    ? new Date(expiryDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Card className="overflow-hidden hover-lift transition-all duration-300 h-full">
      <CardHeader className="p-0">
        <div className="bg-primary/5 p-6 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={imageUrl} alt={issuer} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {issuer.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Badge variant="secondary" className="mb-2">{category}</Badge>
              <h3 className="font-semibold text-base">{title}</h3>
              <p className="text-sm text-muted-foreground">Issued by {issuer}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Issued: {formattedDate}</span>
          {formattedExpiryDate && (
            <>
              <span className="mx-1">•</span>
              <span>Expires: {formattedExpiryDate}</span>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-3">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-accent">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        {credentialUrl && (
          <Button variant="outline" size="sm" className="gap-1" asChild>
            <a href={credentialUrl} target="_blank" rel="noopener noreferrer">
              <Link2 className="h-3.5 w-3.5" />
              View credential
            </a>
          </Button>
        )}
        
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="sm" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CertificateCard;
