'use client';

import { MemeSlide as MemeSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { Particles } from '@/components/ui/particles';
import { Utensils, Moon, RefreshCw, Play, ChevronRight } from 'lucide-react';

interface Props {
  slide: MemeSlideType;
}

const iconMap = {
  utensils: Utensils,
  moon: Moon,
  repeat: RefreshCw,
  play: Play,
};

const colorMap = {
  violet: { bg: 'from-[#9333EA]/30 to-[#9333EA]/10', border: 'border-[#9333EA]/50', text: 'text-[#9333EA]', shadow: 'shadow-[#9333EA]/20' },
  teal: { bg: 'from-[#1A7285]/30 to-[#1A7285]/10', border: 'border-[#1A7285]/50', text: 'text-[#1A7285]', shadow: 'shadow-[#1A7285]/20' },
  green: { bg: 'from-[#4ADE80]/30 to-[#4ADE80]/10', border: 'border-[#4ADE80]/50', text: 'text-[#4ADE80]', shadow: 'shadow-[#4ADE80]/20' },
  amber: { bg: 'from-[#F59E0B]/30 to-[#F59E0B]/10', border: 'border-[#F59E0B]/50', text: 'text-[#F59E0B]', shadow: 'shadow-[#F59E0B]/20' },
};

export function MemeSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#F8FAFB]">
      <Particles
        className="absolute inset-0"
        quantity={60}
        color="#1A7285"
        size={0.8}
        staticity={40}
      />

      <div className="slide-content relative z-10 flex flex-col items-center justify-center">
        {/* Headline */}
        <BlurFade delay={0.2} duration={0.8}>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-gray-900 text-center mb-20">
            {slide.headline}
          </h1>
        </BlurFade>

        {/* 4 Items with arrows */}
        <div className="flex items-center gap-6">
          {slide.items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const colors = colorMap[item.color];
            return (
              <div key={item.label} className="flex items-center">
                <BlurFade delay={0.4 + index * 0.15} duration={0.5}>
                  <div className="flex flex-col items-center gap-4">
                    <div className={`h-28 w-28 rounded-full bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center shadow-lg ${colors.shadow}`}>
                      <Icon className={`h-14 w-14 ${colors.text}`} />
                    </div>
                    <span className={`text-3xl font-bold ${colors.text} tracking-wide`}>
                      {item.label}
                    </span>
                  </div>
                </BlurFade>
                {index < slide.items.length - 1 && (
                  <BlurFade delay={0.5 + index * 0.15} duration={0.4}>
                    <ChevronRight className="h-10 w-10 text-gray-300 mx-4" />
                  </BlurFade>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
