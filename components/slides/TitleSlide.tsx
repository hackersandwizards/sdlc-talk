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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F8FAFB] via-[#F0F4F5] to-[#1A7285]/10">
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
            className="font-[var(--font-heading)] text-6xl md:text-7xl font-bold tracking-tight text-gray-900 text-center whitespace-pre-line"
            colors={{ first: '#1A7285', second: '#9333EA' }}
            sparklesCount={12}
          >
            {slide.title}
          </SparklesText>
        </BlurFade>
        {slide.subtitle && (
          <BlurFade delay={0.5} duration={0.6}>
            <p className="mt-8 text-3xl font-light text-gray-500">
              {slide.subtitle}
            </p>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
