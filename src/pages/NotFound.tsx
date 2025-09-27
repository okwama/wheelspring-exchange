import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ErrorPage from "@/components/ErrorPage";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <ErrorPage 
      title="404"
      message="Oops! The page you're looking for doesn't exist."
      showBackButton={true}
      showHomeButton={true}
    />
  );
};

export default NotFound;
