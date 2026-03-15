'use client';

import { useRef } from 'react';
import { AgentTheorySlide as AgentTheorySlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { CurvedArrow } from '@/components/ui/curved-arrow';
import { cn } from '@/lib/utils';
import {
  Brain,
  Eye,
  Cog,
  FileCode,
  Terminal,
  Search,
  User,
  MessageSquare,
  Globe,
} from 'lucide-react';

interface Props {
  slide: AgentTheorySlideType;
}

const CircleNode = ({
  className,
  children,
  label,
  sublabel,
  size = 'normal',
}: {
  className?: string;
  children?: React.ReactNode;
  label: string;
  sublabel?: string;
  size?: 'small' | 'normal' | 'large';
}) => {
  // Sizes increased by 30%
  const sizeClasses = {
    small: 'h-[72px] w-[72px]',
    normal: 'h-[84px] w-[84px]',
    large: 'h-[104px] w-[104px]',
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(
          'z-10 flex items-center justify-center rounded-full border-2 bg-white shadow-lg',
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-[#212121]">{label}</p>
        {sublabel && <p className="text-sm text-[#6B7280]">{sublabel}</p>}
      </div>
    </div>
  );
};

export function AgentTheorySlide({ slide }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const observationRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-50"
        color="rgba(147, 51, 234, 0.15)"
        blur={60}
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

        {/* Main diagram */}
        <div
          ref={containerRef}
          className="relative mx-auto flex flex-1 w-full max-w-7xl items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden"
        >
          {/* USER - Entry point (left) */}
          <div className="absolute left-[40px] top-[20%]">
            <BlurFade delay={0.3} duration={0.5}>
              <div ref={userRef}>
                <CircleNode
                  className="border-[#4ADE80]/50 bg-gradient-to-br from-[#4ADE80]/5 to-white"
                  label="User"
                  sublabel="Request"
                >
                  <User className="h-10 w-10 text-[#4ADE80]" />
                </CircleNode>
              </div>
            </BlurFade>
          </div>

          {/* REASON - Analyze & Plan */}
          <div className="absolute left-[200px] top-[20%]">
            <BlurFade delay={0.4} duration={0.5}>
              <div ref={thoughtRef}>
                <CircleNode
                  className="border-[#9333EA]/50 bg-gradient-to-br from-[#9333EA]/5 to-white shadow-xl shadow-[#9333EA]/20"
                  label="Reason"
                  sublabel="Analyze & Plan"
                  size="large"
                >
                  <Brain className="h-12 w-12 text-[#9333EA]" />
                </CircleNode>
              </div>
            </BlurFade>
          </div>

          {/* ACT - Execute Tool */}
          <div className="absolute left-[200px] top-[55%]">
            <BlurFade delay={0.5} duration={0.5}>
              <div ref={actionRef}>
                <CircleNode
                  className="border-[#9333EA]/50 bg-gradient-to-br from-[#9333EA]/5 to-white"
                  label="Act"
                  sublabel="Execute Tool"
                >
                  <Cog className="h-10 w-10 text-[#9333EA]" />
                </CircleNode>
              </div>
            </BlurFade>
          </div>

          {/* TOOLS */}
          <div className="absolute left-[380px] top-[48%]">
            <BlurFade delay={0.6} duration={0.5}>
              <div ref={toolsRef} className="flex flex-col items-center gap-3">
                <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A7285]/20">
                      <FileCode className="h-4 w-4 text-[#1A7285]" />
                    </div>
                    <span className="text-sm text-[#6B7280]">Read / Write</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4ADE80]/20">
                      <Terminal className="h-4 w-4 text-[#4ADE80]" />
                    </div>
                    <span className="text-sm text-[#6B7280]">Bash</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F59E0B]/20">
                      <Search className="h-4 w-4 text-[#F59E0B]" />
                    </div>
                    <span className="text-sm text-[#6B7280]">Search / Glob</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1A7285]/20">
                      <Globe className="h-4 w-4 text-[#1A7285]" />
                    </div>
                    <span className="text-sm text-[#6B7280]">Web Search</span>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* OBSERVE - Process Results */}
          <div className="absolute left-[640px] top-[35%]">
            <BlurFade delay={0.7} duration={0.5}>
              <div ref={observationRef}>
                <CircleNode
                  className="border-[#EF4444]/50 bg-gradient-to-br from-[#EF4444]/5 to-white"
                  label="Observe"
                  sublabel="Process Results"
                >
                  <Eye className="h-10 w-10 text-[#EF4444]" />
                </CircleNode>
              </div>
            </BlurFade>
          </div>

          {/* RESPONSE - Task Complete */}
          <div className="absolute left-[880px] top-[35%]">
            <BlurFade delay={0.8} duration={0.5}>
              <div ref={finalRef}>
                <CircleNode
                  className="border-[#4ADE80]/50 bg-gradient-to-br from-[#4ADE80]/5 to-white"
                  label="Response"
                  sublabel="Task Complete"
                >
                  <MessageSquare className="h-10 w-10 text-[#4ADE80]" />
                </CircleNode>
              </div>
            </BlurFade>
          </div>


          {/* Curved arrows - Sequential animation showing ReAct loop */}
          {/* Sequence: User -> Reason -> Act -> Tools -> Observe -> Reason -> Act -> Tools -> Observe -> Response */}
          {/* Total loop time = 12s, each arrow animation ~1.2s */}

          {/* 1. User -> Reason */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={userRef}
            toRef={thoughtRef}
            duration={12}
            delay={0}
            gradientStartColor="#10b981"
            gradientStopColor="#8b5cf6"
          />

          {/* 2. Reason -> Act (first iteration) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={thoughtRef}
            toRef={actionRef}
            duration={24}
            delay={1}
            gradientStartColor="#8b5cf6"
            gradientStopColor="#f59e0b"
          />

          {/* 3. Act -> Tools (first iteration) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={actionRef}
            toRef={toolsRef}
            duration={24}
            delay={2}
            gradientStartColor="#f59e0b"
            gradientStopColor="#3b82f6"
          />

          {/* 4. Tools -> Observe (first iteration) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={toolsRef}
            toRef={observationRef}
            duration={24}
            delay={3}
            gradientStartColor="#3b82f6"
            gradientStopColor="#f43f5e"
          />

          {/* 5. Observe -> Reason (loop back) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={observationRef}
            toRef={thoughtRef}
            duration={12}
            delay={4}
            gradientStartColor="#f43f5e"
            gradientStopColor="#8b5cf6"
            reverse
          />

          {/* 6. Reason -> Act (second iteration) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={thoughtRef}
            toRef={actionRef}
            duration={24}
            delay={5.5}
            gradientStartColor="#8b5cf6"
            gradientStopColor="#f59e0b"
          />

          {/* 7. Act -> Tools (second iteration) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={actionRef}
            toRef={toolsRef}
            duration={24}
            delay={6.5}
            gradientStartColor="#f59e0b"
            gradientStopColor="#3b82f6"
          />

          {/* 8. Tools -> Observe (second iteration) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={toolsRef}
            toRef={observationRef}
            duration={24}
            delay={7.5}
            gradientStartColor="#3b82f6"
            gradientStopColor="#f43f5e"
          />

          {/* 9. Observe -> Response (exit) */}
          <CurvedArrow
            containerRef={containerRef}
            fromRef={observationRef}
            toRef={finalRef}
            duration={12}
            delay={8.5}
            gradientStartColor="#f43f5e"
            gradientStopColor="#10b981"
          />
        </div>

        {/* Footer */}
        <BlurFade delay={1} duration={0.5}>
          <div className="pb-4 sm:pb-6 text-center px-4">
            <p className="text-sm sm:text-base md:text-lg text-[#6B7280]">
              The ReAct Loop
            </p>
            <p className="text-xs text-[#9CA3AF] mt-1 lg:hidden">Best viewed on larger screens</p>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
