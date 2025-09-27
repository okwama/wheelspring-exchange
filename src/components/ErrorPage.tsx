import LottieAnimation from "@/components/ui/LottieAnimation";
import errorAnimation from "@/assets/jsonanimations/404 error.json";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const ErrorPage = ({ 
  title = "404",
  message = "Oops! Page not found",
  showBackButton = true,
  showHomeButton = true 
}: ErrorPageProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Lottie Animation */}
        <div className="mb-8">
          <LottieAnimation
            animationData={errorAnimation}
            width={600}
            height={300}
            loop={true}
            autoplay={true}
            speed={1}
            className="mx-auto"
          />
        </div>

        {/* Error Content */}
        <div className="space-y-4 mb-8">
          <h1 className="text-6xl font-bold text-automotive-navy">{title}</h1>
          <p className="text-xl text-muted-foreground">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showBackButton && (
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}
          {showHomeButton && (
            <Link to="/">
              <Button className="flex items-center gap-2 bg-automotive-navy hover:bg-automotive-dark">
                <Home className="h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
