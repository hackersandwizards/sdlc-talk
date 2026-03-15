'use client';

import { HandsOnSlide as HandsOnSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { Users, PackageX } from 'lucide-react';

interface Props {
  slide: HandsOnSlideType;
}

export function HandsOnSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-16 py-8">
          <div className="flex w-full max-w-4xl flex-col gap-6">
          {/* What We're Building */}
          <BlurFade delay={0.3} duration={0.5}>
            <div className="rounded-2xl border border-[#9333EA]/30 bg-gradient-to-br from-[#9333EA]/10 to-white p-8">
              <div className="flex items-center gap-3 text-[#9333EA]">
                <PackageX className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">What We&apos;re Building</h2>
              </div>
              <p className="mt-6 text-xl leading-relaxed text-gray-600">
                {slide.projectDescription}
              </p>
            </div>
          </BlurFade>

          {/* Procedure */}
          <BlurFade delay={0.5} duration={0.5}>
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="flex items-center gap-3 text-[#1A7285]">
                <Users className="h-6 w-6" />
                <h2 className="text-2xl font-semibold">Procedure</h2>
              </div>
              <ul className="mt-6 space-y-4">
                {slide.procedureItems.map((item, index) => {
                  const isLast = index === slide.procedureItems.length - 1;
                  return (
                    <BlurFade key={index} delay={0.6 + index * 0.15} duration={0.4}>
                      <li className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A7285]/20 text-sm font-bold text-[#1A7285]">
                          {index + 1}
                        </span>
                        <div className="flex flex-1 items-center gap-4 pt-1">
                          <span className="text-lg text-gray-600">{item}</span>
                          {isLast && slide.techNote && (
                            <span className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-500">
                              {slide.techNote}
                            </span>
                          )}
                        </div>
                      </li>
                    </BlurFade>
                  );
                })}
              </ul>
            </div>
          </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
}
