'use client';

import { useState, useEffect } from 'react';
import { EvolutionSlide as EvolutionSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { ArrowRight } from 'lucide-react';

interface Props {
  slide: EvolutionSlideType;
}

function getInitialState(stageCount: number, hasFooter: boolean, isStatic: boolean, initialIndex: number) {
  if (isStatic) {
    return { revealed: stageCount, active: initialIndex, footer: true };
  }
  if (typeof window === 'undefined') {
    return { revealed: 0, active: -1, footer: false };
  }
  const isBack = sessionStorage.getItem('slide-direction') === 'back';
  if (isBack) {
    sessionStorage.removeItem('slide-direction');
    return { revealed: stageCount, active: stageCount - 1, footer: hasFooter };
  }
  return { revealed: 0, active: -1, footer: false };
}

export function EvolutionSlide({ slide }: Props) {
  const initialIndex = slide.stages.findIndex((s) => s.isHighlighted);
  const isStatic = slide.static;
  const hasFooter = !!slide.footer;
  const init = getInitialState(slide.stages.length, hasFooter, !!isStatic, initialIndex);

  const [activeIndex, setActiveIndex] = useState(init.active);
  const [revealedCount, setRevealedCount] = useState(init.revealed);
  const [footerVisible, setFooterVisible] = useState(init.footer);

  useEffect(() => {
    if (isStatic) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') {
        if (revealedCount < slide.stages.length) {
          event.preventDefault();
          event.stopPropagation();
          setRevealedCount((prev) => {
            const next = Math.min(slide.stages.length, prev + 1);
            setActiveIndex(next - 1);
            return next;
          });
        } else if (hasFooter && !footerVisible) {
          event.preventDefault();
          event.stopPropagation();
          setFooterVisible(true);
        }
        // else: don't stop propagation, let SlideNavigation handle it
      }
    }

    // Capture phase: runs before SlideNavigation's bubble handler
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [slide.stages.length, isStatic, revealedCount, hasFooter, footerVisible]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <div className="slide-content relative z-10 flex flex-col">
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="font-[var(--font-heading)] text-5xl font-bold tracking-tight text-[#1A7285]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        <div className="flex flex-1 items-center justify-center px-12 py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              {slide.stages.map((stage, index) => {
                const isRevealed = isStatic || index < revealedCount;
                const isActive = activeIndex === index;

                return (
                  <div key={index} className={`flex items-center transition-all duration-500 ${
                    !isStatic && !isRevealed ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'
                  }`}>
                    <BlurFade delay={isStatic ? 0.2 + index * 0.2 : 0} duration={isStatic ? 0.5 : 0.3}>
                      <div
                        className={`relative flex h-80 w-72 flex-col rounded-2xl border p-6 transition-all duration-300 ${
                          isActive
                            ? 'border-[#1A7285]/60 bg-[#1A7285]/5 shadow-lg shadow-[#1A7285]/10'
                            : 'border-gray-200 bg-white shadow-sm'
                        }`}
                      >
                        {/* Multiplier badge */}
                        <div
                          className={`absolute -top-5 left-1/2 -translate-x-1/2 rounded-full px-6 py-2 text-xl font-bold transition-all duration-300 ${
                            isActive
                              ? 'bg-gradient-to-r from-[#1A7285] to-[#9333EA] text-white'
                              : isRevealed
                                ? 'bg-gray-100 text-gray-500'
                                : 'bg-gray-100 text-gray-300'
                          }`}
                        >
                          {stage.multiplier}
                        </div>

                        <div className="mt-6 mb-4 flex flex-1 flex-col items-center justify-center text-center">
                          <h2
                            className={`text-xl font-bold leading-tight transition-colors duration-300 ${
                              isActive ? 'text-gray-900' : isRevealed ? 'text-gray-600' : 'text-gray-300'
                            }`}
                          >
                            {stage.title}
                          </h2>
                          <p
                            className={`mt-2 text-lg font-medium transition-colors duration-300 ${
                              isActive ? 'text-[#1A7285]' : isRevealed ? 'text-gray-400' : 'text-gray-200'
                            }`}
                          >
                            {stage.subtitle}
                          </p>
                          <p
                            className={`mt-3 text-base leading-relaxed transition-colors duration-300 ${
                              isActive ? 'text-gray-600' : isRevealed ? 'text-gray-400' : 'text-gray-200'
                            }`}
                          >
                            {stage.description}
                          </p>
                        </div>

                        {/* Market position badge */}
                        {stage.badge && (
                          <div
                            className={`mt-auto pt-4 border-t text-center text-sm font-medium transition-colors duration-300 ${
                              isActive
                                ? 'border-[#1A7285]/20 text-[#1A7285]'
                                : isRevealed
                                  ? 'border-gray-100 text-gray-400'
                                  : 'border-gray-50 text-gray-200'
                            }`}
                          >
                            {stage.badge}
                          </div>
                        )}
                      </div>
                    </BlurFade>

                    {index < slide.stages.length - 1 && (
                      <BlurFade delay={isStatic ? 0.3 + index * 0.2 : 0} duration={isStatic ? 0.5 : 0.3}>
                        <div className="mx-3 flex items-center">
                          <ArrowRight className="h-8 w-8 text-gray-300" />
                        </div>
                      </BlurFade>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer bar */}
            {slide.footer && (
              <div className={`w-full max-w-5xl transition-all duration-500 ${
                footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}>
                <div className="mt-2 rounded-xl border border-[#9333EA]/20 bg-[#9333EA]/5 px-8 py-4 text-center">
                  <p className="text-lg font-medium text-[#9333EA]">
                    {slide.footer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
