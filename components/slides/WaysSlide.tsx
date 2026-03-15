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
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-60"
        color="rgba(26, 114, 133, 0.2)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Ways grid */}
        <div className="flex flex-1 items-start sm:items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-2 sm:py-6 md:py-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 md:gap-8 w-full max-w-6xl">
            {slide.ways.map((way, index) => (
              <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.5}>
                <div
                  className={`relative flex flex-col rounded-xl sm:rounded-2xl border p-3 sm:p-6 md:p-8 transition-all duration-300 ${
                    activeIndex === index
                      ? 'border-[#9333EA]/40 bg-gradient-to-br from-[#9333EA]/5 to-white md:scale-105'
                      : 'border-gray-200 bg-white hover:border-[#9333EA]/30 hover:bg-gray-50'
                  }`}
                >
                  {/* Badge in top right */}
                  {way.badge && (
                    <span
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                        activeIndex === index
                          ? 'bg-[#9333EA]/10 text-[#9333EA] border border-[#9333EA]/30'
                          : 'bg-gray-100 text-[#9CA3AF] border border-gray-200'
                      }`}
                    >
                      {way.badge}
                    </span>
                  )}

                  {/* Number badge */}
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full text-lg sm:text-xl md:text-2xl font-bold ${
                      activeIndex === index
                        ? 'bg-gradient-to-r from-[#9333EA] to-[#9333EA] text-white'
                        : 'bg-gray-100 text-[#6B7280]'
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Title */}
                  <h2
                    className={`text-lg sm:text-xl md:text-2xl font-bold mt-2 sm:mt-3 md:mt-4 ${
                      activeIndex === index ? 'text-[#212121]' : 'text-[#6B7280]'
                    }`}
                  >
                    {way.title}
                  </h2>

                  {/* Description */}
                  <div className="mt-2 sm:mt-3">
                    {way.description && (
                      <p
                        className={`text-sm sm:text-base md:text-lg ${
                          activeIndex === index ? 'text-[#6B7280]' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {way.description}
                      </p>
                    )}
                  </div>

                  {/* Prompt */}
                  <div className="mt-2">
                    {way.prompt && (
                      <div
                        className={`rounded-lg border p-2 sm:p-3 font-mono text-xs sm:text-sm md:text-base ${
                          activeIndex === index
                            ? 'border-gray-300 bg-gray-100 text-[#4ADE80]'
                            : 'border-gray-200 bg-gray-50 text-[#9CA3AF]'
                        }`}
                      >
                        <span className="opacity-60">&gt; </span>
                        {way.prompt}
                      </div>
                    )}
                  </div>

                  {/* Pros/Cons section - grows to fill remaining space */}
                  <div className="flex-1 flex flex-col justify-end mt-4 sm:mt-6">
                    {/* Pros */}
                    {way.pros && way.pros.length > 0 && (
                      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                        {way.pros.map((pro, proIndex) => (
                          <div
                            key={proIndex}
                            className={`flex items-start gap-1.5 sm:gap-2 ${
                              activeIndex === index ? 'text-[#4ADE80]' : 'text-[#9CA3AF]'
                            }`}
                          >
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                            <span className={`text-sm sm:text-base ${activeIndex === index ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                              {pro}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Cons */}
                    {way.cons && way.cons.length > 0 && (
                      <div className="space-y-1.5 sm:space-y-2">
                        {way.cons.map((con, conIndex) => (
                          <div
                            key={conIndex}
                            className={`flex items-start gap-1.5 sm:gap-2 ${
                              activeIndex === index ? 'text-[#EF4444]' : 'text-[#9CA3AF]'
                            }`}
                          >
                            <X className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                            <span className={`text-sm sm:text-base ${activeIndex === index ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                              {con}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlight */}
                    {way.highlight && (
                      <div
                        className={`mt-3 sm:mt-4 pt-3 sm:pt-4 border-t text-center font-medium text-sm sm:text-base ${
                          activeIndex === index
                            ? 'border-[#9333EA]/20 text-[#9333EA]'
                            : 'border-gray-200 text-[#9CA3AF]'
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
            <div className="pb-4 sm:pb-6 md:pb-8 text-center px-4">
              <p className="text-xs sm:text-sm text-[#9CA3AF]">
                {slide.footer}
              </p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
