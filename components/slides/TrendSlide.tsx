'use client';

import { TrendSlide as TrendSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import Image from 'next/image';

interface Props {
  slide: TrendSlideType;
}

export function TrendSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-50"
        color="rgba(26, 114, 133, 0.12)"
        blur={60}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
          <BlurFade delay={0.2} duration={0.5}>
            <p className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-[#6B7280]">
              {slide.subtitle}
            </p>
          </BlurFade>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-8 sm:px-12 md:px-16 lg:px-24 py-4 sm:py-6 md:py-8 w-full">
          <BlurFade delay={0.4} duration={0.6}>
            <div className="relative" style={{ width: 'min(900px, 80vw)' }}>
              <div className="relative rounded-xl sm:rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xl">
                <Image
                  src={slide.imageSrc}
                  alt="Trend chart"
                  width={1400}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
              {slide.annotation && (
                <p className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-xs sm:text-sm text-[#6B7280] bg-gray-100 px-3 py-1.5 rounded-lg">
                  {slide.annotation}
                </p>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
