import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <main className="section-base" style={{ minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 className="display-font" style={{ fontSize: 'var(--headline-md)' }}>Control Deck</h1>
          <p style={{ opacity: 0.6 }}>Academic status and neuro-metrics overview.</p>
        </div>

        {/* Bento Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gridAutoRows: 'minmax(200px, auto)',
          gap: '1.5rem' 
        }}>
          {/* Main Focused Document (Spans 2 columns) */}
          <div className="section-focused glass-panel tonal-glow" style={{ 
            gridColumn: 'span 2', 
            gridRow: 'span 2',
            padding: '2.5rem'
          }}>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: 'var(--label-sm)', textTransform: 'uppercase' }}>
              Active Synthesis
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Quantum Computing in Biology</h2>
            <p style={{ opacity: 0.7, lineHeight: '1.8' }}>
              We are currently analyzing the intersection of quantum decoherence and enzymatic reaction rates. 
              The AI has flagged 3 potential correlations in your last reading session.
            </p>
            
            <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
              <div className="glass-panel" style={{ padding: '1rem', background: 'var(--surface-container-highest)', flex: 1 }}>
                <div style={{ opacity: 0.5, fontSize: '0.75rem' }}>COMPREHENSION</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>94%</div>
              </div>
              <div className="glass-panel" style={{ padding: '1rem', background: 'var(--surface-container-highest)', flex: 1 }}>
                <div style={{ opacity: 0.5, fontSize: '0.75rem' }}>RETENTION</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>88%</div>
              </div>
            </div>
          </div>

          {/* Metrics Card (Tonal Recess) */}
          <div className="section-elevated" style={{ 
            borderRadius: '1rem', 
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--secondary)' }}>4.2h</div>
              <div style={{ fontSize: 'var(--label-sm)', opacity: 0.6 }}>DEEP WORK TODAY</div>
            </div>
          </div>

          {/* Floating Intelligence Insight */}
          <div className="glass-panel" style={{ 
            padding: '2rem', 
            background: 'rgba(76, 215, 246, 0.05)',
            borderLeft: '4px solid var(--secondary)'
          }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>AI Suggestion</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.8, fontStyle: 'italic' }}>
              "Your focus levels are peaking. This is the optimal time to tackle the Complexity Theory module."
            </p>
          </div>

          {/* Quick Actions (The Ghost Border strategy) */}
          <div style={{ 
            gridColumn: 'span 3', 
            display: 'flex', 
            gap: '1rem',
            marginTop: '1rem' 
          }}>
            <button className="btn-secondary" style={{ flex: 1 }}>Review Last Session</button>
            <button className="btn-secondary" style={{ flex: 1 }}>Export Insights</button>
            <button className="btn-primary" style={{ flex: 1 }}>Start Session</button>
          </div>
        </div>
      </div>
    </main>
  );
}
