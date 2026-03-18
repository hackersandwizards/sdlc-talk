export interface TitleSlide {
  type: 'title';
  title: string;
  subtitle?: string;
}

export interface ContentSection {
  title?: string;
  items?: string[];
  text?: string;
  link?: { url: string; label: string };
  icon?: 'presentation' | 'code' | 'question' | 'rocket' | 'lightbulb' | 'target';
}

export interface ProfileInfo {
  name: string;
  title: string;
  imageSrc?: string;
  linkedIn?: string;
}

export interface RegularSlide {
  type: 'regular';
  headline: string;
  sections: ContentSection[];
  profile?: ProfileInfo;
  layout?: 'default' | 'cards';
  activeSection?: number;
}

export interface EvolutionStage {
  multiplier: string;
  title: string;
  subtitle: string;
  description: string;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  badge?: string;
}

export interface EvolutionSlide {
  type: 'evolution';
  headline: string;
  stages: EvolutionStage[];
  static?: boolean;
  footer?: string;
}

export interface QuestionOption {
  label: string;
  text: string;
}

export interface QuestionSlide {
  type: 'question';
  headline: string;
  storageKey: string;
  options: QuestionOption[];
}

export interface AgentTheorySlide {
  type: 'agent-theory';
  headline: string;
}

export interface EasyStartSlide {
  type: 'easy-start';
  headline: string;
}

export interface SpecGapSlide {
  type: 'spec-gap';
  headline: string;
  points: string[];
}

export interface WayToUse {
  title: string;
  badge?: string;
  description?: string;
  prompt?: string;
  pros?: string[];
  cons?: string[];
  highlight?: string;
}

export interface WaysSlide {
  type: 'ways';
  headline: string;
  ways: WayToUse[];
  footer?: string;
}

export interface Pillar {
  title: string;
  description?: string;
  icon?: 'brain' | 'shield' | 'wrench' | 'map' | 'graduation' | 'sparkles' | 'timer' | 'arrow-right-left' | 'users' | 'lightbulb' | 'rocket' | 'factory' | 'zap';
}

export interface PillarsSlide {
  type: 'pillars';
  headline: string;
  pillars: Pillar[];
  focusIndex?: number;
  allActive?: boolean;
}

export interface SddStep {
  title: string;
  description: string;
}

export interface SddSlide {
  type: 'sdd';
  headline: string;
  steps: SddStep[];
  footer?: string;
  footerLink?: { url: string; label: string };
}

export interface QualitySlide {
  type: 'quality';
  headline: string;
  goal: string;
  checks: string[];
}

export interface InteractionCapability {
  icon: 'eye' | 'database' | 'log' | 'script' | 'search' | 'test';
  title: string;
  description: string;
}

export interface InteractionSlide {
  type: 'interaction';
  headline: string;
  problem: string;
  capabilities: InteractionCapability[];
}

export interface McpItem {
  name: string;
  description: string;
  enables: string;
  builtIn?: boolean;
}

export interface McpSlide {
  type: 'mcp';
  headline: string;
  definition: string;
  items: McpItem[];
  footer?: string;
}

export interface CodeExample {
  title: string;
  bad: string;
  good: string;
}

export interface GuidanceSlide {
  type: 'guidance';
  headline: string;
  intro: string;
  points: string[];
  examples: CodeExample[];
}

export interface SubAgent {
  name: string;
  description: string;
}

export interface GuardrailsSlide {
  type: 'guardrails';
  headline: string;
  intro: string;
  points: string[];
  subAgents: SubAgent[];
  bottomStatement?: string;
}

export interface VsTool {
  name: string;
  pros: string[];
  cons: string[];
  highlight?: string;
}

export interface VsSlide {
  type: 'vs';
  headline: string;
  tools: [VsTool, VsTool];
  footnotes?: string[];
}

export interface PrimeDirectiveSlide {
  type: 'prime-directive';
  headline: string;
  directives: string[];
}

export interface MentalModelSlide {
  type: 'mental-model';
  headline: string;
  intro: string;
  warning: string;
  tips: string[];
}

export interface FailureReason {
  percentage: number;
  label: string;
  description?: string;
}

