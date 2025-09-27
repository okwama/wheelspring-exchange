import React from 'react';
import logoImage from '@/assets/logo.png';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 50 }) => {
  return (
    <img 
      src={logoImage}
      alt="Gold Standard Cars Logo"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        display: 'block'
      }}
    />
  );
};

export default Logo;

