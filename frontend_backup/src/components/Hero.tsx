"use client";

export default function Hero() {
  return (
    <section className="section-base" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      padding: '4rem 2rem',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
        <div>
          <span style={{ 
            fontSize: 'var(--label-sm)', 
            textTransform: 'uppercase', 
            color: 'var(--secondary)', 
            letterSpacing: '0.2em',
            marginBottom: '1rem',
            display: 'block'
          }}>
            Advanced Academic Engine
          </span>
          <h1 style={{ fontSize: 'var(--display-lg)', lineHeight: '0.95', marginBottom: '2rem' }}>
            Elevate Your <br />
            <span style={{ color: 'var(--primary)' }}>Academic Intelligence</span>
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            lineHeight: '1.6', 
            opacity: 0.7, 
            marginBottom: '3rem',
            maxWidth: '500px'
          }}>
            BrainSpark is a sophisticated dark-mode ecosystem designed for high-velocity learning. Juxtaposing the quiet focus of a library with advanced computing.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button className="btn-primary">Connect Brain</button>
            <button className="btn-secondary">Technical Specs</button>
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
          <div className="glass-panel tonal-glow" style={{ 
            height: '450px', 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Visual Placeholder for AI Insight Chip */}
            <div className="glass-panel" style={{ 
              padding: '1rem 2rem', 
              borderLeft: '4px solid var(--secondary)',
              animation: 'pulse 3s infinite'
            }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '0.25rem' }}>SYSTEM INSIGHT</div>
              <div style={{ fontWeight: '600' }}>Neuro-Academic Synthesis Complete.</div>
            </div>
            
            <div style={{ 
              width: '80%', 
              height: '2px', 
              background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
              opacity: 0.3
            }}></div>
            
            <div style={{ fontSize: '0.875rem', opacity: 0.5 }}>Awaiting interaction...</div>
          </div>
          
          {/* Asymmetrical Floating Element */}
          <div className="glass-panel" style={{ 
            position: 'absolute', 
            bottom: '-2rem', 
            left: '-2rem', 
            padding: '1.5rem',
            maxWidth: '200px',
            fontSize: 'var(--label-sm)',
            background: 'var(--surface-container-highest)'
          }}>
            <div style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>DATA STREAM</div>
            <div style={{ opacity: 0.7, lineHeight: '1.4' }}>AI is an ethereal layer of intelligence resting on your foundation.</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(76, 215, 246, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(76, 215, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(76, 215, 246, 0); }
        }
      `}</style>
    </section>
  );
}
