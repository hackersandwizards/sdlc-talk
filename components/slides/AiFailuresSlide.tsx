'use client';

import { useState, useEffect } from 'react';
import { AiFailuresSlide as AiFailuresSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  slide: AiFailuresSlideType;
}

export function AiFailuresSlide({ slide }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const maxSteps = slide.reasons.length + 1; // +1 for conclusion

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        setVisibleCount((prev) => Math.min(maxSteps, prev + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setVisibleCount((prev) => Math.max(0, prev - 1));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maxSteps]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <StaticLightRays
        className="opacity-60"
        color="rgba(147, 51, 234, 0.15)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <AlertTriangle className="h-10 w-10 text-[#9333EA]" />
              <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                {slide.headline}
              </h1>
            </div>
          </BlurFade>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-16 py-8">
          <div className="flex flex-col gap-8 w-full max-w-4xl">
            {/* Intro */}
            <BlurFade delay={0.2} duration={0.5}>
              <p className="text-2xl text-gray-600 text-center">
                {slide.intro}
              </p>
            </BlurFade>

            {/* Percentage Bars */}
            <BlurFade delay={0.3} duration={0.5}>
              <div className="flex flex-col gap-6 mt-4">
                {slide.reasons.map((reason, index) => {
                  const isVisible = index < visibleCount;
                  const isLarge = reason.percentage > 50;

                  return (
                    <div
                      key={index}
                      className={cn(
                        'transition-all duration-500',
                        isVisible
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-8'
                      )}
                    >
                      <div className="flex items-center gap-6 mb-2">
                        <span
                          className={cn(
                            'text-4xl font-bold',
                            isLarge ? 'text-[#9333EA]' : 'text-[#1A7285]'
                          )}
                        >
                          {reason.percentage}%
                        </span>
                        <span className="text-xl text-gray-700">
                          {reason.label}
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-700',
                            isLarge
                              ? 'bg-gradient-to-r from-[#9333EA] to-[#9333EA]/70'
                              : 'bg-gradient-to-r from-[#1A7285] to-[#1A7285]/70'
                          )}
                          style={{
                            width: isVisible ? `${reason.percentage}%` : '0%',
                            transitionDelay: isVisible ? '200ms' : '0ms',
                          }}
                        />
                      </div>
                      {reason.description && (
                        <p className="mt-2 text-sm text-gray-400 italic">
                          {reason.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </BlurFade>

            {/* Conclusion */}
            <div
              className={cn(
                'mt-8 p-6 rounded-xl border transition-all duration-500',
                visibleCount > slide.reasons.length
                  ? 'opacity-100 translate-y-0 border-[#9333EA]/40 bg-gradient-to-br from-[#9333EA]/10 to-white'
                  : 'opacity-0 translate-y-4 pointer-events-none border-transparent'
              )}
            >
              <p className="text-2xl font-semibold text-[#9333EA] text-center">
                {slide.conclusion}
              </p>
            </div>
          </div>
        </div>

        {/* Footnote */}
        {slide.footnote && (
          <BlurFade delay={0.4} duration={0.5}>
            <div className="pb-8 text-center">
              <p className="text-sm text-gray-400">
                * {slide.footnote}
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
