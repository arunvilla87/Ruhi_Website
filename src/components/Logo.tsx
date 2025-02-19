"use client";

export const Logo = ({ className = "", isScrolled = false }: { className?: string, isScrolled?: boolean }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <img 
        src="/logo.png" 
        alt="RUHI ENTERPRISES INC" 
        className={`h-12 transition-opacity duration-300 ${
          isScrolled ? 'opacity-90' : 'opacity-100'
        }`}
      />
      <div className={`font-bold tracking-wider ${
        isScrolled 
          ? 'text-[#00E5D1]' 
          : 'text-[#00E5D1]'
      }`}>
        <div className="text-2xl flex items-center gap-2">
          <span>RUHI ENTERPRISES INC</span>
        </div>
      </div>
    </div>
  );
};