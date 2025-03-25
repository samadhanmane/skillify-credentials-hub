
import React, { useMemo } from "react";
import { Skill } from "@/lib/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface SkillCategoryChartProps {
  skills: Skill[];
  size?: number;
}

const SkillCategoryChart: React.FC<SkillCategoryChartProps> = ({ skills, size = 300 }) => {
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {};
    
    //Count skills by category and calculate average level
    skills.forEach((skill) => {
      if (!categories[skill.category]) {
        categories[skill.category] = 0;
      }
      categories[skill.category]++;
    });

    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  }, [skills]);

  const COLORS = [
    "hsl(var(--primary))",
    "hsl(266, 100%, 50%)",
    "hsl(199, 89%, 48%)",
    "hsl(358, 75%, 59%)",
    "hsl(156, 72%, 67%)",
    "hsl(35, 100%, 50%)"
  ];

  return (
    <div style={{ width: "100%", height: size }} className="animate-scale-in">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name }) => name}
            labelLine={true}
          >
            {categoryData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} skills`, 'Count']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillCategoryChart;
