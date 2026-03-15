'use client';

import { useState, useEffect } from 'react';
import { JobsSlide as JobsSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface Props {
  slide: JobsSlideType;
}

export function JobsSlide({ slide }: Props) {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        setShowAfter(true);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setShowAfter(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <StaticLightRays
        className="opacity-50"
        color="rgba(147, 51, 234, 0.12)"
        blur={60}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-16 py-8">
          <div className="w-full max-w-6xl">
            <div className="flex items-center gap-8">
              {/* Before Column */}
              <BlurFade delay={0.2} duration={0.5} className="flex-1">
                <div className="p-6 rounded-2xl border border-gray-200 bg-white">
                  <h2 className="text-xl font-semibold text-gray-500 mb-6 uppercase tracking-wider">
                    {slide.before.title}
                  </h2>
                  <div className="space-y-3">
                    {slide.before.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg bg-gray-50"
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                        <span className="text-lg text-gray-600">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </BlurFade>

              {/* Arrow */}
              <BlurFade delay={0.3} duration={0.5}>
                <div className="flex-shrink-0">
                  <ArrowRight className="w-12 h-12 text-[#9333EA]" />
                </div>
              </BlurFade>

              {/* After Column */}
              <div
                className={cn(
                  'flex-1 transition-all duration-500',
                  showAfter ? 'opacity-100' : 'opacity-30'
                )}
              >
                <BlurFade delay={0.4} duration={0.5}>
                  <div className="p-6 rounded-2xl border border-[#9333EA]/40 bg-gradient-to-br from-[#9333EA]/10 to-white">
                    <h2 className="text-xl font-semibold text-[#9333EA] mb-6 uppercase tracking-wider">
                      {slide.after.title}
                    </h2>
                    <div className="space-y-3">
                      {slide.after.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 p-4 rounded-lg bg-white/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#9333EA]" />
                            <span className="text-lg text-gray-700">{item.task}</span>
                          </div>
                          {item.percentage !== undefined && (
                            <span className="text-2xl font-bold text-[#9333EA]">
                              {item.percentage}%
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>
          </div>
        </div>

        {/* Footnote */}
        {slide.footnote && (
          <BlurFade delay={0.5} duration={0.5}>
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
