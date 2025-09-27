import LottieAnimation from "@/components/ui/LottieAnimation";
import loadingAnimation from "@/assets/jsonanimations/Loading Files.json";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner = ({ 
  message = "Loading...", 
  className = "" 
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] ${className}`}>
      <LottieAnimation
        animationData={loadingAnimation}
        width={400}
        height={100}
        loop={true}
        autoplay={true}
        speed={1}
        className="mb-4"
      />
      <p className="text-lg text-muted-foreground font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
