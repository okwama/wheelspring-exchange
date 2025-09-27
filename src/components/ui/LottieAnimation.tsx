import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  width?: number | string;
  height?: number | string;
}

const LottieAnimation = ({ 
  animationData, 
  className = "",
  loop = true,
  autoplay = true,
  speed = 1,
  width = "auto",
  height = "auto"
}: LottieAnimationProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (animationData) {
      setIsLoaded(true);
    }
  }, [animationData]);

  if (!isLoaded || !animationData) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-automotive-navy"></div>
      </div>
    );
  }

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LottieAnimation;
