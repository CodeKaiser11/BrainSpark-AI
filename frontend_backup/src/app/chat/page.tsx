import Navbar from "@/components/Navbar";

export default function Chat() {
  const messages = [
    { role: 'assistant', text: "Welcome back to the Neon Library. I've finished indexing your latest notes on Neuroplasticity. Where should we begin?" },
    { role: 'user', text: "Explain the role of BDNF in hippocampal long-term potentiation." },
    { role: 'assistant', text: "BDNF, or Brain-Derived Neurotrophic Factor, acts as a primary mediator of LTP. It binds to TrkB receptors, triggering a signalling cascade that enhances synaptic strength by increasing the expression of AMPA receptors. Would you like a visualization of this pathway?" },
  ];

  return (
    <main className="section-base" style={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '2rem' }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '2rem' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ 
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{ 
                fontSize: 'var(--label-sm)', 
                opacity: 0.5, 
                textAlign: m.role === 'user' ? 'right' : 'left',
                textTransform: 'uppercase'
              }}>
                {m.role} // SESSION-01
              </div>
              <div className="glass-panel" style={{ 
                padding: '1.5rem', 
                background: m.role === 'user' ? 'var(--surface-container-highest)' : 'rgba(208, 188, 255, 0.05)',
                borderLeft: m.role === 'assistant' ? '4px solid var(--primary)' : 'none',
                lineHeight: '1.6'
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area (Tonal Recess) */}
        <div className="section-elevated" style={{ padding: '1.5rem', borderRadius: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Query the academic engine..." 
            style={{ 
              flex: 1, 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--foreground)', 
              fontSize: '1rem',
              outline: 'none'
            }} 
          />
          <button className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>SEND</button>
        </div>
      </div>
    </main>
  );
}
