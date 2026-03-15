'use client';

import { TitleSlide as TitleSlideType } from '@/types/slide';
import { Particles } from '@/components/ui/particles';
import { SparklesText } from '@/components/ui/sparkles-text';
import { BlurFade } from '@/components/ui/blur-fade';

interface Props {
  slide: TitleSlideType;
}

export function TitleSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#FAFAFA]">
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="#1A7285"
        size={0.6}
        staticity={30}
      />
      <div className="slide-content relative z-10 flex flex-col items-center justify-center">
        <BlurFade delay={0.2} duration={0.8}>
          <SparklesText
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#212121] text-center whitespace-pre-line px-4"
            colors={{ first: '#1A7285', second: '#9333EA' }}
            sparklesCount={12}
          >
            {slide.title}
          </SparklesText>
        </BlurFade>
        {slide.subtitle && (
          <BlurFade delay={0.5} duration={0.6}>
            <p className="mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#6B7280] px-4">
              {slide.subtitle}
            </p>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