export interface AiFailuresSlide {
  type: 'ai-failures';
  headline: string;
  intro: string;
  reasons: FailureReason[];
  conclusion: string;
  footnote?: string;
}

export interface JobItem {
  task: string;
  percentage?: number;
}

export interface JobsSlide {
  type: 'jobs';
  headline: string;
  before: {
    title: string;
    items: JobItem[];
  };
  after: {
    title: string;
    items: JobItem[];
  };
  footnote?: string;
}

export interface HandsOnSlide {
  type: 'hands-on';
  headline: string;
  projectDescription: string;
  procedureItems: string[];
  techNote?: string;
}

// Pitch-specific slide types
export interface BigStatementSlide {
  type: 'big-statement';
  lines: string[];
  subtitle?: string;
  crossedOut?: string;
  highlighted?: string;
  points?: string[];
  closing?: string;
}

export interface ChatbotMentalModelSlide {
  type: 'chatbot-mental-model';
  headline: string;
  quote: string;
  steps: string[];
  tagline: string;
}

export interface SafetyChecklistSlide {
  type: 'safety-checklist';
  headline: string;
  items: Array<{
    text: string;
    icon: 'briefcase' | 'graph' | 'calendar' | 'document';
  }>;
}

export interface AgentLoopSlide {
  type: 'agent-loop';
  headline: string;
  description: string;
  loopSteps: string[];
  tools: Array<{
    name: string;
    icon: 'file' | 'browser' | 'database' | 'terminal';
  }>;
}

export interface AgentCapabilitiesSlide {
  type: 'agent-capabilities';
  headline: string;
  capabilities: string[];
  footer: string;
}

export interface HumansVsAgentsSlide {
  type: 'humans-vs-agents';
  headline: string;
  automated: string[];
  boosted: string[];
}

export interface MultiplierSlide {
  type: 'multiplier';
  headline: string;
  from: string;
  to: string;
  statement: string;
  subStatement: string;
}

export interface QuotesSlide {
  type: 'quotes';
  headline: string;
  quotes: Array<{
    text: string;
    author: string;
    imageSrc: string;
  }>;
}

export interface TrendSlide {
  type: 'trend';
  headline: string;
  subtitle: string;
  imageSrc: string;
  annotation?: string;
}

export interface SplitQuestionSlide {
  type: 'split-question';
  headline: string;
  leftLabel: string;
  leftBullets?: string[];
  rightLabel: string;
  rightBullets?: string[];
}

export interface WrongReactionSlide {
  type: 'wrong-reaction';
  headline: string;
  items: string[];
  direction: 'fading' | 'growing';
}

export interface PracticeImplicationSlide {
  type: 'practice-implication';
  lines: string[];
}

export interface TransitionSlide {
  type: 'transition';
  preText?: string;
  headline: string;
  subtitle?: string;
  speakerName?: string;
  speakerCompany?: string;
}

export interface ClosingSlide {
  type: 'closing';
  line1: string;
  line2: string;
  speakers?: { name: string; contact?: string; company: string }[];
  website?: string;
  closingQuote?: string;
}

export interface ScreenshotSlide {
  type: 'screenshot';
  headline: string;
  imageSrc: string;
  author: string;
  authorDescription: string;
}

export interface PerformanceGraphSlide {
  type: 'performance-graph';
  headline: string;
  xLabel: string;
  yLabel: string;
  currentMarker: string;
  futureNote: string;
}

export interface AdoptionSegment {
  label: string;
  percentage: string;
}

export interface AdoptionCycleSlide {
  type: 'adoption-cycle';
  headline: string;
  segments: AdoptionSegment[];
  currentSegmentIndex: number;
  bottomLabel?: string;
}

export interface WorkflowStep {
  label: string;
  description?: string;
  icon?: 'document' | 'analysis' | 'review' | 'decision' | 'cloud' | 'shield';
}

export interface WorkflowSlide {
  type: 'workflow';
  headline: string;
  steps: WorkflowStep[];
  outcomes?: string[];
}

export interface PromptingGuideline {
  title: string;
  bad: string;
  good: string;
}

