"use client";

import { useState } from "react";
import type { ServiceItem } from "@/types";

interface ServicesListProps {
  services: ServiceItem[];
}

export function ServicesList({ services }: ServicesListProps) {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {services.map((service) => {
        const isOpen = openId === service.id;

        return (
          <div
            key={service.id}
            style={{
              border: "1px solid #e7e7e7",
              borderRadius: "23.1px",
              backgroundColor: "#ffffff",
              overflow: "hidden",
              transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
              borderColor: isOpen ? "#212121" : "#e7e7e7",
            }}
          >
            <button
              onClick={() => toggle(service.id)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "21px 21px",
                textAlign: "left",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18.2px",
                  fontWeight: 400,
                  lineHeight: "16.38px",
                  color: "#212121",
                  transition: "color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {service.title}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid #e7e7e7",
                  backgroundColor: isOpen ? "#212121" : "#ffffff",
                  color: isOpen ? "#ffffff" : "#212121",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  flexShrink: 0,
                  marginLeft: "21px",
                  fontSize: "16px",
                  lineHeight: 1,
                }}
              >
                +
              </span>
            </button>

            <div
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "16.8px",
                    fontWeight: 400,
                    lineHeight: "18.48px",
                    padding: "0 21px 21px",
                    opacity: 0.8,
                    maxWidth: "600px",
                    color: "#424242",
                    textAlign: "justify",
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
