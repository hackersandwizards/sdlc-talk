'use client';

import { ReviewSlide as ReviewSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { cn } from '@/lib/utils';
import { getSectionColors } from '@/lib/section-theme';
import { CheckCircle2, FileText, Lightbulb, ArrowRight, Package } from 'lucide-react';

interface Props {
  slide: ReviewSlideType;
}

const lightRayColors: Record<string, string> = {
  violet: 'rgba(147, 51, 234, 0.15)',
  teal: 'rgba(26, 114, 133, 0.15)',
  green: 'rgba(74, 222, 128, 0.15)',
  amber: 'rgba(147, 51, 234, 0.15)',
};

export function ReviewSlide({ slide }: Props) {
  const colors = getSectionColors(slide.sectionColor);
  const lightRayColor = lightRayColors[slide.sectionColor];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <StaticLightRays
        className="opacity-50"
        color={lightRayColor}
        blur={60}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={cn(
                'px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider',
                colors.accent,
                'text-white'
              )}>
                {slide.sectionName} Complete
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center px-16 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
            {/* Recap Section */}
            <BlurFade delay={0.2} duration={0.5}>
              <div className={cn(
                'rounded-2xl border p-8 h-full',
                colors.border,
                'bg-white'
              )}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    colors.bg
                  )}>
                    <CheckCircle2 className={cn('h-5 w-5', colors.primary)} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Accomplished</h2>
                </div>
                <ul className="space-y-3">
                  {slide.recap.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className={cn('h-5 w-5 mt-0.5 flex-shrink-0', colors.primary)} />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* Artifacts */}
              {slide.artifacts && slide.artifacts.length > 0 && (
                <BlurFade delay={0.3} duration={0.5}>
                  <div className={cn(
                    'rounded-2xl border p-6',
                    colors.border,
                    'bg-white'
                  )}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        colors.bg
                      )}>
                        <Package className={cn('h-5 w-5', colors.primary)} />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Artifacts</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {slide.artifacts.map((artifact, index) => (
                        <div
                          key={index}
                          className={cn(
                            'flex items-center gap-2 rounded-lg px-3 py-2',
                            colors.bg
                          )}
                        >
                          <FileText className={cn('h-4 w-4', colors.primary)} />
                          <span className={cn('text-sm font-medium', colors.text)}>
                            {artifact}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              )}

              {/* Learnings */}
              {slide.learnings && slide.learnings.length > 0 && (
                <BlurFade delay={0.4} duration={0.5}>
                  <div className="rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F59E0B]/20">
                        <Lightbulb className="h-5 w-5 text-[#F59E0B]" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">Learnings Captured</h2>
                    </div>
                    <ul className="space-y-2">
                      {slide.learnings.map((learning, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#F59E0B]">&bull;</span>
                          <span className="text-gray-600">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              )}

              {/* Next Section Preview */}
              {slide.nextSection && (
                <BlurFade delay={0.5} duration={0.5}>
                  <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider">
                          Coming Next
                        </p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                          {slide.nextSection.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {slide.nextSection.preview}
                        </p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                        <ArrowRight className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </BlurFade>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