export interface PromptingGuidelinesSlide {
  type: 'prompting-guidelines';
  headline: string;
  guidelines: PromptingGuideline[];
}

export interface ExistingCodebaseStepSlide {
  type: 'existing-codebase-step';
  headline: string;
  stepNumber: number;
  totalSteps: number;
  icon: 'search' | 'book' | 'code' | 'test' | 'play' | 'key' | 'wrench';
  description: string;
  points: string[];
  prompt?: string;
  tip?: string;
}

export interface AboutUsProfile {
  name: string;
  title: string;
  company: string;
  imageSrc?: string;
  linkedIn?: string;
  bullets: string[];
}

export interface AboutUsSlide {
  type: 'about-us';
  headline: string;
  profiles: [AboutUsProfile, AboutUsProfile];
}

export interface ConvergenceCard {
  company: string;
  label: string;
  metric: string;
  quote: string;
}

export interface ConvergenceSlide {
  type: 'convergence';
  headline: string;
  cards: ConvergenceCard[];
}

export interface DiscussionSlide {
  type: 'discussion';
  headline: string;
  seedQuestions: string[];
}

// SDLC-talk specific slide types
export interface DevelopmentLoopPhase {
  id: string;
  title: string;
  output: string;
  color: string;
}

export interface DevelopmentLoopSlide {
  type: 'development-loop';
  headline: string;
  subtitle?: string;
  phases: DevelopmentLoopPhase[];
  highlightPhase?: 'refinement' | 'planning' | 'implementation' | 'retrospective';
  showRpir?: boolean;
}

export interface ProcessStepInput {
  label: string;
  description?: string;
}

export interface ProcessStepOutput {
  label: string;
  description?: string;
}

export interface ProcessStepAgent {
  name: string;
  action: string;
}

export interface ProcessStepDetail {
  title: string;
  description: string;
  input?: ProcessStepInput;
  output?: ProcessStepOutput;
  agent?: ProcessStepAgent;
}

export interface ProcessStepSlide {
  type: 'process-step';
  headline: string;
  sectionColor: 'violet' | 'teal' | 'green' | 'amber';
  step: ProcessStepDetail;
  rpirHighlight?: 'research' | 'plan' | 'implement' | 'reflect';
  rpirAllActive?: boolean;
  humanInLoop?: boolean;
  keyPoints?: string[];
}

export interface ReviewNextSection {
  name: string;
  preview: string;
}

export interface ReviewSlide {
  type: 'review';
  headline: string;
  sectionColor: 'violet' | 'teal' | 'green' | 'amber';
  sectionName: string;
  recap: string[];
  artifacts?: string[];
  learnings?: string[];
  nextSection?: ReviewNextSection;
}

export interface MemeItem {
  icon: 'utensils' | 'moon' | 'repeat' | 'play';
  label: string;
  color: 'violet' | 'teal' | 'green' | 'amber';
}

export interface MemeSlide {
  type: 'meme';
  headline: string;
  items: MemeItem[];
}

export type Slide = TitleSlide | RegularSlide | EvolutionSlide | QuestionSlide | AgentTheorySlide | EasyStartSlide | SpecGapSlide | WaysSlide | PillarsSlide | SddSlide | QualitySlide | InteractionSlide | McpSlide | GuidanceSlide | GuardrailsSlide | VsSlide | PrimeDirectiveSlide | MentalModelSlide | AiFailuresSlide | JobsSlide | HandsOnSlide | BigStatementSlide | ChatbotMentalModelSlide | SafetyChecklistSlide | AgentLoopSlide | AgentCapabilitiesSlide | HumansVsAgentsSlide | MultiplierSlide | QuotesSlide | TrendSlide | SplitQuestionSlide | WrongReactionSlide | PracticeImplicationSlide | TransitionSlide | ClosingSlide | ScreenshotSlide | PerformanceGraphSlide | AdoptionCycleSlide | PromptingGuidelinesSlide | ExistingCodebaseStepSlide | AboutUsSlide | ConvergenceSlide | DiscussionSlide | DevelopmentLoopSlide | ProcessStepSlide | ReviewSlide | MemeSlide;

export interface Presentation {
  name: string;
  slides: Slide[];
}
