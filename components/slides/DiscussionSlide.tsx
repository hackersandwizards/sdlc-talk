'use client';

import { useState, useEffect } from 'react';
import { DiscussionSlide as DiscussionSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';

interface Props {
  slide: DiscussionSlideType;
}

export function DiscussionSlide({ slide }: Props) {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setRevealedCount((prev) => Math.min(slide.seedQuestions.length, prev + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setRevealedCount((prev) => Math.max(0, prev - 1));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide.seedQuestions.length]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <div className="slide-content relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 md:px-16">
        <BlurFade delay={0.2} duration={0.8}>
          <h1 className="font-[var(--font-heading)] text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1A7285] text-center">
            {slide.headline}
          </h1>
        </BlurFade>

        <div className="mt-10 sm:mt-12 md:mt-16 space-y-4 sm:space-y-5 w-full max-w-3xl">
          {slide.seedQuestions.map((question, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index < revealedCount
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <p className="text-lg sm:text-xl text-[#6B7280] italic text-center">
                &ldquo;{question}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
