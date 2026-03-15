'use client';

import { ScreenshotSlide as ScreenshotSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import Image from 'next/image';

interface Props {
  slide: ScreenshotSlideType;
}

export function ScreenshotSlide({ slide }: Props) {
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
        <div className="pt-4 sm:pt-6 md:pt-8 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6">
          <div className="w-full max-w-4xl">
            <BlurFade delay={0.3} duration={0.6}>
              <div className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xl">
                <Image
                  src={slide.imageSrc}
                  alt={slide.author}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </BlurFade>

            {/* Author info */}
            <BlurFade delay={0.5} duration={0.5}>
              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#212121]">
                  {slide.author}
                </p>
                <p className="mt-1 text-sm sm:text-base md:text-lg text-[#6B7280]">
                  {slide.authorDescription}
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
}
