'use client';

import { useState, useEffect } from 'react';
import { WaysSlide as WaysSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { Check, X } from 'lucide-react';

interface Props {
  slide: WaysSlideType;
}

export function WaysSlide({ slide }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(slide.ways.length - 1, prev + 1));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide.ways.length]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <StaticLightRays
        className="opacity-60"
        color="rgba(147, 51, 234, 0.2)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-6xl font-bold tracking-tight text-gray-900">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Ways grid */}
        <div className="flex flex-1 items-center justify-center px-16 py-8">
          <div className="grid grid-cols-2 gap-8 w-full max-w-6xl">
            {slide.ways.map((way, index) => (
              <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.5}>
                <div
                  className={`relative min-h-[520px] flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                    activeIndex === index
                      ? 'border-[#9333EA]/60 bg-gradient-to-br from-[#9333EA]/10 to-white scale-105'
                      : 'border-gray-200 bg-white hover:border-[#9333EA]/40 hover:bg-gray-50'
                  }`}
                >
                  {/* Badge in top right */}
                  {way.badge && (
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                        activeIndex === index
                          ? 'bg-[#9333EA]/20 text-[#9333EA] border border-[#9333EA]/50'
                          : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                    >
                      {way.badge}
                    </span>
                  )}

                  {/* Number badge */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl font-bold ${
                      activeIndex === index
                        ? 'bg-gradient-to-r from-[#9333EA] to-[#9333EA]/80 text-white'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Title - fixed height */}
                  <h2
                    className={`text-2xl font-bold mt-4 h-8 ${
                      activeIndex === index ? 'text-gray-900' : 'text-gray-600'
                    }`}
                  >
                    {way.title}
                  </h2>

                  {/* Description - fixed height */}
                  <div className="h-16 mt-3">
                    {way.description && (
                      <p
                        className={`text-lg ${
                          activeIndex === index ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {way.description}
                      </p>
                    )}
                  </div>

                  {/* Prompt - fixed height */}
                  <div className="h-14 mt-2">
                    {way.prompt && (
                      <div
                        className={`rounded-lg border p-3 font-mono text-base ${
                          activeIndex === index
                            ? 'border-gray-300 bg-gray-50 text-[#1A7285]'
                            : 'border-gray-200 bg-white text-gray-400'
                        }`}
                      >
                        <span className="opacity-60">&gt; </span>
                        {way.prompt}
                      </div>
                    )}
                  </div>

                  {/* Pros/Cons section - grows to fill remaining space */}
                  <div className="flex-1 flex flex-col justify-end mt-6">
                    {/* Pros */}
                    {way.pros && way.pros.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {way.pros.map((pro, proIndex) => (
                          <div
                            key={proIndex}
                            className={`flex items-start gap-2 ${
                              activeIndex === index ? 'text-green-600' : 'text-gray-300'
                            }`}
                          >
                            <Check className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span className={activeIndex === index ? 'text-gray-600' : 'text-gray-400'}>
                              {pro}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cons */}
                    {way.cons && way.cons.length > 0 && (
                      <div className="space-y-2">
                        {way.cons.map((con, conIndex) => (
                          <div
                            key={conIndex}
                            className={`flex items-start gap-2 ${
                              activeIndex === index ? 'text-red-500' : 'text-gray-300'
                            }`}
                          >
                            <X className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span className={activeIndex === index ? 'text-gray-600' : 'text-gray-400'}>
                              {con}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlight */}
                    {way.highlight && (
                      <div
                        className={`mt-4 pt-4 border-t text-center font-medium ${
                          activeIndex === index
                            ? 'border-[#9333EA]/30 text-[#9333EA]'
                            : 'border-gray-200 text-gray-400'
                        }`}
                      >
                        {way.highlight}
                      </div>
                    )}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Footer */}
        {slide.footer && (
          <BlurFade delay={0.5} duration={0.5}>
            <div className="pb-8 text-center">
              <p className="text-sm text-gray-400">
                {slide.footer}
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
