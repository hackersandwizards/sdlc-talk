import { Presentation } from '@/types/slide';

export const sdlc: Presentation = {
  name: 'sdlc',
  slides: [
    // ============================================
    // SECTION 0: INTRODUCTION (2 slides)
    // ============================================

    // Slide 1: Title
    {
      type: 'title',
      title: 'Agentic Software\nDevelopment Lifecycle',
    },

    // Slide 2: Development Loop Overview
    {
      type: 'development-loop',
      headline: 'The A-SDLC Pattern',
      subtitle: 'Outer Loop (SDLC) + Inner Loop (RPIR)',
      phases: [
        { id: 'refinement', title: 'Refinement', output: 'user-story.md', color: '#8b5cf6' },
        { id: 'planning', title: 'Planning', output: 'plan.md', color: '#06b6d4' },
        { id: 'implementation', title: 'Implementation', output: 'Code & PR', color: '#22c55e' },
        { id: 'retrospective', title: 'Retrospective', output: 'CLAUDE.md', color: '#f59e0b' },
      ],
      showRpir: true,
    },

    // ============================================
    // SECTION 1: REFINEMENT (6 slides) - Violet
    // ============================================

    // Slide 3: Refinement Overview
    {
      type: 'development-loop',
      headline: 'Phase 1: Refinement',
      subtitle: 'Create specifications from stakeholder input',
      phases: [
        { id: 'refinement', title: 'Refinement', output: 'user-story.md', color: '#8b5cf6' },
        { id: 'planning', title: 'Planning', output: 'plan.md', color: '#06b6d4' },
        { id: 'implementation', title: 'Implementation', output: 'Code & PR', color: '#22c55e' },
        { id: 'retrospective', title: 'Retrospective', output: 'CLAUDE.md', color: '#f59e0b' },
      ],
      highlightPhase: 'refinement',
      showRpir: true,
    },

    // Slide 4: Kick-off Meeting (Research)
    {
      type: 'process-step',
      headline: 'Kick-off Meeting',
      sectionColor: 'violet',
      step: {
        title: 'Start with Stakeholder Input',
        description: 'The Refinement Agent transforms unstructured conversations into structured specifications. Transcription is crucial for agent input.',
        input: { label: 'Meeting Transcript', description: 'Stakeholder discussion' },
        output: { label: 'Draft Stories', description: 'Epics/Stories/Tasks' },
        agent: { name: 'Refinement Agent', action: 'Creates structured specs from unstructured conversations' },
      },
      rpirHighlight: 'research',
      humanInLoop: true,
      keyPoints: [
        'The PRD is the master prompt, not a reference document',
        'Transcribe everything - agents need text input',
      ],
    },

    // Slide 5: Meetings Loop (Plan)
    {
      type: 'process-step',
      headline: 'Meetings Loop',
      sectionColor: 'violet',
      step: {
        title: 'Iterate Until Ready',
        description: 'Loop with customers and technical teams until stories reach Ready status. Each iteration refines the specification further.',
        input: { label: 'Draft Stories + Feedback', description: 'From techies & stakeholders' },
        output: { label: 'Refined Stories', description: 'Approaching Ready status' },
        agent: { name: 'Refinement Agent', action: 'Iterates until Ready status' },
      },
      rpirHighlight: 'plan',
      humanInLoop: true,
      keyPoints: [
        'Ambiguity sends agents down expensive, incorrect paths',
        'Multiple transcribed sessions refine the spec',
      ],
    },

    // Slide 6: Refinement Meeting (Implement)
    {
      type: 'process-step',
      headline: 'Refinement Meeting',
      sectionColor: 'violet',
      step: {
        title: 'Finalize Ready Status',
        description: 'The final review ensures all artifacts are complete: JTBD, Proto-Personas, User Story Maps, and the PRD as master prompt.',
        input: { label: 'Nearly-Ready Draft', description: 'Final review' },
        output: { label: 'Ready Stories', description: 'Complete specification' },
        agent: { name: 'Refinement Agent', action: 'Finalizes Ready status' },
      },
      rpirHighlight: 'implement',
      humanInLoop: true,
      keyPoints: [
        'JTBD provides the highest-level objective',
        'Proto-Personas provide the "As a..." component',
        'User Story Maps create 2D backlog (horizontal = journey, vertical = priority)',
      ],
    },

    // Slide 7: Story Review (Reflect) - NEW
    {
      type: 'process-step',
      headline: 'Story Review',
      sectionColor: 'violet',
      step: {
        title: 'Human Reviews & Reflects',
        description: 'Human reviews the generated user-story.md for completeness, accuracy, and alignment with business goals.',
        input: { label: 'user-story.md', description: 'Generated specification' },
        output: { label: 'Approved Stories', description: 'Ready for planning' },
        agent: { name: 'Human Reviewer', action: 'Reviews and approves stories' },
      },
      rpirHighlight: 'reflect',
      humanInLoop: true,
      keyPoints: [
        'Verify business intent captured correctly',
        'Check for missing edge cases',
        'Ensure testable acceptance criteria',
      ],
    },

    // Slide 8: Refinement Review
    {
      type: 'review',
      headline: 'Review: Refinement Complete',
      sectionColor: 'violet',
      sectionName: 'Refinement',
      recap: [
        'Captured stakeholder requirements through transcribed meetings',
        'Created structured stories from unstructured conversations',
        'Iterated until all stories reached Ready status',
        'Human reviewed and approved user-story.md',
      ],
      artifacts: ['user-story.md', 'JTBD', 'Proto-Personas', 'User Story Map', 'PRD'],
      learnings: ['Captured in skill, subagent, or CLAUDE.md'],
      nextSection: { name: 'Planning', preview: 'Create implementation plan with detailed subtasks' },
    },

    // ============================================
    // SECTION 2: PLANNING (6 slides) - Teal
    // ============================================

    // Slide 9: Planning Overview
    {
      type: 'development-loop',
      headline: 'Phase 2: Planning',
      subtitle: 'Architecture as Navigation',
      phases: [
        { id: 'refinement', title: 'Refinement', output: 'user-story.md', color: '#8b5cf6' },
        { id: 'planning', title: 'Planning', output: 'plan.md', color: '#06b6d4' },
        { id: 'implementation', title: 'Implementation', output: 'Code & PR', color: '#22c55e' },
        { id: 'retrospective', title: 'Retrospective', output: 'CLAUDE.md', color: '#f59e0b' },
      ],
      highlightPhase: 'planning',
      showRpir: true,
    },

    // Slide 10: Agent Research (Research)
    {
      type: 'process-step',
      headline: 'Agent Research',
      sectionColor: 'teal',
      step: {
        title: 'Agents Prepare Technical Context',
        description: 'Agents independently research architecture docs, C4 model, ADRs, and codebase to prepare input for the planning meeting.',
        input: { label: 'Ready Stories', description: 'From user-story.md' },
        output: { label: 'Technical Context', description: 'Research findings' },
        agent: { name: 'Research Agent', action: 'Gathers technical context autonomously' },
      },
      rpirHighlight: 'research',
      keyPoints: [
        'Agents work alone before meeting',
        'C4 Model provides architecture zoom levels',
        'ADRs explain why decisions were made',
      ],
    },

    // Slide 11: Subtask Creation (Plan)
    {
      type: 'process-step',
      headline: 'Subtask Creation',
      sectionColor: 'teal',
      step: {
        title: 'Break Down into Fine-Grained Tasks',
        description: 'Planning Agent creates detailed subtasks from technical context. Each subtask contains implementation approach and estimation.',
        input: { label: 'Technical Context', description: 'From research' },
        output: { label: 'Subtasks', description: 'In plan.md' },
        agent: { name: 'Planning Agent', action: 'Creates fine-grained subtasks with estimations' },
      },
      rpirHighlight: 'plan',
      keyPoints: [
        'Each subtask has clear implementation steps',
        'Estimation attached to each subtask',
        'Ubiquitous Language throughout',
      ],
    },

    // Slide 12: Planning Meeting (Implement)
    {
      type: 'process-step',
      headline: 'Planning Meeting',
      sectionColor: 'teal',
      step: {
        title: 'Team Reviews & Refines Plan',
        description: 'Technical team reviews the agent-prepared plan, adds domain expertise, and finalizes plan.md.',
        input: { label: 'Draft Plan', description: 'Agent-prepared approach' },
        output: { label: 'plan.md', description: 'Finalized plan' },
        agent: { name: 'Planning Agent', action: 'Facilitates and captures decisions' },
      },
      rpirHighlight: 'implement',
      humanInLoop: true,
      keyPoints: [
        'Team adds domain expertise',
        'Validate technical feasibility',
        'Finalize subtask breakdown',
      ],
    },

    // Slide 13: Plan Review (Reflect) - NEW
    {
      type: 'process-step',
      headline: 'Plan Review',
      sectionColor: 'teal',
      step: {
        title: 'Human Reviews & Approves Plan',
        description: 'Human reviews plan.md for completeness, validates architecture decisions, and approves for implementation.',
        input: { label: 'plan.md', description: 'Finalized plan' },
        output: { label: 'Approved Plan', description: 'Ready for implementation' },
        agent: { name: 'Human Reviewer', action: 'Reviews and approves plan' },
      },
      rpirHighlight: 'reflect',
      humanInLoop: true,
      keyPoints: [
        'Verify architecture alignment',
        'Check subtask granularity',
        'Approve estimation',
      ],
    },

    // Slide 14: Planning Review
    {
      type: 'review',
      headline: 'Review: Planning Complete',
      sectionColor: 'teal',
      sectionName: 'Planning',
      recap: [
        'Agents researched technical context autonomously',
        'Created implementation approach with subtasks',
        'Team refined plan in planning meeting',
        'Human reviewed and approved plan.md',
      ],
      artifacts: ['plan.md', 'Subtasks', 'Estimations'],
      learnings: ['Captured in skill, subagent, or CLAUDE.md'],
      nextSection: { name: 'Implementation', preview: 'Write tests, code, and create PRs' },
    },

    // ============================================
    // SECTION 3: IMPLEMENTATION (6 slides) - Green
    // ============================================

    // Slide 15: Implementation Overview
    {
      type: 'development-loop',
      headline: 'Phase 3: Implementation',
      subtitle: 'Each activity runs full RPIR inner loop',
      phases: [
        { id: 'refinement', title: 'Refinement', output: 'user-story.md', color: '#8b5cf6' },
        { id: 'planning', title: 'Planning', output: 'plan.md', color: '#06b6d4' },
        { id: 'implementation', title: 'Implementation', output: 'Code & PR', color: '#22c55e' },
        { id: 'retrospective', title: 'Retrospective', output: 'CLAUDE.md', color: '#f59e0b' },
      ],
      highlightPhase: 'implementation',
      showRpir: true,
    },

    // Slide 16: Implementation (Tests) - All RPIR Active
    {
      type: 'process-step',
      headline: 'Implementation: Tests',
      sectionColor: 'green',
      step: {
        title: 'TDD: Write Failing Tests First',
        description: 'The Coding Agent runs a tight RPIR loop: researches test patterns, plans test structure, implements failing tests, reflects on coverage.',
        input: { label: 'Subtask + Plan', description: 'Implementation approach' },
        output: { label: 'Failing Tests', description: 'Test specifications' },
        agent: { name: 'Coding Agent', action: 'Runs full RPIR loop for tests' },
      },
      rpirAllActive: true,
      keyPoints: [
        'Research: Find existing test patterns',
        'Plan: Design test structure',
        'Implement: Write failing tests',
        'Reflect: Review coverage gaps',
      ],
    },

    // Slide 17: Implementation (Code) - All RPIR Active
    {
      type: 'process-step',
      headline: 'Implementation: Code',
      sectionColor: 'green',
      step: {
        title: 'Write Code to Pass Tests',
        description: 'A new agent session writes code: researches implementation patterns, plans approach, implements solution, reflects on quality.',
        input: { label: 'Failing Tests', description: 'Test specifications' },
        output: { label: 'Passing Code', description: 'Implementation' },
        agent: { name: 'Coding Agent (new session)', action: 'Runs full RPIR loop for code' },
      },
      rpirAllActive: true,
      keyPoints: [
        'Research: Study test expectations',
        'Plan: Design implementation',
        'Implement: Write passing code',
        'Reflect: Check code quality',
      ],
    },

    // Slide 18: Pull Request (Tight) - All RPIR Active
    {
      type: 'process-step',
      headline: 'Pull Request (Tight)',
      sectionColor: 'green',
      step: {
        title: 'Create PR with Changes',
        description: 'The Coding Agent prepares PR: researches commit history, plans PR structure, creates PR, reflects on completeness.',
        input: { label: 'Passing Code', description: 'Tests + Implementation' },
        output: { label: 'Pull Request', description: 'Ready for review' },
        agent: { name: 'Coding Agent', action: 'Runs full RPIR loop for PR' },
      },
      rpirAllActive: true,
      humanInLoop: true,
      keyPoints: [
        'Human reviews before merge',
        'Gate-keeping quality control',
        'Best for critical/regulated code',
      ],
    },

    // Slide 19: Trunk-Based (Loose) - All RPIR Active
    {
      type: 'process-step',
      headline: 'Trunk-Based (Loose)',
      sectionColor: 'green',
      step: {
        title: 'Commit Directly to Main',
        description: 'Code commits directly to trunk. Boyscout Agent runs independently to cleanup and refactor. Automatic iterative improvement.',
        input: { label: 'Passing Code', description: 'Tests + Implementation' },
        output: { label: 'Merged Code', description: 'On main branch' },
        agent: { name: 'Boyscout Agent', action: 'Automatic cleanup & refactoring' },
      },
      rpirAllActive: true,
      keyPoints: [
        'No PR gate - faster iteration',
        'Automatic boyscout cleanup runs independently',
        'Best for rapid iteration & trusted teams',
      ],
    },

    // Slide 20: Code Review - All RPIR Active
    {
      type: 'process-step',
      headline: 'Code Review',
      sectionColor: 'green',
      step: {
        title: 'Agent Explains, Human Evaluates',
        description: 'Code-Review Agent guides reviewer: researches changes, plans walkthrough, implements comments, reflects on coverage.',
        input: { label: 'PR + Stories + Code', description: 'Full context' },
        output: { label: 'Review Comments', description: 'In GitHub' },
        agent: { name: 'Code-Review Agent', action: 'Runs full RPIR loop for review' },
      },
      rpirAllActive: true,
      humanInLoop: true,
      keyPoints: [
        'Research: Understand all changes',
        'Plan: Structure walkthrough',
        'Implement: Add review comments',
        'Reflect: Human evaluates',
      ],
    },

    // Slide 21: Implementation Review
    {
      type: 'review',
      headline: 'Review: Implementation Complete',
      sectionColor: 'green',
      sectionName: 'Implementation',
      recap: [
        'Wrote failing tests first (TDD approach)',
        'Implemented code in separate session (context isolation)',
        'Created PR with automated formatting and linting',
        'Code-Review Agent guided human reviewer through changes',
      ],
      artifacts: ['Tests', 'Code', 'Pull Request', 'Review Comments'],
      learnings: [
        'Each activity runs full RPIR loop',
        'Context isolation improves quality',
      ],
      nextSection: { name: 'Retrospective', preview: 'Capture learnings and improve agent configurations' },
    },

    // ============================================
    // SECTION 4: RETROSPECTIVE (4 slides) - Amber
    // ============================================

    // Slide 22: Retrospective Overview
    {
      type: 'development-loop',
      headline: 'Phase 4: Retrospective',
      subtitle: 'Setting up the next iteration',
      phases: [
        { id: 'refinement', title: 'Refinement', output: 'user-story.md', color: '#8b5cf6' },
        { id: 'planning', title: 'Planning', output: 'plan.md', color: '#06b6d4' },
        { id: 'implementation', title: 'Implementation', output: 'Code & PR', color: '#22c55e' },
        { id: 'retrospective', title: 'Retrospective', output: 'CLAUDE.md', color: '#f59e0b' },
      ],
      highlightPhase: 'retrospective',
      showRpir: true,
    },

    // Slide 23: Sprint Retrospective - All RPIR Active
    {
      type: 'process-step',
      headline: 'Sprint Retrospective',
      sectionColor: 'amber',
      step: {
        title: 'Evaluate & Improve Agent Configs',
        description: 'The Retro Agent runs RPIR: researches all episodes, plans improvements, implements config updates, reflects on effectiveness.',
        input: { label: 'Episodes/Mini-Retros', description: 'From the sprint' },
        output: { label: 'Improved Configs', description: 'CLAUDE.md updates' },
        agent: { name: 'Retro Agent', action: 'Runs full RPIR loop for improvements' },
      },
      rpirAllActive: true,
      keyPoints: [
        'Research: Analyze all episodes',
        'Plan: Identify improvement patterns',
        'Implement: Update configurations',
        'Reflect: Validate improvements work',
      ],
    },

    // Slide 24: Scrum Review - All RPIR Active
    {
      type: 'process-step',
      headline: 'Scrum Review',
      sectionColor: 'amber',
      step: {
        title: 'Communicate to Stakeholders',
        description: 'Scrum-Review Agent runs RPIR: researches deliverables, plans communication, creates updates, reflects on clarity.',
        input: { label: 'Completed Work', description: 'Sprint deliverables' },
        output: { label: 'Stakeholder Comms', description: 'Email/Slack updates' },
        agent: { name: 'Scrum-Review Agent', action: 'Runs full RPIR loop for comms' },
      },
      rpirAllActive: true,
      keyPoints: [
        'Research: Gather all deliverables',
        'Plan: Structure stakeholder message',
        'Implement: Create change logs',
        'Reflect: Verify clarity',
      ],
    },

    // Slide 25: Retrospective Review
    {
      type: 'review',
      headline: 'Review: Retrospective Complete',
      sectionColor: 'amber',
      sectionName: 'Retrospective',
      recap: [
        'Analyzed all episodes from the sprint',
        'Identified improvement patterns',
        'Updated agent configurations in CLAUDE.md',
        'Communicated results to stakeholders',
      ],
      artifacts: ['CLAUDE.md updates', 'Stakeholder Comms', 'Change Logs'],
      learnings: [
        'Shared memory enables swarm-wide learning',
        'Validate: Is the agent doing a better job?',
      ],
      nextSection: { name: 'Closing', preview: 'Complete overview and iterate' },
    },

    // ============================================
    // SECTION 5: CLOSING (2 slides)
    // ============================================

    // Slide 26: Final Overview
    {
      type: 'development-loop',
      headline: 'The Complete A-SDLC',
      subtitle: 'Preparation + Validation increases, Generation decreases',
      phases: [
        { id: 'refinement', title: 'Refinement', output: 'user-story.md', color: '#8b5cf6' },
        { id: 'planning', title: 'Planning', output: 'plan.md', color: '#06b6d4' },
        { id: 'implementation', title: 'Implementation', output: 'Code & PR', color: '#22c55e' },
        { id: 'retrospective', title: 'Retrospective', output: 'CLAUDE.md', color: '#f59e0b' },
      ],
      showRpir: true,
    },

    // Slide 27: Eat Sleep Loop Repeat (Standalone Closing)
    {
      type: 'meme',
      headline: 'Eat Sleep Loop Repeat',
      items: [
        { icon: 'utensils', label: 'Eat', color: 'violet' },
        { icon: 'moon', label: 'Sleep', color: 'teal' },
        { icon: 'repeat', label: 'Loop', color: 'green' },
        { icon: 'play', label: 'Repeat', color: 'amber' },
      ],
    },
  ],
};
