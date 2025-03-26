
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export type SkillProps = {
  id: string;
  name: string;
  level: number;
  category: string;
};

interface SkillCardProps {
  skill: SkillProps;
  readOnly?: boolean;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, readOnly = false }) => {
  const { deleteSkill } = useAppContext();

  const getLevelText = (level: number) => {
    if (level < 30) return 'Beginner';
    if (level < 60) return 'Intermediate';
    if (level < 85) return 'Advanced';
    return 'Expert';
  };

  const getProgressColor = (level: number) => {
    if (level < 30) return 'bg-blue-500';
    if (level < 60) return 'bg-green-500';
    if (level < 85) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <h3 className="font-medium">{skill.name}</h3>
          </div>
          {!readOnly && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => deleteSkill(skill.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <Badge variant="outline" className="mb-3">{skill.category}</Badge>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Proficiency</span>
            <span>{getLevelText(skill.level)}</span>
          </div>
          <Progress value={skill.level} className={getProgressColor(skill.level)} />
        </div>
      </CardContent>
    </Card>
  );
};
