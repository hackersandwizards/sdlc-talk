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
  violet: { bg: 'from-violet-500/30 to-violet-600/10', border: 'border-violet-500/50', text: 'text-violet-400', shadow: 'shadow-violet-500/20' },
  teal: { bg: 'from-cyan-500/30 to-cyan-600/10', border: 'border-cyan-500/50', text: 'text-cyan-400', shadow: 'shadow-cyan-500/20' },
  green: { bg: 'from-green-500/30 to-green-600/10', border: 'border-green-500/50', text: 'text-green-400', shadow: 'shadow-green-500/20' },
  amber: { bg: 'from-amber-500/30 to-amber-600/10', border: 'border-amber-500/50', text: 'text-amber-400', shadow: 'shadow-amber-500/20' },
};

export function MemeSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-950">
      <Particles
        className="absolute inset-0"
        quantity={60}
        color="#f59e0b"
        size={0.8}
        staticity={40}
      />

      <div className="slide-content relative z-10 flex flex-col items-center justify-center">
        {/* Headline */}
        <BlurFade delay={0.2} duration={0.8}>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white text-center mb-20">
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
                    <ChevronRight className="h-10 w-10 text-slate-500/60 mx-4" />
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
