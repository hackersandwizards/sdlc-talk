'use client';

import { useState, useEffect } from 'react';
import { PillarsSlide as PillarsSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import {
  Brain, Wrench, Shield, Map, GraduationCap, Sparkles,
  Timer, ArrowRightLeft, Users, Lightbulb, Rocket, Factory, Zap,
} from 'lucide-react';

interface Props {
  slide: PillarsSlideType;
}

const iconMap: Record<string, typeof Brain> = {
  brain: Brain,
  shield: Shield,
  wrench: Wrench,
  map: Map,
  graduation: GraduationCap,
  sparkles: Sparkles,
  timer: Timer,
  'arrow-right-left': ArrowRightLeft,
  users: Users,
  lightbulb: Lightbulb,
  rocket: Rocket,
  factory: Factory,
  zap: Zap,
};

const defaultIcons = [Brain, Shield, Wrench];

function getInitialRevealCount(pillarCount: number, allActive?: boolean) {
  if (allActive) return pillarCount;
  if (typeof window === 'undefined') return 0;
  const isBack = sessionStorage.getItem('slide-direction') === 'back';
  if (isBack) {
    sessionStorage.removeItem('slide-direction');
    return pillarCount;
  }
  return 0;
}

export function PillarsSlide({ slide }: Props) {
  const [revealedCount, setRevealedCount] = useState(() =>
    getInitialRevealCount(slide.pillars.length, slide.allActive)
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        if (revealedCount < slide.pillars.length) {
          event.preventDefault();
          event.stopPropagation();
          setRevealedCount((prev) => Math.min(slide.pillars.length, prev + 1));
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [slide.pillars.length, revealedCount]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <div className="slide-content relative z-10 flex flex-col">
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="font-[var(--font-heading)] text-5xl font-bold tracking-tight text-[#1A7285]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        <div className="flex flex-1 items-center justify-center px-16 py-8">
          <div className="flex gap-8 w-full max-w-5xl justify-center items-stretch">
            {slide.pillars.map((pillar, index) => {
              const Icon = pillar.icon
                ? iconMap[pillar.icon] || defaultIcons[index] || Brain
                : defaultIcons[index] || Brain;
              const isRevealed = index < revealedCount;
              const isActive = index === revealedCount - 1;
              const isPast = index < revealedCount - 1;

              return (
                <div
                  key={index}
                  className={`flex transition-all duration-500 ${
                    isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <div
                    className={`relative flex flex-col items-center text-center w-64 p-8 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'border-[#9333EA]/40 bg-[#9333EA]/5 shadow-lg shadow-[#9333EA]/10 scale-105'
                        : 'border-gray-200 bg-white shadow-sm'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-16 h-16 rounded-full text-3xl font-bold mb-4 ${
                        isActive
                          ? 'bg-gradient-to-r from-[#1A7285] to-[#9333EA] text-white'
                          : isPast
                            ? 'bg-[#1A7285]/10 text-[#1A7285]'
                            : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </div>

                    <Icon
                      className={`h-10 w-10 mb-4 ${
                        isActive
                          ? 'text-[#9333EA]'
                          : isPast
                            ? 'text-[#1A7285]'
                            : 'text-gray-400'
                      }`}
                    />

                    <h2
                      className={`text-xl font-bold ${
                        isRevealed ? 'text-gray-900' : 'text-gray-600'
                      }`}
                    >
                      {pillar.title}
                    </h2>

                    {pillar.description && (
                      <p
                        className={`mt-2 text-base ${
                          isRevealed ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {pillar.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
