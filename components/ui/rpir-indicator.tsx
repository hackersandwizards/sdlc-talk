'use client';

import { cn } from '@/lib/utils';
import { getRpirColor } from '@/lib/section-theme';
import { Search, Map, Hammer, RefreshCw } from 'lucide-react';

interface RpirIndicatorProps {
  highlight?: 'research' | 'plan' | 'implement' | 'reflect';
  allActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const phases = [
  { id: 'research', label: 'Research', icon: Search },
  { id: 'plan', label: 'Plan', icon: Map },
  { id: 'implement', label: 'Implement', icon: Hammer },
  { id: 'reflect', label: 'Reflect', icon: RefreshCw },
] as const;

export function RpirIndicator({ highlight, allActive, size = 'md', className }: RpirIndicatorProps) {
  const sizeClasses = {
    sm: { container: 'gap-2', icon: 'h-4 w-4', text: 'text-xs', pill: 'px-2 py-1' },
    md: { container: 'gap-3', icon: 'h-5 w-5', text: 'text-sm', pill: 'px-3 py-1.5' },
    lg: { container: 'gap-4', icon: 'h-6 w-6', text: 'text-base', pill: 'px-4 py-2' },
  };

  const s = sizeClasses[size];

  return (
    <div className={cn('flex items-center', s.container, className)}>
      {phases.map((phase, index) => {
        const isHighlighted = allActive || highlight === phase.id;
        const Icon = phase.icon;
        const color = getRpirColor(phase.id);

        return (
          <div key={phase.id} className="flex items-center">
            <div
              className={cn(
                'flex items-center gap-1.5 rounded-full transition-all duration-300',
                s.pill,
                !isHighlighted && 'bg-slate-800/50 text-slate-500'
              )}
              style={isHighlighted ? {
                backgroundColor: `${color}20`,
                color: color,
                boxShadow: `0 0 0 2px ${color}40`,
              } : undefined}
            >
              <Icon className={s.icon} />
              <span className={cn('font-medium', s.text)}>{phase.label}</span>
            </div>
            {index < phases.length - 1 && (
              <div className="mx-1 text-slate-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface RpirBadgeProps {
  phase: 'research' | 'plan' | 'implement' | 'reflect';
  className?: string;
}

export function RpirBadge({ phase, className }: RpirBadgeProps) {
  const phaseData = phases.find(p => p.id === phase);
  if (!phaseData) return null;

  const Icon = phaseData.icon;
  const color = getRpirColor(phase);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        className
      )}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      <Icon className="h-4 w-4" />
      <span>{phaseData.label}</span>
    </div>
  );
}
