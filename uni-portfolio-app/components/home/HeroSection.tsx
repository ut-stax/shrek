'use client';

import CurvedLoop from '@/components/curved-loop/CurvedLoop';

interface HeroSectionProps {
  children?: React.ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="hero-section" style={{ paddingTop: "40px", paddingBottom: "40px" }}> 
      <div style={{ 
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        paddingTop: "0px"
      }}>
        <CurvedLoop 
          marqueeText="Shreekala Pandey ✦ She/Her ✦ Brand Growth Strategist ✦ Content ✦ Positioning ✦ Storytelling ✦ OneMeet ✦"
          speed={1.5}
          curveAmount={300}
          direction="left"
          interactive={false}
          className="text-[3rem] md:text-[5rem] lg:text-[7rem] font-bold uppercase leading-none"
        />
      </div>
    </section>
  );
}
