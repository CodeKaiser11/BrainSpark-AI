import Navbar from "@/components/Navbar";

export default function Features() {
  const tools = [
    { title: "Neuro-Scanner", desc: "Real-time attention tracking via EEG integration.", icon: "🧠" },
    { title: "Concept Weaver", desc: "Automated synthesis of disparate research papers.", icon: "🧬" },
    { title: "Semantic Vault", desc: "Advanced vector search for your personal notes.", icon: "🗄️" },
    { title: "Flash-Forge", desc: "AI-generated active recall drills from any text.", icon: "⚡" },
    { title: "Academic Quill", desc: "Sophisticated editorial assistance for journals.", icon: "🖋️" },
    { title: "Focus Filament", desc: "High-contrast reading modes to eliminate strain.", icon: "👁️" },
  ];

  return (
    <main className="section-base" style={{ minHeight: "100vh" }}>
      <Navbar />
      
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 className="display-font" style={{ fontSize: 'var(--headline-md)', marginBottom: '1rem' }}>
            The Intellectual Suite
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', opacity: 0.6 }}>
            A curated collection of AI-driven tools designed to augment collegiate and professional research workflows.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {tools.map((tool, i) => (
            <div key={i} className="glass-panel" style={{ 
              padding: '2.5rem', 
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
              background: 'var(--surface-container-low)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{tool.icon}</div>
              <h3 className="display-font" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{tool.title}</h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.7, lineHeight: '1.6' }}>{tool.desc}</p>
              
              <div style={{ 
                marginTop: '1.5rem', 
                fontSize: 'var(--label-sm)', 
                color: 'var(--primary)', 
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                Activate Module →
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
