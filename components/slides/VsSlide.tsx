'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { VsSlide as VsSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { Check, X } from 'lucide-react';

interface Props {
  slide: VsSlideType;
}

function ClaudeCodeLogo() {
  return (
    <div className="h-20 flex items-center justify-center">
      <Image src="/claudecode2.png" alt="Claude Code" width={80} height={80} />
    </div>
  );
}

function CursorLogo() {
  return (
    <div className="h-20 flex items-center justify-center">
      <Image src="/cursor2.png" alt="Cursor" width={160} height={48} />
    </div>
  );
}

export function VsSlide({ slide }: Props) {
  const [tool1, tool2] = slide.tools;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setActiveIndex(0);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex(1);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const tools = [
    { data: tool1, Logo: ClaudeCodeLogo },
    { data: tool2, Logo: CursorLogo },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-60"
        color="rgba(26, 114, 133, 0.2)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Tools comparison */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl items-stretch">
            {tools.map((tool, index) => (
              <BlurFade key={index} delay={0.2 + index * 0.15} duration={0.5} className="h-full">
                <div
                  className={`relative h-full flex flex-col rounded-xl sm:rounded-2xl border p-4 sm:p-6 md:p-8 transition-all duration-300 ${
                    activeIndex === index
                      ? 'border-[#9333EA]/40 bg-gradient-to-br from-[#9333EA]/5 to-white md:scale-105'
                      : 'border-gray-200 bg-white hover:border-[#9333EA]/30 hover:bg-gray-50'
                  }`}
                >
                  {/* Header section */}
                  <div className="flex flex-col items-center mb-4 sm:mb-5 md:mb-6">
                    <tool.Logo />
                    <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mt-1 sm:mt-2 ${activeIndex === index ? 'text-[#212121]' : 'text-[#6B7280]'}`}>
                      {tool.data.name}
                    </h2>
                  </div>

                  {/* Content section */}
                  <div className="flex-1 flex flex-col">
                    {/* Pros */}
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
                      {tool.data.pros.map((pro, proIndex) => (
                        <div key={proIndex} className={`flex items-start gap-2 sm:gap-3 ${activeIndex === index ? 'text-[#4ADE80]' : 'text-[#9CA3AF]'}`}>
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                          <span className={`text-sm sm:text-base md:text-lg ${activeIndex === index ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                            {pro}
                            {proIndex === 0 && tool.data.highlight && (
                              <span className={`ml-1 sm:ml-2 text-xs sm:text-sm italic ${activeIndex === index ? 'text-[#9333EA]' : 'text-[#9CA3AF]'}`}>
                                ({tool.data.highlight})
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Cons */}
                    <div className="space-y-2 sm:space-y-3">
                      {tool.data.cons.map((con, conIndex) => (
                        <div key={conIndex} className={`flex items-start gap-2 sm:gap-3 ${activeIndex === index ? 'text-[#EF4444]' : 'text-[#9CA3AF]'}`}>
                          <X className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
                          <span className={`text-sm sm:text-base md:text-lg ${activeIndex === index ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
                            {con}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Footnotes */}
        {slide.footnotes && slide.footnotes.length > 0 && (
          <BlurFade delay={0.5} duration={0.5}>
            <div className="pb-4 sm:pb-6 md:pb-8 text-center space-y-0.5 sm:space-y-1 px-4">
              {slide.footnotes.map((footnote, index) => (
                <p key={index} className="text-xs sm:text-sm text-[#9CA3AF]">
                  {footnote}
                </p>
              ))}
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
