'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  currentIndex: number;
  totalSlides: number;
  basePath?: string;
}

export function SlideNavigation({
  currentIndex,
  totalSlides,
  basePath = '/presentation',
}: Props) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        router.push(`${basePath}/${currentIndex - 1}`);
      } else if (event.key === 'ArrowRight' && currentIndex < totalSlides - 1) {
        router.push(`${basePath}/${currentIndex + 1}`);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, currentIndex, totalSlides, basePath]);

  return null;
}
