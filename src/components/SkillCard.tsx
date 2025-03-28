
import React from 'react';

interface SkillCardProps {
  name: string;
  level: string;
  category: string;
  proficiency: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  name,
  level,
  category,
  proficiency,
  onEdit,
  onDelete
}) => {
  // Helper function to determine background color based on proficiency
  const getProficiencyColor = (prof: number) => {
    if (prof >= 80) return 'var(--success-color)';
    if (prof >= 60) return '#22c55e';
    if (prof >= 40) return '#eab308';
    if (prof >= 20) return '#f97316';
    return '#ef4444';
  };

  // Helper function to determine level badge style
  const getLevelBadgeClass = (lvl: string) => {
    switch (lvl.toLowerCase()) {
      case 'beginner':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'intermediate':
        return { bg: 'rgba(234, 179, 8, 0.1)', color: '#eab308' };
      case 'advanced':
        return { bg: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' };
      case 'expert':
        return { bg: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' };
      default:
        return { bg: 'rgba(100, 116, 139, 0.1)', color: 'var(--muted-color)' };
    }
  };

  const levelStyle = getLevelBadgeClass(level);

  return (
    <div className="card animate-fade-in">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{name}</h3>
          <span 
            className="badge" 
            style={{ 
              backgroundColor: levelStyle.bg, 
              color: levelStyle.color 
            }}
          >
            {level}
          </span>
        </div>
        
        <p className="text-sm text-muted mb-3">{category}</p>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Proficiency</span>
            <span>{proficiency}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${proficiency}%`,
                backgroundColor: getProficiencyColor(proficiency)
              }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2 mt-3">
          {onEdit && (
            <button 
              onClick={onEdit} 
              className="btn btn-outline text-sm py-1 px-3"
              aria-label="Edit skill"
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
              aria-label="Delete skill"
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

export default SkillCard;
