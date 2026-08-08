import { getServices, getExperiences } from "@/lib/data";
import HeroSection from "@/components/home/HeroSection";
import { Button } from "@/components/ui/Button";
import { ServicesGallery } from "@/components/home/ServicesGallery";
import { TimelineSection } from "@/components/ui/TimelineSection";

const PRODUCT_MARKETING_IMAGE = 'https://images.unsplash.com/photo-1702609342206-c37562b99740?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const SERVICE_IMAGES: Record<string, string> = {
  'content strategy': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'marketing consulting': 'https://plus.unsplash.com/premium_photo-1726804880693-8fcdd773ce80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hcmtldGluZyUyMGNvbnN1bHRhbnR8ZW58MHx8MHx8fDA%3D',
  'brand marketing': 'https://plus.unsplash.com/premium_photo-1752230475676-8fb37ed41631?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'copywriting': 'https://images.unsplash.com/photo-1504691342899-4d92b50853e1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'social media marketing': 'https://images.unsplash.com/photo-1690883793939-f8cca2f28ee0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNvY2lhbCUyMG1lZGlhJTIwbWFya2V0aW5nfGVufDB8fDB8fHww',
  'brand consulting': 'https://images.unsplash.com/photo-1702047054352-cf264d3b1a9c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'ghostwriting': 'https://images.unsplash.com/photo-1767547109500-db6a9d411ae9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdob3N0d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  'growth marketing': 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'marketing strategy': 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const COLORS = [
  '#efded9', '#d6d6d6', '#f1edeb', '#e7e7e7', '#faf6f4',
  '#efded9', '#d6d6d6', '#f1edeb', '#e7e7e7', '#faf6f4'
];

function generatePlaceholderImage(text: string, color: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
    <rect width="800" height="600" fill="${color}"/>
    <text x="400" y="300" font-family="sans-serif" font-size="32" fill="#212121" text-anchor="middle" dominant-baseline="middle">${text}</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

export default async function Home() {
  const services = await getServices();
  const galleryItems = services.map((service, idx) => {
    const key = service.title.toLowerCase();
    if (SERVICE_IMAGES[key]) {
      return {
        image: SERVICE_IMAGES[key],
        text: service.title
      };
    }
    if (key === 'product marketing') {
      return {
        image: PRODUCT_MARKETING_IMAGE,
        text: service.title
      };
    }
    return {
      image: generatePlaceholderImage(service.title, COLORS[idx % COLORS.length]),
      text: service.title
    };
  });

  return (
    <div>
      <HeroSection />

      {/* Services */}
      <section className="section container" style={{ marginBlock: "0px" }}>
        <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-2)", textAlign: "center", fontSize: "40px" }}>What I Do</h2>
        <div style={{ height: '600px', position: 'relative' }}>
          <ServicesGallery items={galleryItems} />
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section container" style={{ marginBlock: "0px" }}>
        <TimelineSection />
      </section>

      {/* Inquiry CTA */}
      <section className="section container" style={{ 
        textAlign: "center",
        paddingBlock: "120px"
      }}>
        <h2 className="text-display-hero" style={{ marginBottom: "var(--spacing-md-2)" }}>Want to grow your brand?</h2>
        <Button href="/contact">Let's grow ↗</Button>
      </section>
    </div>
  );
}
