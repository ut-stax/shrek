import Link from "next/link";

export function Footer() {
  return (
    <footer style={{
      padding: "var(--spacing-section) var(--spacing-lg-1)",
      backgroundColor: "var(--color-near-black)",
      color: "var(--color-blush-rose)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--spacing-md-2)"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "var(--spacing-section)"
      }}>
        <div style={{ maxWidth: "400px" }}>
          <h2 className="text-display-subhead" style={{ marginBottom: "var(--spacing-md-1)" }}>SHREEKALA PANDEY</h2>
          <p className="text-body-default" style={{ opacity: 0.8 }}>
            Marketing Diva · Brand Growth Strategist helping founders turn products into brands through content, positioning, and storytelling.
          </p>
        </div>
        
        <div style={{ display: "flex", gap: "var(--spacing-section)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm-3)" }}>
            <h3 className="text-filter-label" style={{ opacity: 0.6 }}>Menu</h3>
            <Link href="/" className="text-body-default">Home</Link>
            <Link href="/work" className="text-body-default">Work</Link>
            <Link href="/about" className="text-body-default">About</Link>
            <Link href="/insights" className="text-body-default">Insights</Link>
            <Link href="/contact" className="text-body-default">Contact</Link>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm-3)" }}>
            <h3 className="text-filter-label" style={{ opacity: 0.6 }}>Social</h3>
            <a href="https://www.instagram.com/b.withshree/" className="text-body-default" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/" className="text-body-default" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://selfmba.lovable.app/" className="text-body-default" target="_blank" rel="noopener noreferrer">Website</a>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: "var(--spacing-section)",
        paddingTop: "var(--spacing-md-1)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        justifyContent: "space-between",
        opacity: 0.6
      }}>
        <span className="text-caption-small">© {new Date().getFullYear()} Shreekala Pandey. All rights reserved.</span>
        <div style={{ display: "flex", gap: "var(--spacing-md-1)" }}>
          <Link href="#" className="text-caption-small">Privacy Policy</Link>
          <Link href="#" className="text-caption-small">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
