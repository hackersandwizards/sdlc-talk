'use client';

import { DevelopmentLoopSlide as DevelopmentLoopSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { cn } from '@/lib/utils';
import { getPhaseColor, getRpirColor } from '@/lib/section-theme';
import { motion } from 'motion/react';
import { FileText, ListChecks, Code, RefreshCw, Search, Map, Hammer } from 'lucide-react';

interface Props {
  slide: DevelopmentLoopSlideType;
}

const phaseIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  refinement: FileText,
  planning: ListChecks,
  implementation: Code,
  retrospective: RefreshCw,
};

const rpirPhases = [
  { id: 'research', label: 'Research', icon: Search },
  { id: 'plan', label: 'Plan', icon: Map },
  { id: 'implement', label: 'Implement', icon: Hammer },
  { id: 'reflect', label: 'Reflect', icon: RefreshCw },
];

export function DevelopmentLoopSlide({ slide }: Props) {
  const centerX = 400;
  const centerY = 280;
  const outerRadius = 220;
  const innerRadius = 80;
  const arcGap = 8;

  // Calculate arc paths for each phase
  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = {
      x: centerX + radius * Math.cos((startAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((startAngle * Math.PI) / 180),
    };
    const end = {
      x: centerX + radius * Math.cos((endAngle * Math.PI) / 180),
      y: centerY + radius * Math.sin((endAngle * Math.PI) / 180),
    };
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  // Phase positions (in degrees, starting from top and going clockwise)
  const phaseAngles = [
    { start: -80, end: 10 },     // Refinement (top-right quadrant)
    { start: 10, end: 100 },    // Planning (right-bottom quadrant)
    { start: 100, end: 190 },   // Implementation (bottom-left quadrant)
    { start: 190, end: 280 },   // Retrospective (left-top quadrant)
  ];

  // Label positions (middle of each arc)
  const getLabelPosition = (startAngle: number, endAngle: number, radius: number) => {
    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
    return {
      x: centerX + (radius + 60) * Math.cos(midAngle),
      y: centerY + (radius + 60) * Math.sin(midAngle),
    };
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <StaticLightRays
        className="opacity-50"
        color="rgba(59, 130, 246, 0.15)"
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
            {slide.subtitle && (
              <p className="mt-4 text-xl text-slate-400">{slide.subtitle}</p>
            )}
          </BlurFade>
        </div>

        {/* Main Loop Diagram */}
        <div className="flex flex-1 items-center justify-center px-8">
          <BlurFade delay={0.2} duration={0.6}>
            <div className="relative" style={{ width: 800, height: 560 }}>
              <svg viewBox="0 0 800 560" className="w-full h-full">
                {/* Outer arcs for each phase */}
                {slide.phases.map((phase, index) => {
                  const angles = phaseAngles[index];
                  const isHighlighted = slide.highlightPhase === phase.id;
                  const color = getPhaseColor(phase.id);

                  return (
                    <g key={phase.id}>
                      {/* Background arc */}
                      <motion.path
                        d={createArc(angles.start + arcGap / 2, angles.end - arcGap / 2, outerRadius)}
                        stroke={color}
                        strokeWidth={isHighlighted ? 24 : 16}
                        strokeLinecap="round"
                        fill="none"
                        opacity={isHighlighted ? 1 : 0.3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
                      />

                      {/* Glow effect for highlighted phase */}
                      {isHighlighted && (
                        <motion.path
                          d={createArc(angles.start + arcGap / 2, angles.end - arcGap / 2, outerRadius)}
                          stroke={color}
                          strokeWidth={32}
                          strokeLinecap="round"
                          fill="none"
                          opacity={0.3}
                          filter="url(#glow)"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Inner RPIR circle */}
                {slide.showRpir && (
                  <g>
                    <motion.circle
                      cx={centerX}
                      cy={centerY}
                      r={innerRadius}
                      stroke="#475569"
                      strokeWidth={2}
                      fill="none"
                      strokeDasharray="4 4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    />
                    <motion.text
                      x={centerX}
                      y={centerY - 30}
                      textAnchor="middle"
                      className="fill-slate-400 text-xs font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      INNER LOOP
                    </motion.text>
                    <motion.text
                      x={centerX}
                      y={centerY - 10}
                      textAnchor="middle"
                      className="fill-slate-300 text-sm font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      RPIR
                    </motion.text>

                    {/* RPIR phase labels */}
                    {rpirPhases.map((rphase, i) => {
                      const angle = (-90 + i * 90) * Math.PI / 180;
                      const x = centerX + (innerRadius - 25) * Math.cos(angle);
                      const y = centerY + (innerRadius - 25) * Math.sin(angle);
                      const color = getRpirColor(rphase.id);

                      return (
                        <motion.g
                          key={rphase.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }}
                        >
                          <circle
                            cx={x}
                            cy={y}
                            r={12}
                            fill={color}
                            opacity={0.2}
                          />
                          <text
                            x={x}
                            y={y + 4}
                            textAnchor="middle"
                            className="fill-current text-[10px] font-bold"
                            style={{ fill: color }}
                          >
                            {rphase.label.charAt(0)}
                          </text>
                        </motion.g>
                      );
                    })}
                  </g>
                )}

                {/* Glow filter */}
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {/* Phase labels positioned around the arc */}
              {slide.phases.map((phase, index) => {
                const angles = phaseAngles[index];
                const pos = getLabelPosition(angles.start, angles.end, outerRadius);
                const isHighlighted = slide.highlightPhase === phase.id;
                const color = getPhaseColor(phase.id);
                const Icon = phaseIcons[phase.id] || FileText;

                // Adjust text anchor based on position
                const midAngle = (angles.start + angles.end) / 2;
                const textAlign = midAngle > 90 && midAngle < 270 ? 'end' : 'start';
                const adjustedX = midAngle > 90 && midAngle < 270 ? pos.x - 20 : pos.x + 20;

                return (
                  <motion.div
                    key={phase.id}
                    className={cn(
                      'absolute flex flex-col gap-1',
                      textAlign === 'end' ? 'items-end text-right' : 'items-start text-left'
                    )}
                    style={{
                      left: adjustedX,
                      top: pos.y,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-lg',
                          isHighlighted ? 'bg-opacity-30' : 'bg-opacity-10'
                        )}
                        style={{ backgroundColor: `${color}30` }}
                      >
                        <span style={{ color }}><Icon className="h-5 w-5" /></span>
                      </div>
                      <div>
                        <p
                          className={cn(
                            'font-bold',
                            isHighlighted ? 'text-lg' : 'text-base text-slate-400'
                          )}
                          style={isHighlighted ? { color } : undefined}
                        >
                          {phase.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {phase.output}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
