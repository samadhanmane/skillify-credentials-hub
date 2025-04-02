
import React, { useMemo, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { CertificateCard } from "@/components/CertificateCard";
import AddCertificateForm from "@/components/AddCertificateForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc } from "lucide-react";

const CertificatesPage: React.FC = () => {
  const { certificates } = useAppContext();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(certificates.map((cert) => cert.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [certificates]);

  const filteredAndSortedCertificates = useMemo(() => {
    let filtered = certificates.filter(
      (cert) =>
        cert.title.toLowerCase().includes(search.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(search.toLowerCase())
    );

    if (filterCategory !== "all") {
      filtered = filtered.filter((cert) => cert.category === filterCategory);
    }

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else {
        return a.issuer.localeCompare(b.issuer);
      }
    });
  }, [certificates, search, sortBy, filterCategory]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Certificates</h1>
          <p className="text-muted-foreground">
            Track and showcase your certifications and achievements.
          </p>
        </div>
        <AddCertificateForm />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
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
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="issuer">Issuer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAndSortedCertificates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No certificates found.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedCertificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
