'use client';

import { useState, useEffect } from 'react';
import { RegularSlide as RegularSlideType } from '@/types/slide';
import { BlurFade } from '@/components/ui/blur-fade';
import { StaticLightRays } from '@/components/ui/static-light-rays';
import { Linkedin, User, Presentation, Code, HelpCircle, Rocket, Lightbulb, Target } from 'lucide-react';
import { ContentSection } from '@/types/slide';

interface Props {
  slide: RegularSlideType;
}

const iconMap = {
  presentation: Presentation,
  code: Code,
  question: HelpCircle,
  rocket: Rocket,
  lightbulb: Lightbulb,
  target: Target,
};

function AgendaCard({ section, index, isActive }: { section: ContentSection; index: number; isActive: boolean }) {
  const IconComponent = section.icon ? iconMap[section.icon] : null;

  return (
    <BlurFade delay={0.2 + index * 0.15} duration={0.5}>
      <div className={`flex h-full items-start gap-3 sm:gap-4 md:gap-6 rounded-xl sm:rounded-2xl border p-4 sm:p-6 md:p-8 backdrop-blur-sm transition-all duration-300 ${
        isActive
          ? 'border-[#1A7285]/40 bg-[#1A7285]/5'
          : 'border-gray-200 bg-white hover:border-[#1A7285]/30 hover:bg-gray-50'
      }`}>
        {IconComponent && (
          <div className={`flex h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-lg md:rounded-xl ${
            isActive
              ? 'bg-[#1A7285]/20 text-[#1A7285]'
              : 'bg-gray-100 text-[#9CA3AF]'
          }`}>
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
          </div>
        )}
        <div className="flex flex-col gap-1 sm:gap-2">
          {section.title && (
            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold ${isActive ? 'text-[#212121]' : 'text-[#6B7280]'}`}>
              {section.title}
            </h2>
          )}
          {section.text && (
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed ${isActive ? 'text-[#6B7280]' : 'text-[#9CA3AF]'}`}>
              {section.text}
            </p>
          )}
        </div>
      </div>
    </BlurFade>
  );
}

function ProfileCard({ profile }: { profile: NonNullable<RegularSlideType['profile']> }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <BlurFade delay={0.15} duration={0.5}>
        <div className="relative flex-shrink-0">
          {profile.imageSrc ? (
            <img
              src={profile.imageSrc}
              alt={profile.name}
              className="h-40 w-40 md:h-52 md:w-52 rounded-full border-4 border-[#1A7285]/20 object-cover"
            />
          ) : (
            <div className="flex h-40 w-40 md:h-52 md:w-52 items-center justify-center rounded-full border-4 border-[#1A7285]/20 bg-gradient-to-br from-[#1A7285]/5 to-white">
              <User className="h-20 w-20 md:h-24 md:w-24 text-[#1A7285]/40" />
            </div>
          )}
        </div>
      </BlurFade>

      <BlurFade delay={0.25} duration={0.5}>
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#212121]">
            {profile.name}
          </h2>
          <p className="mt-1 text-base md:text-lg font-medium text-[#1A7285]">
            {profile.title}
          </p>
          {profile.linkedIn && (
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm md:text-base text-[#1A7285] transition-colors hover:text-[#1A7285]/80"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>
      </BlurFade>
    </div>
  );
}

function getInitialRevealCount(sectionCount: number) {
  if (typeof window === 'undefined') return 0;
  const isBack = sessionStorage.getItem('slide-direction') === 'back';
  if (isBack) {
    sessionStorage.removeItem('slide-direction');
    return sectionCount;
  }
  return 0;
}

export function RegularSlide({ slide }: Props) {
  const hasProfile = !!slide.profile;
  const isCardsLayout = slide.layout === 'cards';
  const [activeSection, setActiveSection] = useState(slide.activeSection ?? 0);
  const [revealedCount, setRevealedCount] = useState(() =>
    isCardsLayout ? slide.sections.length : getInitialRevealCount(slide.sections.length)
  );

  useEffect(() => {
    if (isCardsLayout) {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowRight') {
          if (activeSection < slide.sections.length - 1) {
            event.preventDefault();
            event.stopPropagation();
            setActiveSection((prev) => Math.min(slide.sections.length - 1, prev + 1));
          }
        }
      }
      window.addEventListener('keydown', handleKeyDown, true);
      return () => window.removeEventListener('keydown', handleKeyDown, true);
    } else {
      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowRight') {
          if (revealedCount < slide.sections.length) {
            event.preventDefault();
            event.stopPropagation();
            setRevealedCount((prev) => Math.min(slide.sections.length, prev + 1));
          }
        }
      }
      window.addEventListener('keydown', handleKeyDown, true);
      return () => window.removeEventListener('keydown', handleKeyDown, true);
    }
  }, [isCardsLayout, slide.sections.length, revealedCount, activeSection]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#FAFAFA] text-[#212121]">
      <StaticLightRays
        className="opacity-70"
        color="rgba(26, 114, 133, 0.2)"
        blur={50}
        length="90vh"
      />

      <div className="slide-content relative z-10 flex flex-col">
        <div className="pt-6 sm:pt-8 md:pt-12 text-center px-4">
          <BlurFade delay={0.1} duration={0.6}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#212121]">
              {slide.headline}
            </h1>
          </BlurFade>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8 overflow-y-auto">
          {isCardsLayout ? (
            <div className="flex w-full max-w-3xl flex-col gap-2 sm:gap-3 md:gap-4">
              {slide.sections.map((section, index) => (
                <AgendaCard
                  key={index}
                  section={section}
                  index={index}
                  isActive={activeSection === index}
                />
              ))}
            </div>
          ) : (
            <div className={`flex ${hasProfile ? 'flex-row items-start gap-10 md:gap-16 w-full max-w-6xl' : 'flex-col gap-4 sm:gap-6 md:gap-8'}`}>
              {hasProfile && (
                <div className="flex-shrink-0 w-64 md:w-72">
                  <ProfileCard profile={slide.profile!} />
                </div>
              )}

              <div className={`flex flex-col gap-6 sm:gap-8 md:gap-10 ${hasProfile ? 'flex-1 min-w-0' : ''}`}>
                {slide.sections.map((section, index) => {
                  const isRevealed = index < revealedCount;
                  const isActive = index === revealedCount - 1;

                  return (
                    <div
                      key={index}
                      className={`transition-all duration-500 ${
                        isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                      }`}
                    >
                      <div className={`flex flex-col gap-3 sm:gap-4 md:gap-5 transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : isRevealed ? 'opacity-60' : ''
                      }`}>
                        {section.title && (
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1A7285]">
                            {section.title}
                          </h2>
                        )}
                        {section.text && (
                          <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-[#6B7280]">
                            {section.text}
                          </p>
                        )}
                        {section.items && (
                          <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4">
                            {section.items.map((item, itemIndex) => (
                              <li
                                key={itemIndex}
                                className="flex items-start gap-2 sm:gap-3 md:gap-4 text-base sm:text-lg md:text-xl lg:text-2xl text-[#6B7280]"
                              >
                                <span className="mt-2 sm:mt-2.5 md:mt-3 h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 rounded-full bg-gradient-to-r from-[#1A7285] to-[#9333EA]" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.link && (
                          <a
                            href={section.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-fit items-center gap-2 sm:gap-3 rounded-lg border border-[#1A7285]/20 bg-[#1A7285]/5 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 text-base sm:text-lg md:text-xl text-[#1A7285] transition-all hover:border-[#1A7285]/30 hover:bg-[#1A7285]/10 hover:text-[#1A7285]"
                          >
                            {section.link.label}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
