
import React, { useMemo, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import SkillCard from "@/components/SkillCard";
import AddSkillForm from "@/components/AddSkillForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc } from "lucide-react";

const SkillsPage: React.FC = () => {
  const { skills } = useAppContext();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(skills.map((skill) => skill.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [skills]);

  const filteredAndSortedSkills = useMemo(() => {
    let filtered = skills.filter((skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase())
    );

    if (filterCategory !== "all") {
      filtered = filtered.filter((skill) => skill.category === filterCategory);
    }

    return filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "level") {
        return b.level - a.level;
      } else {
        return a.category.localeCompare(b.category);
      }
    });
  }, [skills, search, sortBy, filterCategory]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Skills</h1>
          <p className="text-muted-foreground">
            Manage and track your professional skills.
          </p>
        </div>
        <AddSkillForm />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2 sm:gap-4">
          <Select onValueChange={setFilterCategory} value={filterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSortBy} value={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" />
                  <span>Sort by</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="level">Level</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAndSortedSkills.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No skills found.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsPage;
