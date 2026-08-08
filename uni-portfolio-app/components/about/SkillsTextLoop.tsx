'use client';

import TextLoop from '@/components/text-loop/TextLoop';

interface SkillsTextLoopProps {
  skills: string[];
}

export function SkillsTextLoop({ skills }: SkillsTextLoopProps) {
  const text = skills.join(' ✦ ');
  const loopText = text || 'BRANDING ✦ MARKETING ✦ STRATEGY ✦ CONTENT ✦ POSITIONING ✦ STORYTELLING';

  return (
    <div style={{ marginBottom: 'var(--spacing-md-1)', maxWidth: '100%', overflow: 'hidden' }}>
      <TextLoop
        text={loopText}
        shape="wave"
        speed={70}
        direction="forward"
        separator="✦"
        curviness={60}
        fontSize={30}
        fontWeight={700}
        letterSpacing={5}
        uppercase={true}
        color="#212121"
        ribbon={true}
        ribbonColor="#efded9"
        ribbonWidth={64}
        pauseOnHover={true}
      />
    </div>
  );
}
