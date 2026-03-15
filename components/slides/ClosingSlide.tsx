'use client';

import { ClosingSlide as ClosingSlideType } from '@/types/slide';
import { Particles } from '@/components/ui/particles';
import { BlurFade } from '@/components/ui/blur-fade';

interface Props {
  slide: ClosingSlideType;
}

export function ClosingSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]">
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="#1A7285"
        size={0.6}
        staticity={30}
      />
      <div className="slide-content relative z-10 flex flex-col items-center justify-center px-4 text-center space-y-6 sm:space-y-8 md:space-y-10">
        <BlurFade delay={0.2} duration={0.7}>
          <p className="font-[var(--font-heading)] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#6B7280]">
            {slide.line1}
          </p>
        </BlurFade>

        <BlurFade delay={0.6} duration={0.7}>
          <p className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1A7285]">
            {slide.line2}
          </p>
        </BlurFade>

        {slide.speakers && slide.speakers.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 mt-4 sm:mt-6">
            {slide.speakers.map((speaker, index) => (
              <BlurFade key={index} delay={0.9 + index * 0.15} duration={0.5}>
                <div className="text-center">
                  <p className="font-[var(--font-heading)] text-lg sm:text-xl md:text-2xl font-bold text-[#212121]">
                    {speaker.name}
                  </p>
                  {speaker.contact && (
                    <p className="mt-1 text-sm sm:text-base text-[#1A7285]">
                      {speaker.contact}
                    </p>
                  )}
                  <p className="mt-1 text-sm sm:text-base text-[#6B7280]">
                    {speaker.company}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        )}

        {slide.website && (
          <BlurFade delay={1.2} duration={0.5}>
            <p className="text-base sm:text-lg md:text-xl text-[#1A7285] font-medium">
              {slide.website}
            </p>
          </BlurFade>
        )}

        {slide.closingQuote && (
          <BlurFade delay={1.4} duration={0.6}>
            <blockquote className="text-lg sm:text-xl md:text-2xl text-[#9333EA] italic max-w-2xl">
              &ldquo;{slide.closingQuote}&rdquo;
            </blockquote>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
