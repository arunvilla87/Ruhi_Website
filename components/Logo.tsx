"use client";

import { Lightbulb } from 'lucide-react';

export const Logo = ({ className = "", isScrolled = false }: { className?: string, isScrolled?: boolean }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isScrolled ? 'bg-cyan-100' : 'bg-white/10'
      }`}>
        <Lightbulb className={`w-5 h-5 ${isScrolled ? 'text-cyan-500' : 'text-cyan-300'}`} />
      </div>
      <div className={`font-bold tracking-wide ${
        isScrolled ? 'text-gray-900' : 'text-white'
      }`}>
        <div className="text-xl">RUHI ENTERPRISES</div>
        <div className="text-sm tracking-widest">INC</div>
      </div>
    </div>
  );
};