
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-2xl font-semibold mt-4 mb-2">Page Not Found</p>
      <p className="text-muted-foreground max-w-md mb-6">
        We couldn't find the page you were looking for. The page might have been removed, 
        renamed, or is temporarily unavailable.
      </p>
      <Button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2"
      >
        <Home size={16} />
        Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
