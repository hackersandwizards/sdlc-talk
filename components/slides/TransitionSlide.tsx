'use client';

import { TransitionSlide as TransitionSlideType } from '@/types/slide';
import { Particles } from '@/components/ui/particles';
import { BlurFade } from '@/components/ui/blur-fade';

interface Props {
  slide: TransitionSlideType;
}

export function TransitionSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]">
      <Particles
        className="absolute inset-0"
        quantity={40}
        color="#1A7285"
        size={0.6}
        staticity={30}
      />
      <div className="slide-content relative z-10 flex flex-col items-center justify-center px-4 text-center">
        {slide.preText && (
          <BlurFade delay={0.1} duration={0.5}>
            <p className="text-lg sm:text-xl md:text-2xl text-[#6B7280] mb-4 sm:mb-6">
              {slide.preText}
            </p>
          </BlurFade>
        )}

        <BlurFade delay={0.3} duration={0.7}>
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#212121] whitespace-pre-line">
            {slide.headline}
          </h1>
        </BlurFade>

        {slide.subtitle && (
          <BlurFade delay={0.5} duration={0.5}>
            <p className="mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl lg:text-2xl text-[#6B7280] max-w-2xl">
              {slide.subtitle}
            </p>
          </BlurFade>
        )}

        {slide.speakerName && (
          <BlurFade delay={0.8} duration={0.6}>
            <div className="mt-10 sm:mt-12 md:mt-16 rounded-2xl border border-[#1A7285]/20 bg-white px-10 sm:px-12 md:px-16 py-6 sm:py-8 md:py-10 shadow-sm">
              <p className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A7285]">
                {slide.speakerName}
              </p>
              {slide.speakerCompany && (
                <p className="mt-2 text-base sm:text-lg md:text-xl text-[#6B7280]">
                  {slide.speakerCompany}
                </p>
              )}
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
