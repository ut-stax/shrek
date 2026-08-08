"use client";

import { useEffect, useState } from "react";
import type { MediaAssetEntity } from "@/types";

interface ProjectMediaGalleryProps {
  assets: MediaAssetEntity[];
}

export function ProjectMediaGallery({ assets }: ProjectMediaGalleryProps) {
  const [brokenVideoIds, setBrokenVideoIds] = useState<Record<string, boolean>>({});
  const [loadedVideoIds, setLoadedVideoIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timers = assets
      .filter((asset) => asset.asset_type === "video")
      .map((asset) =>
        window.setTimeout(() => {
          setBrokenVideoIds((current) =>
            loadedVideoIds[asset.id] ? current : { ...current, [asset.id]: true }
          );
        }, 5000)
      );

    return () => timers.forEach((timerId) => window.clearTimeout(timerId));
  }, [assets, loadedVideoIds]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-2)" }}>
      {assets.map((asset) => (
        <div key={asset.id} style={{ width: "100%", borderRadius: "var(--radius-card-alt)", overflow: "hidden", backgroundColor: "var(--color-pale-gray)" }}>
          {asset.asset_type === "video" && !brokenVideoIds[asset.id] ? (
            <video
              src={asset.url}
              poster={asset.poster_url}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => setLoadedVideoIds((current) => ({ ...current, [asset.id]: true }))}
              onError={() => setBrokenVideoIds((current) => ({ ...current, [asset.id]: true }))}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset.asset_type === "video" ? asset.poster_url || asset.url : asset.url}
              alt={asset.alt_text}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}