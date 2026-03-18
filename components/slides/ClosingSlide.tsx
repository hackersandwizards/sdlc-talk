'use client';

import { ClosingSlide as ClosingSlideType } from '@/types/slide';
import { Particles } from '@/components/ui/particles';
import { BlurFade } from '@/components/ui/blur-fade';

interface Props {
  slide: ClosingSlideType;
}

export function ClosingSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAFAFA] via-[#F0F4F5] to-[#1A7285]/10">
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="#1A7285"
        size={0.6}
        staticity={30}
      />
      <div className="slide-content relative z-10 flex flex-col items-center justify-center px-4 text-center space-y-8 md:space-y-10">
        <BlurFade delay={0.2} duration={0.7}>
          <p className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#6B7280]">
            {slide.line1}
          </p>
        </BlurFade>

        <BlurFade delay={0.6} duration={0.7}>
          <img
            src="/hw-type-logo-long.png"
            alt="hackers&wizards"
            className="h-24 md:h-32 w-auto"
          />
        </BlurFade>

        {slide.speakers && slide.speakers.length > 0 && (
          <BlurFade delay={0.9} duration={0.5}>
            <div className="flex flex-col items-center gap-1">
              {slide.speakers.map((speaker, index) => (
                <div key={index} className="text-center">
                  <p className="font-[var(--font-heading)] text-lg md:text-xl font-bold text-[#212121]">
                    {speaker.name}
                  </p>
                  {speaker.contact && (
                    <p className="text-sm sm:text-base text-[#1A7285]">
                      {speaker.contact}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </BlurFade>
        )}

        {slide.closingQuote && (
          <BlurFade delay={1.2} duration={0.6}>
            <blockquote className="text-lg sm:text-xl md:text-2xl text-[#9333EA] italic max-w-2xl">
              &ldquo;{slide.closingQuote}&rdquo;
            </blockquote>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
