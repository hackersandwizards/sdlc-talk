'use client';

import { useState, useEffect } from 'react';
import { BigStatementSlide as BigStatementSlideType } from '@/types/slide';
import { Particles } from '@/components/ui/particles';
import { BlurFade } from '@/components/ui/blur-fade';

interface Props {
  slide: BigStatementSlideType;
}

function getInitialRevealCount(totalReveals: number) {
  if (totalReveals === 0) return 0;
  if (typeof window === 'undefined') return 0;
  const isBack = sessionStorage.getItem('slide-direction') === 'back';
  if (isBack) {
    sessionStorage.removeItem('slide-direction');
    return totalReveals;
  }
  return 0;
}

export function BigStatementSlide({ slide }: Props) {
  const totalReveals = (slide.points?.length ?? 0) + (slide.closing ? 1 : 0);
  const [revealedCount, setRevealedCount] = useState(() => getInitialRevealCount(totalReveals));

  useEffect(() => {
    if (totalReveals === 0) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        if (revealedCount < totalReveals) {
          event.preventDefault();
          event.stopPropagation();
          setRevealedCount((prev) => Math.min(totalReveals, prev + 1));
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [totalReveals, revealedCount]);

  const showClosing = slide.closing && revealedCount >= (slide.points?.length ?? 0) + 1;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-[#F5F3F8] to-[#9333EA]/5">
      <Particles
        className="absolute inset-0"
        quantity={60}
        color="#1A7285"
        size={0.5}
        staticity={40}
      />
      <div className="slide-content relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {slide.lines.map((line, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.6}>
            <p className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#212121] leading-tight">
              {line}
            </p>
          </BlurFade>
        ))}

        {slide.subtitle && (
          <BlurFade delay={0.2 + slide.lines.length * 0.15 + 0.2} duration={0.5}>
            <p className="font-[var(--font-heading)] text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-[#1A7285] mt-6 sm:mt-8 max-w-4xl">
              {slide.subtitle}
            </p>
          </BlurFade>
        )}

        {slide.crossedOut && (
          <BlurFade delay={0.5 + slide.lines.length * 0.15} duration={0.5}>
            <p className="mt-8 text-xl sm:text-2xl md:text-3xl text-[#9CA3AF] line-through decoration-[#EF4444]/70 decoration-2">
              {slide.crossedOut}
            </p>
          </BlurFade>
        )}

        {slide.highlighted && (
          <BlurFade delay={0.7 + slide.lines.length * 0.15} duration={0.5}>
            <p className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A7285]">
              {slide.highlighted}
            </p>
          </BlurFade>
        )}

        {slide.points && slide.points.length > 0 && (
          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 w-full max-w-3xl min-h-[60px]">
            {slide.points.map((point, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index < revealedCount
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'
                }`}
              >
                <div className="flex items-start gap-3 text-base sm:text-lg md:text-xl text-[#6B7280] text-left">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#9333EA]" />
                  {point}
                </div>
              </div>
            ))}

            {slide.closing && (
              <div
                className={`transition-all duration-500 mt-6 sm:mt-8 ${
                  showClosing
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none h-0 overflow-hidden'
                }`}
              >
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#9333EA] text-center italic">
                  &ldquo;{slide.closing}&rdquo;
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
