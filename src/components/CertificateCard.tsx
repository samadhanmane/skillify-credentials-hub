
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, CalendarIcon, ExternalLinkIcon } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { format } from 'date-fns';
import { Certificate } from '@/lib/types';

interface CertificateCardProps {
  certificate: Certificate;
  readOnly?: boolean;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, readOnly = false }) => {
  const { deleteCertificate } = useAppContext();

  // Format date from ISO string to readable format
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <CardTitle className="text-lg font-medium">{certificate.title}</CardTitle>
        {!readOnly && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => deleteCertificate(certificate.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{certificate.issuer}</span>
          <Badge variant="outline">{certificate.category}</Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>
            {formatDate(certificate.date)}
            {certificate.expiryDate && ` - ${formatDate(certificate.expiryDate)}`}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {certificate.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      {certificate.credentialUrl && (
        <CardFooter className="pt-2">
          <a 
            href={certificate.credentialUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-blue-600 hover:underline"
          >
            <ExternalLinkIcon className="h-3 w-3 mr-1" />
            View Credential
          </a>
        </CardFooter>
      )}
    </Card>
  );
};

export default CertificateCard;
