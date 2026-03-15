'use client';

import { McpSlide as McpSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { Plug, Check } from 'lucide-react';

interface Props {
  slide: McpSlideType;
}

export function McpSlide({ slide }: Props) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-60"
        color="rgba(147, 51, 234, 0.15)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        {/* Header */}
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 overflow-y-auto">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full max-w-5xl">
            {/* Definition Box */}
            <BlurFade delay={0.2} duration={0.5}>
              <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-[#9333EA]/40 bg-gradient-to-br from-[#9333EA]/5 to-white">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-[#9333EA] to-[#9333EA]">
                  <Plug className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                </div>
                <div>
                  <p className="text-sm sm:text-base md:text-lg font-mono text-[#9333EA]">MCP = Model Context Protocol</p>
                  <p className="text-xs sm:text-sm md:text-base text-[#6B7280] mt-0.5 sm:mt-1">{slide.definition}</p>
                </div>
              </div>
            </BlurFade>

            {/* MCP Table - Responsive */}
            <BlurFade delay={0.3} duration={0.5}>
              <div className="rounded-lg sm:rounded-xl border border-gray-200 overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider">MCP / Tool</th>
                      <th className="text-left px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Description</th>
                      <th className="text-left px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider hidden sm:table-cell">Enables</th>
                      <th className="text-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Built-in</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slide.items.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 font-mono text-xs sm:text-sm md:text-base text-[#9333EA]">{item.name}</td>
                        <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base text-[#6B7280]">{item.description}</td>
                        <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base text-[#6B7280] hidden sm:table-cell">{item.enables}</td>
                        <td className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-center">
                          {item.builtIn && (
                            <Check className="h-4 w-4 sm:h-5 sm:w-5 text-[#4ADE80] mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* Footer */}
        {slide.footer && (
          <BlurFade delay={0.5} duration={0.5}>
            <div className="pb-4 sm:pb-6 md:pb-8 text-center px-4">
              <p className="text-xs sm:text-sm text-[#9CA3AF]">{slide.footer}</p>
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
