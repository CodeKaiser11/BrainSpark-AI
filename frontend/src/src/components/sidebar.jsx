const menuSections = [
    {
        label: "Core",
        items: [
            { icon: "🏠", name: "Dashboard", desc: "Overview & analytics", tag: null, tagType: null, active: true },
            { icon: "🤖", name: "AI Tutor Chat", desc: "Ask anything, anytime", tag: "GPT-4", tagType: "ai", active: false },
            { icon: "📸", name: "Snap & Solve", desc: "Photo → solution", tag: "OCR", tagType: "ai", active: false },
        ],
    },
    {
        label: "Study Tools",
        items: [
            { icon: "🧠", name: "AI Mind Maps", desc: "Visual topic explorer", tag: "New", tagType: "new", active: false },
            { icon: "📝", name: "Notes Generator", desc: "Upload → smart notes", tag: "New", tagType: "new", active: false },
            { icon: "🎯", name: "Smart Quizzes", desc: "Adaptive difficulty", tag: "AI", tagType: "ai", active: false },
            { icon: "🃏", name: "Flashcards", desc: "Spaced repetition", tag: null, tagType: null, active: false },
        ],
    },
    {
        label: "Discover",
        items: [
            { icon: "▶️", name: "YouTube Picks", desc: "Smart video recs", tag: "Smart", tagType: "new", active: false },
            { icon: "📅", name: "Study Planner", desc: "AI-built schedule", tag: "Soon", tagType: "soon", active: false },
            { icon: "🔥", name: "Streak & Badges", desc: "Stay motivated", tag: "Soon", tagType: "soon", active: false },
            { icon: "📊", name: "Progress", desc: "Track your growth", tag: null, tagType: null, active: false },
        ],
    },
]

const tagColors = {
    new: { bg: "rgba(212,80,10,0.2)", color: "#ff9060" },
    ai: { bg: "rgba(60,120,220,0.25)", color: "#80b0ff" },
    soon: { bg: "rgba(255,255,255,0.07)", color: "#6a6050" },
}

const iconBgs = {
    "🏠": "rgba(212,80,10,0.2)",
    "🤖": "rgba(60,120,220,0.2)",
    "📸": "rgba(42,122,75,0.2)",
    "🧠": "rgba(232,160,32,0.2)",
    "📝": "rgba(212,80,10,0.15)",
    "🎯": "rgba(42,122,75,0.15)",
    "🃏": "rgba(255,255,255,0.06)",
    "▶️": "rgba(220,50,50,0.18)",
    "📅": "rgba(255,255,255,0.05)",
    "🔥": "rgba(255,180,60,0.15)",
    "📊": "rgba(92,200,255,0.12)",
}

function Sidebar() {
    return (
        <aside style={styles.sidebar}>

            {/* Logo */}
            <div style={styles.logo}>
                <div style={styles.logoIcon}>🧠</div>
                <div>
                    <div style={styles.logoText}>
                        BrainSpark <span style={{ color: "#d4500a" }}>AI</span>
                    </div>
                    <div style={styles.logoSub}>Intelligent Study Assistant</div>
                </div>
            </div>

            {/* Menu sections */}
            {menuSections.map((section) => (
                <div key={section.label}>
                    <div style={styles.sectionLabel}>{section.label}</div>

                    {section.items.map((item) => (
                        <div
                            key={item.name}
                            style={{
                                ...styles.item,
                                background: item.active ? "rgba(212,80,10,0.18)" : "transparent",
                                borderLeft: item.active ? "3px solid #d4500a" : "3px solid transparent",
                            }}
                            onMouseEnter={(e) => {
                                if (!item.active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                            }}
                            onMouseLeave={(e) => {
                                if (!item.active) e.currentTarget.style.background = "transparent"
                            }}
                        >
                            {/* Icon */}
                            <div style={{ ...styles.icon, background: iconBgs[item.icon] || "rgba(255,255,255,0.06)" }}>
                                {item.icon}
                            </div>

                            {/* Info */}
                            <div style={styles.info}>
                                <div style={{ ...styles.itemName, color: item.active ? "#ffb899" : "#f0e8d8" }}>
                                    {item.name}
                                </div>
                                <div style={styles.itemDesc}>{item.desc}</div>
                            </div>

                            {/* Tag */}
                            {item.tag && (
                                <span style={{
                                    ...styles.tag,
                                    background: tagColors[item.tagType]?.bg,
                                    color: tagColors[item.tagType]?.color,
                                }}>
                                    {item.tag}
                                </span>
                            )}
                        </div>
                    ))}

                    <hr style={styles.divider} />
                </div>
            ))}

            {/* Bottom CTA */}
            <div style={styles.bottom}>
                <button
                    style={styles.ctaBtn}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#b03500")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#d4500a")}
                >
                    🚀 Start for Free
                </button>
                <div style={styles.version}>v1.0.0 — beta</div>
            </div>

        </aside>
    )
}

const styles = {
    sidebar: {
        width: "256px",
        minHeight: "100vh",
        background: "#12100c",
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        paddingBottom: "24px",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        overflowY: "auto",
    },
    logo: {
        padding: "22px 20px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "4px",
    },
    logoIcon: {
        width: "36px", height: "36px",
        borderRadius: "9px",
        background: "linear-gradient(135deg, #d4500a, #e8a020)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1rem", flexShrink: 0,
    },
    logoText: {
        fontSize: "1rem", fontWeight: 700,
        color: "#f0e8d8", letterSpacing: "-0.3px",
    },
    logoSub: {
        fontSize: "0.63rem", color: "#6a6050",
        marginTop: "2px", letterSpacing: "0.3px",
    },
    sectionLabel: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.62rem",
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: "#6a6050",
        padding: "14px 20px 6px",
    },
    item: {
        display: "flex",
        alignItems: "center",
        gap: "11px",
        padding: "9px 20px",
        cursor: "pointer",
        transition: "background 0.18s",
        position: "relative",
    },
    icon: {
        width: "30px", height: "30px",
        borderRadius: "7px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.88rem", flexShrink: 0,
    },
    info: { flex: 1, minWidth: 0 },
    itemName: {
        fontSize: "0.82rem", fontWeight: 600,
        lineHeight: 1.2,
    },
    itemDesc: {
        fontSize: "0.68rem", color: "#6a6050",
        marginTop: "1px",
        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
    },
    tag: {
        fontSize: "0.58rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.3px",
        padding: "2px 7px", borderRadius: "100px", flexShrink: 0,
    },
    divider: {
        border: "none",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        margin: "6px 0",
    },
    bottom: {
        marginTop: "auto",
        padding: "16px 20px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    ctaBtn: {
        width: "100%",
        background: "#d4500a",
        color: "white",
        border: "none",
        borderRadius: "9px",
        padding: "11px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.85rem", fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.2s",
    },
    version: {
        textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.62rem", color: "#6a6050",
        marginTop: "10px",
    },
}

export default Sidebar