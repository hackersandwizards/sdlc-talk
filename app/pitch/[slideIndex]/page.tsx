import { notFound } from 'next/navigation';
import { TitleSlide } from '@/components/slides/TitleSlide';
import { RegularSlide } from '@/components/slides/RegularSlide';
import { DevelopmentLoopSlide } from '@/components/slides/DevelopmentLoopSlide';
import { SlideNavigation } from '@/components/slides/SlideNavigation';
import { SlideHints } from '@/components/slides/SlideHints';
import { LaserPointer } from '@/components/slides/LaserPointer';
import { SlideContainer } from '@/components/slides/SlideContainer';
import { sdlcPitch } from '@/data/presentations/sdlc-pitch';

interface Props {
  params: Promise<{
    slideIndex: string;
  }>;
}

export default async function PitchSlidePage({ params }: Props) {
  const { slideIndex } = await params;
  const presentation = sdlcPitch;

  const index = parseInt(slideIndex, 10);

  if (isNaN(index) || index < 0 || index >= presentation.slides.length) {
    notFound();
  }

  const slide = presentation.slides[index];

  return (
    <SlideContainer>
      <SlideNavigation
        currentIndex={index}
        totalSlides={presentation.slides.length}
        basePath="/pitch"
      />
      {slide.type === 'title' && <TitleSlide slide={slide} />}
      {slide.type === 'development-loop' && <DevelopmentLoopSlide slide={slide} />}
      {slide.type === 'regular' && <RegularSlide slide={slide} />}
      <SlideHints slideIndex={index} slideType={slide.type} />
      <LaserPointer />
    </SlideContainer>
  );
}
