import Link from "next/link";
import { FloatingDock } from "@/components/ui/floating-dock/floating-dock";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconHome,
  IconUser,
  IconBriefcase,
  IconMail,
} from "@tabler/icons-react";

const navItems = [
  {
    title: "Home",
    icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/",
  },
  {
    title: "About",
    icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/about",
  },
  {
    title: "Services",
    icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/about",
  },
  {
    title: "Instagram",
    icon: <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://www.instagram.com/b.withshree/",
  },
  {
    title: "LinkedIn",
    icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "https://www.linkedin.com/",
  },
  {
    title: "Contact",
    icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    href: "/contact",
  },
];

export function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "var(--spacing-md-2) var(--spacing-lg-1)",
        position: "sticky",
        top: 0,
        backgroundColor: "transparent",
        zIndex: 100,
        borderBottom: "1px solid var(--color-pale-gray)",
      }}
    >
      <Link
        href="/"
        className="header__logo"
      >
        SHREEKALA
      </Link>

      <FloatingDock
        items={navItems}
        desktopClassName="bg-white/90 dark:bg-neutral-900 border border-black/5 dark:border-white/10"
      />

      <Link href="/contact" className="header__cta">
        Grow your brand ↘
      </Link>
    </header>
  );
}
