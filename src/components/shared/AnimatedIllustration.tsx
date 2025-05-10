
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface AnimatedIllustrationProps {
  animationData: any;
  width?: number | string;
  height?: number | string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const AnimatedIllustration: React.FC<AnimatedIllustrationProps> = ({
  animationData,
  width = '100%',
  height = '100%',
  className = '',
  loop = true,
  autoplay = true,
}) => {
  const animationContainer = useRef<HTMLDivElement>(null);
  const anim = useRef<any>(null);

  useEffect(() => {
    if (animationContainer.current) {
      anim.current = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData,
      });
    }
    
    return () => {
      if (anim.current) {
        anim.current.destroy();
      }
    };
  }, [animationData, loop, autoplay]);

  return (
    <div 
      ref={animationContainer} 
      style={{ width, height }} 
      className={className}
    />
  );
};

export default AnimatedIllustration;
