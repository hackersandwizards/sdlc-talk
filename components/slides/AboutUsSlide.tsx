'use client';

import { useState, useEffect } from 'react';
import { AboutUsSlide as AboutUsSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { Linkedin, User } from 'lucide-react';

interface Props {
  slide: AboutUsSlideType;
}

export function AboutUsSlide({ slide }: Props) {
  const [highlightIndex, setHighlightIndex] = useState(-1);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightIndex((prev) => Math.min(slide.profiles.length - 1, prev + 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightIndex((prev) => Math.max(-1, prev - 1));
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slide.profiles.length]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <div className="slide-content relative z-10 flex flex-col">
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A7285]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-16 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 w-full max-w-5xl justify-center">
            {slide.profiles.map((profile, index) => {
              const isHighlighted = index === highlightIndex;

              return (
                <BlurFade key={index} delay={0.2 + index * 0.2} duration={0.5} className="flex">
                  <div className={`flex flex-col items-center text-center w-full sm:w-80 md:w-96 rounded-2xl border p-4 sm:p-6 md:p-8 transition-all duration-300 ${
                    isHighlighted
                      ? 'border-[#1A7285]/40 bg-[#1A7285]/5 shadow-lg shadow-[#1A7285]/10 scale-105'
                      : 'border-gray-200 bg-white shadow-sm'
                  }`}>
                    <div className="mb-4 sm:mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-[#1A7285]/10">
                      {profile.imageSrc ? (
                        <img
                          src={profile.imageSrc}
                          alt={profile.name}
                          className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-10 w-10 sm:h-12 sm:w-12 text-[#1A7285]" />
                      )}
                    </div>

                    <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl font-bold text-[#212121]">
                      {profile.name}
                    </h2>
                    <p className="mt-1 text-base sm:text-lg text-[#1A7285] font-medium">
                      {profile.title}
                    </p>
                    <p className="text-sm sm:text-base text-[#6B7280]">
                      {profile.company}
                    </p>

                    <ul className="mt-4 sm:mt-6 space-y-2 text-left">
                      {profile.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-[#6B7280]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A7285]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {profile.linkedIn && (
                      <a
                        href={profile.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 sm:mt-6 flex items-center gap-2 text-sm text-[#1A7285] hover:text-[#1A7285]/80 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
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
