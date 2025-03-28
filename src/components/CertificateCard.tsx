
import React from 'react';
import { Certificate } from '@/lib/types';

interface CertificateCardProps {
  certificate: Certificate;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  onEdit,
  onDelete,
  onView
}) => {
  const { title, issuer, date, expiryDate, credentialUrl } = certificate;
  
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Check if certificate is expired
  const isExpired = expiryDate ? new Date(expiryDate) < new Date() : false;

  return (
    <div className="card animate-fade-in">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted">Issued by {issuer}</p>
          </div>
          {isExpired ? (
            <span className="badge" style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444' 
            }}>
              Expired
            </span>
          ) : (
            <span className="badge badge-success">
              Active
            </span>
          )}
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" style={{ color: 'var(--muted-color)' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Issued: {formatDate(date)}</span>
          </div>
          
          {expiryDate && (
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" style={{ color: 'var(--muted-color)' }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Expires: {formatDate(expiryDate)}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {credentialUrl && (
            <a 
              href={credentialUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline text-sm py-1 px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Verify</span>
            </a>
          )}
          
          {onView && (
            <button 
              onClick={onView} 
              className="btn btn-primary text-sm py-1 px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View</span>
            </button>
          )}
          
          {onEdit && (
            <button 
              onClick={onEdit} 
              className="btn btn-outline text-sm py-1 px-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Edit</span>
            </button>
          )}
          
          {onDelete && (
            <button 
              onClick={onDelete} 
              className="btn btn-outline text-sm py-1 px-3"
              style={{ color: 'var(--danger-color)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
