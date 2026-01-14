'use client';

import { ProcessStepSlide as ProcessStepSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { RpirIndicator } from '@/components/ui/rpir-indicator';
import { cn } from '@/lib/utils';
import { getSectionColors } from '@/lib/section-theme';
import { ArrowRight, Bot, User, FileInput, FileOutput, Lightbulb } from 'lucide-react';

interface Props {
  slide: ProcessStepSlideType;
}

const lightRayColors: Record<string, string> = {
  violet: 'rgba(139, 92, 246, 0.15)',
  teal: 'rgba(6, 182, 212, 0.15)',
  green: 'rgba(34, 197, 94, 0.15)',
  amber: 'rgba(245, 158, 11, 0.15)',
};

export function ProcessStepSlide({ slide }: Props) {
  const colors = getSectionColors(slide.sectionColor);
  const lightRayColor = lightRayColors[slide.sectionColor];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 text-white">
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
            <h1 className="text-5xl font-bold tracking-tight text-white">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-16 py-8">
          {/* Process Flow */}
          <BlurFade delay={0.2} duration={0.5}>
            <div className="flex items-center gap-6">
              {/* Input Box */}
              {slide.step.input && (
                <>
                  <div className={cn(
                    'flex flex-col items-center gap-3 rounded-xl border p-6 w-64',
                    colors.border,
                    colors.bg
                  )}>
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      colors.bg
                    )}>
                      <FileInput className={cn('h-6 w-6', colors.primary)} />
                    </div>
                    <div className="text-center">
                      <p className={cn('font-bold text-lg', colors.primary)}>
                        {slide.step.input.label}
                      </p>
                      {slide.step.input.description && (
                        <p className="mt-1 text-sm text-slate-400">
                          {slide.step.input.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-8 w-8 text-slate-600" />
                </>
              )}

              {/* Agent Box */}
              {slide.step.agent && (
                <div className={cn(
                  'flex flex-col items-center gap-3 rounded-xl border-2 p-8 w-80',
                  colors.border,
                  'bg-gradient-to-br from-slate-900/80 to-slate-900/40'
                )}>
                  <div className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-full',
                    colors.accent
                  )}>
                    {slide.step.agent?.name.toLowerCase().includes('human') ? (
                      <User className="h-8 w-8 text-white" />
                    ) : (
                      <Bot className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={cn('font-bold text-xl', colors.primary)}>
                      {slide.step.agent.name}
                    </p>
                    <p className="mt-2 text-base text-slate-300">
                      {slide.step.agent.action}
                    </p>
                  </div>
                </div>
              )}

              {/* Output Box */}
              {slide.step.output && (
                <>
                  <ArrowRight className="h-8 w-8 text-slate-600" />
                  <div className={cn(
                    'flex flex-col items-center gap-3 rounded-xl border p-6 w-64',
                    colors.border,
                    colors.bg
                  )}>
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      colors.bg
                    )}>
                      <FileOutput className={cn('h-6 w-6', colors.primary)} />
                    </div>
                    <div className="text-center">
                      <p className={cn('font-bold text-lg', colors.primary)}>
                        {slide.step.output.label}
                      </p>
                      {slide.step.output.description && (
                        <p className="mt-1 text-sm text-slate-400">
                          {slide.step.output.description}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </BlurFade>

          {/* Step Description */}
          <BlurFade delay={0.3} duration={0.5}>
            <div className="max-w-3xl text-center">
              <h2 className="text-2xl font-semibold text-white">
                {slide.step.title}
              </h2>
              <p className="mt-3 text-lg text-slate-400">
                {slide.step.description}
              </p>
            </div>
          </BlurFade>

          {/* RPIR Indicator & Human in Loop */}
          <BlurFade delay={0.4} duration={0.5}>
            <div className="flex items-center gap-6">
              {(slide.rpirHighlight || slide.rpirAllActive) && (
                <RpirIndicator highlight={slide.rpirHighlight} allActive={slide.rpirAllActive} size="md" />
              )}
              {slide.humanInLoop && (
                <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2">
                  <User className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-400">
                    Human in Loop
                  </span>
                </div>
              )}
            </div>
          </BlurFade>

          {/* Key Points */}
          {slide.keyPoints && slide.keyPoints.length > 0 && (
            <BlurFade delay={0.5} duration={0.5}>
              <div className="mt-4 flex flex-wrap justify-center gap-4 max-w-4xl">
                {slide.keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg bg-slate-800/50 px-4 py-3"
                  >
                    <Lightbulb className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </BlurFade>
          )}
        </div>
      </div>
    </div>
  );
}
