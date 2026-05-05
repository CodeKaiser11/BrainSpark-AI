import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="section-base" style={{ minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      
      {/* Features Insight Strip (The Progress Filament) */}
      <div style={{ 
        width: '100%', 
        height: '2px', 
        background: 'linear-gradient(90deg, var(--secondary), var(--primary), var(--secondary))',
        opacity: 0.8
      }}></div>

      {/* Content Engine Section */}
      <section className="section-elevated" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <h2 className="display-font" style={{ fontSize: 'var(--headline-md)', marginBottom: '1rem' }}>
              Designed for Editorial Precision
            </h2>
            <p style={{ maxWidth: '600px', opacity: 0.7, lineHeight: '1.6' }}>
              We reject rigid, boxy constraints. Our asymmetrical layouts allow AI-generated insights 
              to float over foundational knowledge, creating a seamless learning environment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--surface-container-low)' }}>
              <div style={{ color: 'var(--secondary)', marginBottom: '1rem', fontWeight: 'bold' }}>01. VISION</div>
              <h3 style={{ marginBottom: '1rem' }}>The Neon Library</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Intentional juxtaposition of traditional study halls with high-velocity computing.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--surface-container)' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: 'bold' }}>02. DEPTH</div>
              <h3 style={{ marginBottom: '1rem' }}>Tonal Layering</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Building depth through values rather than lines, creating a fluid, modern interface.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem', background: 'var(--surface-container-highest)' }}>
              <div style={{ color: 'var(--tertiary)', marginBottom: '1rem', fontWeight: 'bold' }}>03. FLOW</div>
              <h3 style={{ marginBottom: '1rem' }}>AI Symbiosis</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.6 }}>Translucent overlays that suggest an ethereal layer of intelligence resting on your data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.4 }}>
        <div className="display-font" style={{ fontSize: '1rem', letterSpacing: '0.1em' }}>
          BRAINSPARK AI // 2026 ACADEMIC DIVISION
        </div>
      </footer>
    </main>
  );
}
