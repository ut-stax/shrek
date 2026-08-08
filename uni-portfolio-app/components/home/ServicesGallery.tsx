'use client';

import dynamic from "next/dynamic";

const CircularGallery = dynamic(() => import("@/components/circular-gallery/CircularGallery"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p className="text-body-large" style={{ opacity: 0.6 }}>Loading services...</p>
    </div>
  ),
});

interface ServicesGalleryProps {
  items: { image: string; text: string }[];
}

export function ServicesGallery({ items }: ServicesGalleryProps) {
  return (
    <CircularGallery
      bend={1}
      textColor="#000000"
      borderRadius={0.05}
      scrollEase={0.05}
      font="bold 30px Figtree"
      scrollSpeed={2}
      items={items}
    />
  );
}
