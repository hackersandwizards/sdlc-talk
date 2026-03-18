'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface Props {
  children: ReactNode;
}

export function SlideContainer({ children }: Props) {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {children}
      {/* h&w logo watermark */}
      <div className="fixed bottom-4 right-4 z-40 opacity-15">
        <Image
          src="/hw-logo.svg"
          alt="hackers&wizards"
          width={80}
          height={65}
          className="pointer-events-none"
        />
      </div>
    </div>
  );
}

export function SlideContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1914px] ${className}`}>
      {children}
    </div>
  );
}
