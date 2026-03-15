'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { QuestionSlide as QuestionSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { NumberTicker } from '@/components/ui/number-ticker';

interface Props {
  slide: QuestionSlideType;
}

function getInitialCounts(storageKey: string, optionCount: number): number[] {
  if (typeof window === 'undefined') {
    return Array(optionCount).fill(0);
  }
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === optionCount) {
        return parsed;
      }
    } catch {
      // Ignore parse errors
    }
  }
  return Array(optionCount).fill(0);
}

function usePersistedCounts(storageKey: string, optionCount: number) {
  const [counts, setCounts] = useState<number[]>(() =>
    getInitialCounts(storageKey, optionCount)
  );
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(storageKey, JSON.stringify(counts));
  }, [counts, storageKey]);

  const increment = useCallback((index: number) => {
    setCounts((prev) => {
      const next = [...prev];
      next[index] = prev[index] + 1;
      return next;
    });
  }, []);

  const decrement = useCallback((index: number) => {
    setCounts((prev) => {
      const next = [...prev];
      next[index] = Math.max(0, prev[index] - 1);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setCounts(Array(optionCount).fill(0));
  }, [optionCount]);

  return { counts, increment, decrement, reset };
}

export function QuestionSlide({ slide }: Props) {
  const [cursorIndex, setCursorIndex] = useState<number | null>(null);
  const { counts, increment, decrement, reset } = usePersistedCounts(
    slide.storageKey,
    slide.options.length
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setCursorIndex((prev) => {
          if (prev === null) return slide.options.length - 1;
          return Math.max(0, prev - 1);
        });
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setCursorIndex((prev) => {
          if (prev === null) return 0;
          return Math.min(slide.options.length - 1, prev + 1);
        });
      } else if (event.key === ' ' && cursorIndex !== null) {
        event.preventDefault();
        increment(cursorIndex);
      } else if (event.key === 'Backspace' && cursorIndex !== null) {
        event.preventDefault();
        decrement(cursorIndex);
      } else if (event.key === 'q') {
        event.preventDefault();
        reset();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide.options.length, cursorIndex, increment, decrement, reset]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8FAFB] text-gray-900">
      <StaticLightRays
        className="opacity-70"
        color="rgba(26, 114, 133, 0.2)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header with headline */}
        <div className="pt-12 text-center">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-6xl font-bold tracking-tight text-gray-900">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Options */}
        <div className="flex flex-1 items-center justify-center px-20 py-8">
          <div className="flex w-full max-w-4xl flex-col gap-6">
            {slide.options.map((option, index) => {
              const isHighlighted = cursorIndex === index;
              const count = counts[index];

              return (
                <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.5}>
                  <div
                    onClick={() => increment(index)}
                    className={`flex cursor-pointer items-center gap-8 rounded-2xl border p-8 backdrop-blur-sm transition-all hover:border-[#1A7285]/30 ${
                      isHighlighted
                        ? 'border-[#1A7285]/50 bg-[#1A7285]/10'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {/* Letter badge */}
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl font-bold ${
                        isHighlighted
                          ? 'bg-[#1A7285]/30 text-[#1A7285]'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {option.label}
                    </div>

                    {/* Option text */}
                    <div className="flex-1">
                      <p
                        className={`text-2xl font-medium ${
                          isHighlighted ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {option.text}
                      </p>
                    </div>

                    {/* Count display */}
                    {count > 0 && (
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-14 min-w-14 items-center justify-center rounded-full px-4 text-2xl font-bold ${
                            isHighlighted
                              ? 'bg-gradient-to-r from-[#1A7285] to-[#1A7285]/80 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          <NumberTicker
                            value={count}
                            className={
                              isHighlighted ? 'text-white' : 'text-gray-600'
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
