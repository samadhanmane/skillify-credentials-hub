
import React from "react";
import { Skill } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface SkillCardProps {
  skill: Skill;
  onEdit?: () => void;
  onDelete?: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onEdit, onDelete }) => {
  const { name, level, category } = skill;

  const getLevelLabel = (level: number) => {
    if (level < 30) return "Beginner";
    if (level < 60) return "Intermediate";
    if (level < 85) return "Advanced";
    return "Expert";
  };

  const getLevelColor = (level: number) => {
    if (level < 30) return "bg-blue-500";
    if (level < 60) return "bg-indigo-500";
    if (level < 85) return "bg-violet-500";
    return "bg-purple-500";
  };

  return (
    <Card className="overflow-hidden hover-lift h-full">
      <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
        <div>
          <Badge variant="outline" className="mb-1 bg-accent">
            {category}
          </Badge>
          <h3 className="font-medium">{name}</h3>
        </div>
        <Badge variant="secondary">
          {getLevelLabel(level)}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Proficiency</span>
            <span className="font-medium">{level}%</span>
          </div>
          <Progress value={level} className="h-2" />
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex justify-end gap-2 mt-4">
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
        )}
      </CardContent>
    </Card>
  );
};

export default SkillCard;
