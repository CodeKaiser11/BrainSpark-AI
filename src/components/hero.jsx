function Hero() {
    return (
        <section style={styles.hero}>

            {/* Eyebrow badge */}
            <div style={styles.eyebrow}>
                <span style={styles.pulse}></span>
                AI Mind Maps &amp; Smart Notes — Live Now
            </div>

            {/* Headline */}
            <h1 style={styles.h1}>
                Study Smarter.<br />
                Score{" "}
                <span style={styles.highlight}>Higher.</span>
            </h1>

            {/* Subtext */}
            <p style={styles.sub}>
                BrainSpark AI is your intelligent study companion — powered by GPT-4 &amp; Gemini.
                Upload notes, chat with AI, generate quizzes and track real progress.
            </p>

            {/* Buttons */}
            <div style={styles.btns}>
                <a href="#cta" style={styles.btnPrimary}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#b03500"
                        e.currentTarget.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#d4500a"
                        e.currentTarget.style.transform = "translateY(0)"
                    }}
                >
                    🚀 Start for Free
                </a>
                <a href="#how" style={styles.btnOutline}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1a1208")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d4c9b8")}
                >
                    See how it works →
                </a>
            </div>

            {/* Chat preview card */}
            <div style={styles.card}>
                {/* Window bar */}
                <div style={styles.cardBar}>
                    <span style={{ ...styles.dot, background: "#ff6b6b" }}></span>
                    <span style={{ ...styles.dot, background: "#ffd93d" }}></span>
                    <span style={{ ...styles.dot, background: "#6bcb77" }}></span>
                    <span style={styles.cardTitle}>brainspark-ai / tutor-chat</span>
                </div>

                {/* Messages */}
                <div style={styles.cardBody}>
                    {/* User message */}
                    <div style={styles.msg}>
                        <div style={{ ...styles.avatar, background: "#f3ede4", border: "1px solid #e8e0d5" }}>👩</div>
                        <div style={{ ...styles.bubble, ...styles.userBubble }}>
                            Explain Photosynthesis like I'm 10 years old
                        </div>
                    </div>

                    {/* AI message */}
                    <div style={styles.msg}>
                        <div style={{ ...styles.avatar, background: "linear-gradient(135deg,#d4500a,#e8a020)" }}>🧠</div>
                        <div style={{ ...styles.bubble, ...styles.aiBubble }}>
                            <div style={styles.aiLabel}>✦ BrainSpark AI</div>
                            Photosynthesis is how plants make their own food using sunlight! 🌱
                            Think of it like a tiny kitchen inside every leaf. The plant takes{" "}
                            <strong>sunlight + water + CO₂</strong> and cooks it into{" "}
                            <strong>glucose + oxygen</strong>.<br /><br />
                            The magic formula —{" "}
                            <span style={styles.formula}>6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</span>
                            <div style={styles.dots}>
                                <span style={styles.dot1}></span>
                                <span style={styles.dot2}></span>
                                <span style={styles.dot3}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }
        @keyframes bd { 0%,100%{opacity:.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-3px)} }
        .d1{animation:bd 1.2s infinite}
        .d2{animation:bd 1.2s .2s infinite}
        .d3{animation:bd 1.2s .4s infinite}
      `}</style>
        </section>
    )
}

const styles = {
    hero: {
        padding: "72px 44px 56px",
        position: "relative",
        overflow: "hidden",
    },
    eyebrow: {
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        background: "#fff5ee",
        border: "1px solid #f0cdb0",
        color: "#d4500a",
        padding: "5px 13px",
        borderRadius: "100px",
        fontSize: "0.72rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.8px",
        marginBottom: "22px",
    },
    pulse: {
        width: "6px", height: "6px",
        borderRadius: "50%",
        background: "#d4500a",
        animation: "pulse 1.5s infinite",
        display: "inline-block",
    },
    h1: {
        fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
        fontWeight: 800,
        lineHeight: 1.06,
        letterSpacing: "-2.5px",
        color: "#1a1208",
        maxWidth: "660px",
        marginBottom: "22px",
    },
    highlight: {
        color: "#d4500a",
        borderBottom: "3px solid #e8a020",
        paddingBottom: "2px",
    },
    sub: {
        fontSize: "1rem",
        color: "#8a7e6e",
        lineHeight: 1.75,
        maxWidth: "500px",
        marginBottom: "32px",
        fontWeight: 400,
    },
    btns: { display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "52px" },
    btnPrimary: {
        background: "#d4500a",
        color: "white",
        padding: "13px 28px",
        borderRadius: "10px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.92rem", fontWeight: 700,
        border: "none", cursor: "pointer",
        textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "8px",
        transition: "background 0.2s, transform 0.2s",
        boxShadow: "0 4px 20px rgba(212,80,10,0.28)",
    },
    btnOutline: {
        background: "transparent",
        color: "#3d3525",
        padding: "13px 26px",
        borderRadius: "10px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.92rem", fontWeight: 500,
        border: "1.5px solid #d4c9b8",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: "8px",
        transition: "border-color 0.2s",
    },
    card: {
        maxWidth: "640px",
        background: "white",
        border: "1px solid #e8e0d5",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 6px 32px rgba(26,18,8,0.09)",
    },
    cardBar: {
        background: "#f3ede4",
        borderBottom: "1px solid #e8e0d5",
        padding: "11px 16px",
        display: "flex", alignItems: "center", gap: "6px",
    },
    dot: { width: "9px", height: "9px", borderRadius: "50%", display: "inline-block" },
    cardTitle: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.68rem", color: "#8a7e6e", marginLeft: "6px",
    },
    cardBody: { padding: "18px", display: "flex", flexDirection: "column", gap: "13px" },
    msg: { display: "flex", gap: "9px", alignItems: "flex-start" },
    avatar: {
        width: "28px", height: "28px",
        borderRadius: "7px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.75rem", flexShrink: 0,
    },
    bubble: {
        borderRadius: "9px",
        padding: "9px 13px",
        fontSize: "0.83rem",
        lineHeight: 1.6,
        maxWidth: "88%",
    },
    userBubble: {
        background: "#f3ede4",
        border: "1px solid #e8e0d5",
        color: "#3d3525",
    },
    aiBubble: {
        background: "linear-gradient(135deg,#fff8f4,#fffcf0)",
        border: "1px solid #f0d8c0",
        color: "#3d3525",
    },
    aiLabel: {
        fontSize: "0.65rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.8px",
        color: "#d4500a", marginBottom: "4px",
    },
    formula: {
        fontFamily: "'JetBrains Mono', monospace",
        background: "rgba(212,80,10,0.08)",
        color: "#d4500a",
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "0.76rem",
    },
    dots: { display: "flex", gap: "3px", alignItems: "center", marginTop: "5px" },
    dot1: { width: "4px", height: "4px", borderRadius: "50%", background: "#d4500a", animationName: "bd", animationDuration: "1.2s", animationIterationCount: "infinite" },
    dot2: { width: "4px", height: "4px", borderRadius: "50%", background: "#d4500a", animationName: "bd", animationDuration: "1.2s", animationDelay: "0.2s", animationIterationCount: "infinite" },
    dot3: { width: "4px", height: "4px", borderRadius: "50%", background: "#d4500a", animationName: "bd", animationDuration: "1.2s", animationDelay: "0.4s", animationIterationCount: "infinite" },
}

export default Hero