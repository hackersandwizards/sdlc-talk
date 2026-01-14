export type SectionTheme = 'violet' | 'teal' | 'green' | 'amber';

export interface SectionColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  text: string;
  textMuted: string;
  border: string;
  bg: string;
  bgGradient: string;
  accent: string;
}

export function getSectionColors(theme: SectionTheme): SectionColors {
  switch (theme) {
    case 'violet':
      return {
        primary: 'text-violet-500',
        primaryLight: 'text-violet-400',
        primaryDark: 'text-violet-600',
        text: 'text-violet-100',
        textMuted: 'text-violet-300/70',
        border: 'border-violet-500/30',
        bg: 'bg-violet-500/10',
        bgGradient: 'from-violet-500/20 to-transparent',
        accent: 'bg-violet-500',
      };
    case 'teal':
      return {
        primary: 'text-cyan-500',
        primaryLight: 'text-cyan-400',
        primaryDark: 'text-cyan-600',
        text: 'text-cyan-100',
        textMuted: 'text-cyan-300/70',
        border: 'border-cyan-500/30',
        bg: 'bg-cyan-500/10',
        bgGradient: 'from-cyan-500/20 to-transparent',
        accent: 'bg-cyan-500',
      };
    case 'green':
      return {
        primary: 'text-green-500',
        primaryLight: 'text-green-400',
        primaryDark: 'text-green-600',
        text: 'text-green-100',
        textMuted: 'text-green-300/70',
        border: 'border-green-500/30',
        bg: 'bg-green-500/10',
        bgGradient: 'from-green-500/20 to-transparent',
        accent: 'bg-green-500',
      };
    case 'amber':
      return {
        primary: 'text-amber-500',
        primaryLight: 'text-amber-400',
        primaryDark: 'text-amber-600',
        text: 'text-amber-100',
        textMuted: 'text-amber-300/70',
        border: 'border-amber-500/30',
        bg: 'bg-amber-500/10',
        bgGradient: 'from-amber-500/20 to-transparent',
        accent: 'bg-amber-500',
      };
  }
}

export function getPhaseColor(phase: string): string {
  switch (phase) {
    case 'refinement':
      return '#8b5cf6'; // violet-500
    case 'planning':
      return '#06b6d4'; // cyan-500
    case 'implementation':
      return '#22c55e'; // green-500
    case 'retrospective':
      return '#f59e0b'; // amber-500
    default:
      return '#64748b';
  }
}

export function getRpirColor(phase: string): string {
  switch (phase) {
    case 'research':
      return '#8b5cf6'; // violet-500 (matches Refinement)
    case 'plan':
      return '#06b6d4'; // cyan-500 (matches Planning)
    case 'implement':
      return '#22c55e'; // green-500 (matches Implementation)
    case 'reflect':
      return '#f59e0b'; // amber-500 (matches Retrospective)
    default:
      return '#64748b';
  }
}
