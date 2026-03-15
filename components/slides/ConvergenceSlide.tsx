'use client';

import { ConvergenceSlide as ConvergenceSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';

interface Props {
  slide: ConvergenceSlideType;
}

export function ConvergenceSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <div className="slide-content relative z-10 flex flex-col">
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A7285]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-16 py-4 sm:py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl">
            {slide.cards.map((card, index) => (
              <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.5}>
                <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 md:p-7 shadow-sm h-full">
                  <div className="flex items-baseline justify-between mb-2 sm:mb-3">
                    <h3 className="font-[var(--font-heading)] text-base sm:text-lg font-bold text-[#212121]">
                      {card.company}
                    </h3>
                    <span className="text-xs sm:text-sm text-[#9CA3AF] font-medium">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#1A7285] mb-2 sm:mb-3">
                    {card.metric}
                  </p>
                  <p className="text-sm sm:text-base text-[#6B7280] italic leading-relaxed">
                    &ldquo;{card.quote}&rdquo;
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
