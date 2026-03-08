import { ReactNode } from 'react';

interface ParallaxSectionProps {
  backgroundImage: string;
  children: ReactNode;
  overlayOpacity?: string;
  minHeight?: string;
  contentClassName?: string;
}

export default function ParallaxSection({ 
  backgroundImage, 
  children, 
  overlayOpacity = 'bg-black/50',
  minHeight = 'min-h-[400px]',
  contentClassName = 'container-custom px-4 md:px-8 py-16 text-center'
}: ParallaxSectionProps) {
  return (
    <section 
      className={`relative ${minHeight} flex items-center justify-center overflow-hidden`}
    >
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      
      {/* Content */}
      <div className={`relative z-10 ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}
