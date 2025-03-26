
import React from "react";
import { useAppContext } from "@/context/AppContext";
import SkillRadarChart from "@/components/SkillRadarChart";
import SkillCategoryChart from "@/components/SkillCategoryChart";
import { CertificateCard } from "@/components/CertificateCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BarChart, GraduationCap } from "lucide-react";

const DashboardPage: React.FC = () => {
  const { skills, certificates } = useAppContext();

  const totalSkills = skills.length;
  const totalCertificates = certificates.length;
  const avgSkillLevel = Math.round(
    skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length
  );

  // Get latest certificates
  const latestCertificates = [...certificates]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your skills and certifications.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSkills}</div>
            <p className="text-xs text-muted-foreground">
              Skills tracked across categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Skill Level</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSkillLevel}%</div>
            <p className="text-xs text-muted-foreground">
              Overall proficiency level
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCertificates}</div>
            <p className="text-xs text-muted-foreground">
              Certifications earned
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skill Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillCategoryChart skills={skills} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skill Proficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillRadarChart skills={skills} />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Latest Certificates</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {latestCertificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
