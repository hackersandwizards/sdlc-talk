import { Presentation } from '@/types/slide';

const phases = [
  { id: 'refinement', title: 'Refinement', output: 'user-story.md', color: '#8b5cf6' },
  { id: 'planning', title: 'Planning', output: 'plan.md', color: '#06b6d4' },
  { id: 'implementation', title: 'Implementation', output: 'Code & PR', color: '#22c55e' },
  { id: 'retrospective', title: 'Retrospective', output: 'CLAUDE.md', color: '#f59e0b' },
];

export const sdlcPitch: Presentation = {
  name: 'sdlc-pitch',
  slides: [
    // Slide 1: Title
    {
      type: 'title',
      title: 'Agentic Software\nDevelopment Lifecycle',
      subtitle: 'A structured approach to AI-assisted development',
    },

    // Slide 2: The A-SDLC Pattern — the core message
    {
      type: 'development-loop',
      headline: 'The A-SDLC Pattern',
      subtitle: 'Outer Loop (SDLC) + Inner Loop (RPIR)',
      phases,
      showRpir: true,
    },

    // Slide 3: Refinement
    {
      type: 'development-loop',
      headline: 'Phase 1: Refinement',
      subtitle: 'Create specifications from stakeholder input',
      phases,
      highlightPhase: 'refinement',
      showRpir: true,
    },

    // Slide 4: Planning
    {
      type: 'development-loop',
      headline: 'Phase 2: Planning',
      subtitle: 'Architecture as Navigation',
      phases,
      highlightPhase: 'planning',
      showRpir: true,
    },

    // Slide 5: Implementation
    {
      type: 'development-loop',
      headline: 'Phase 3: Implementation',
      subtitle: 'Each activity runs full RPIR inner loop',
      phases,
      highlightPhase: 'implementation',
      showRpir: true,
    },

    // Slide 6: Retrospective
    {
      type: 'development-loop',
      headline: 'Phase 4: Retrospective',
      subtitle: 'Setting up the next iteration',
      phases,
      highlightPhase: 'retrospective',
      showRpir: true,
    },

    // Slide 7: Thank You + Contact
    {
      type: 'regular',
      headline: 'Thank You',
      profile: {
        name: 'Benedikt Stemmildt',
        title: 'Co-Founder & Co-CEO, hackers&wizards',
        imageSrc: '/bene.jpeg',
        linkedIn: 'https://linkedin.com/in/benedikt-stemmildt',
      },
      sections: [],
    },
  ],
};
