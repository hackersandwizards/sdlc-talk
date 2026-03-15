'use client';

import { useState, useEffect } from 'react';
import { InteractionSlide as InteractionSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { cn } from '@/lib/utils';
import {
  Eye,
  Database,
  FileText,
  Code2,
  Search,
  TestTube,
  AlertTriangle,
} from 'lucide-react';

interface Props {
  slide: InteractionSlideType;
}

const iconMap = {
  eye: Eye,
  database: Database,
  log: FileText,
  script: Code2,
  search: Search,
  test: TestTube,
};

const defaultColor = { bg: 'bg-[#9333EA]/20', text: 'text-[#9333EA]', border: 'border-[#9333EA]/50', activeBg: 'bg-[#9333EA]/5' };

const colorMap = {
  eye: defaultColor,
  database: defaultColor,
  log: defaultColor,
  script: defaultColor,
  search: defaultColor,
  test: defaultColor,
};

export function InteractionSlide({ slide }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        setVisibleCount((prev) => Math.min(slide.capabilities.length + 1, prev + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setVisibleCount((prev) => Math.max(0, prev - 1));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide.capabilities.length]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-50"
        color="rgba(26, 114, 133, 0.2)"
        blur={60}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-14 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 overflow-y-auto">
          <div className="w-full max-w-5xl">
            {/* Problem Statement */}
            <BlurFade delay={0.2} duration={0.5}>
              <div className="mb-6 sm:mb-8 md:mb-10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#EF4444]/30 bg-gradient-to-br from-[#EF4444]/5 to-white">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#EF4444]/20">
                    <AlertTriangle className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 text-[#EF4444]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-[#EF4444] uppercase tracking-wider mb-0.5 sm:mb-1">The Problem</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#6B7280] leading-relaxed">
                      {slide.problem}
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>

            {/* Solution Statement */}
            <BlurFade delay={0.25} duration={0.5}>
              <p className="text-center text-[#6B7280] text-sm sm:text-base md:text-lg mb-2">
                We want to enable the Coding Agent to...
              </p>
            </BlurFade>

            {/* Capabilities Grid */}
            <BlurFade delay={0.3} duration={0.5}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {slide.capabilities.map((capability, index) => {
                  const Icon = iconMap[capability.icon];
                  const colors = colorMap[capability.icon];
                  const isActive = index < visibleCount;

                  return (
                    <div
                      key={index}
                      className={cn(
                        'p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border transition-all duration-300 min-h-[80px] sm:min-h-[100px] md:h-[120px] flex items-center',
                        isActive
                          ? cn(colors.border, colors.activeBg)
                          : 'border-gray-200 bg-gray-50 opacity-30'
                      )}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 w-full">
                        <div
                          className={cn(
                            'flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg',
                            isActive ? colors.bg : 'bg-gray-100'
                          )}
                        >
                          <Icon
                            className={cn(
                              'h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6',
                              isActive ? colors.text : 'text-[#9CA3AF]'
                            )}
                          />
                        </div>
                        <div>
                          <h3
                            className={cn(
                              'font-semibold text-sm sm:text-base md:text-lg',
                              isActive ? 'text-[#212121]' : 'text-[#9CA3AF]'
                            )}
                          >
                            {capability.title}
                          </h3>
                          <p
                            className={cn(
                              'text-xs sm:text-sm mt-0.5',
                              isActive ? 'text-[#6B7280]' : 'text-[#9CA3AF]'
                            )}
                          >
                            {capability.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </BlurFade>

            {/* How? CTA */}
            <div
              className={cn(
                'mt-6 sm:mt-8 md:mt-12 flex justify-center transition-all duration-500',
                visibleCount > slide.capabilities.length
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              )}
            >
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#9333EA]">
                How?
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
