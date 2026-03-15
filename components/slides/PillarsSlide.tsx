'use client';

import { PillarsSlide as PillarsSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { Brain, Wrench, Shield } from 'lucide-react';

interface Props {
  slide: PillarsSlideType;
}

const pillarIcons = [Brain, Shield, Wrench];

export function PillarsSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-60"
        color="rgba(147, 51, 234, 0.15)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Pillars */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl justify-center items-stretch">
            {slide.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] || Brain;
              const isFocused = slide.allActive || slide.focusIndex === index;

              return (
                <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.5} className="flex">
                  <div
                    className={`relative flex flex-col items-center text-center w-full sm:w-48 md:w-56 lg:w-64 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                      isFocused
                        ? 'border-[#9333EA]/60 bg-gradient-to-br from-[#9333EA]/5 to-white sm:scale-105'
                        : 'border-gray-200 bg-white hover:border-[#9333EA]/30 hover:bg-gray-50'
                    }`}
                  >
                    {/* Focus indicator */}
                    {isFocused && !slide.allActive && (
                      <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 sm:px-3 sm:py-1 bg-[#9333EA] text-white text-[10px] sm:text-xs font-bold rounded-full">
                        UP NEXT
                      </div>
                    )}

                    {/* Number */}
                    <div
                      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 ${
                        isFocused
                          ? 'bg-gradient-to-r from-[#9333EA] to-[#9333EA] text-white'
                          : 'bg-gray-100 text-[#6B7280]'
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <Icon
                      className={`h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 mb-2 sm:mb-3 md:mb-4 ${
                        isFocused ? 'text-[#9333EA]' : 'text-[#9CA3AF]'
                      }`}
                    />

                    {/* Title */}
                    <h2
                      className={`text-base sm:text-lg md:text-xl font-bold ${
                        isFocused ? 'text-[#212121]' : 'text-[#6B7280]'
                      }`}
                    >
                      {pillar.title}
                    </h2>

                    {/* Description */}
                    {pillar.description && (
                      <p
                        className={`mt-1 sm:mt-2 text-sm sm:text-base ${
                          isFocused ? 'text-[#6B7280]' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {pillar.description}
                      </p>
                    )}
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
