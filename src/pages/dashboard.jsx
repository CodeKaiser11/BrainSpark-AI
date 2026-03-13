import { useState } from "react"

const stats = [
    { icon: "⏱️", label: "Study Hours", value: "24", sub: "This week", color: "#d4500a" },
    { icon: "🔥", label: "Day Streak", value: "7", sub: "Keep it up!", color: "#e8a020" },
    { icon: "🎯", label: "Quizzes Done", value: "12", sub: "This month", color: "#22c55e" },
    { icon: "📝", label: "Notes Saved", value: "8", sub: "Total uploads", color: "#3b82f6" },
]

const features = [
    {
        icon: "🤖",
        title: "AI Tutor Chat",
        desc: "Ask any question and get instant AI explanations powered by GPT-4.",
        color: "#d4500a",
        bg: "rgba(212,80,10,0.08)",
        border: "rgba(212,80,10,0.2)",
        tag: "GPT-4",
        tagColor: "#d4500a",
        tagBg: "rgba(212,80,10,0.1)",
        action: "Start Chatting →",
    },
    {
        icon: "🧠",
        title: "AI Mind Maps",
        desc: "Type any topic and get a beautiful visual mind map generated instantly.",
        color: "#a855f7",
        bg: "rgba(168,85,247,0.08)",
        border: "rgba(168,85,247,0.2)",
        tag: "New",
        tagColor: "#a855f7",
        tagBg: "rgba(168,85,247,0.1)",
        action: "Generate Map →",
    },
    {
        icon: "📸",
        title: "Snap & Solve",
        desc: "Click a photo of any problem. AI reads it and gives step-by-step solution.",
        color: "#22c55e",
        bg: "rgba(34,197,94,0.08)",
        border: "rgba(34,197,94,0.2)",
        tag: "OCR",
        tagColor: "#22c55e",
        tagBg: "rgba(34,197,94,0.1)",
        action: "Open Camera →",
    },
    {
        icon: "📝",
        title: "Notes Generator",
        desc: "Upload any chapter or PDF. Get summary, key points and flashcards.",
        color: "#3b82f6",
        bg: "rgba(59,130,246,0.08)",
        border: "rgba(59,130,246,0.2)",
        tag: "Upload",
        tagColor: "#3b82f6",
        tagBg: "rgba(59,130,246,0.1)",
        action: "Upload Notes →",
    },
    {
        icon: "🎯",
        title: "Smart Quizzes",
        desc: "AI generates personalized quizzes based on your weak areas and history.",
        color: "#e8a020",
        bg: "rgba(232,160,32,0.08)",
        border: "rgba(232,160,32,0.2)",
        tag: "Adaptive",
        tagColor: "#e8a020",
        tagBg: "rgba(232,160,32,0.1)",
        action: "Take Quiz →",
    },
    {
        icon: "▶️",
        title: "YouTube Picks",
        desc: "Smart video recommendations based on your topic and weak areas.",
        color: "#ef4444",
        bg: "rgba(239,68,68,0.08)",
        border: "rgba(239,68,68,0.2)",
        tag: "Smart",
        tagColor: "#ef4444",
        tagBg: "rgba(239,68,68,0.1)",
        action: "Watch Videos →",
    },
]

const recentActivity = [
    { icon: "🤖", text: "Asked about Photosynthesis", time: "2 hrs ago", color: "#d4500a" },
    { icon: "📝", text: "Uploaded Chemistry Notes", time: "Yesterday", color: "#3b82f6" },
    { icon: "🎯", text: "Completed Physics Quiz", time: "2 days ago", color: "#22c55e" },
    { icon: "🧠", text: "Generated Mind Map — Math", time: "3 days ago", color: "#a855f7" },
]

export default function Dashboard() {
    const [activeFeature, setActiveFeature] = useState(null)

    return (
        <div style={s.page}>

            {/* ── Welcome Header ── */}
            <div style={s.welcome}>
                <div>
                    <div style={s.welcomeTag}>🌅 Good Morning</div>
                    <h1 style={s.welcomeTitle}>
                        Welcome back, <span style={{ color: "#d4500a" }}>Anjali!</span> 👋
                    </h1>
                    <p style={s.welcomeSub}>
                        You're on a <strong style={{ color: "#e8a020" }}>7-day streak</strong> 🔥 — keep it going today!
                    </p>
                </div>
                <button style={s.startBtn}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#b03500"; e.currentTarget.style.transform = "translateY(-2px)" }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#d4500a"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                    🤖 Ask AI Tutor
                </button>
            </div>

            {/* ── Stats Cards ── */}
            <div style={s.statsGrid}>
                {stats.map((stat, i) => (
                    <div key={i} style={s.statCard}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)" }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
                    >
                        <div style={{ ...s.statIcon, background: stat.color + "15" }}>{stat.icon}</div>
                        <div style={{ ...s.statValue, color: stat.color }}>{stat.value}</div>
                        <div style={s.statLabel}>{stat.label}</div>
                        <div style={s.statSub}>{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* ── Main Grid: Features + Activity ── */}
            <div style={s.mainGrid}>

                {/* Features */}
                <div style={s.featuresSection}>
                    <div style={s.sectionHeader}>
                        <h2 style={s.sectionTitle}>✨ Your Study Tools</h2>
                        <span style={s.sectionSub}>Click any tool to get started</span>
                    </div>

                    <div style={s.featuresGrid}>
                        {features.map((f, i) => (
                            <div
                                key={i}
                                style={{
                                    ...s.featureCard,
                                    background: activeFeature === i ? f.bg : "#ffffff",
                                    borderColor: activeFeature === i ? f.border : "#e8e0d5",
                                    transform: activeFeature === i ? "translateY(-3px)" : "translateY(0)",
                                    boxShadow: activeFeature === i ? `0 8px 24px ${f.color}18` : "none",
                                }}
                                onMouseEnter={() => setActiveFeature(i)}
                                onMouseLeave={() => setActiveFeature(null)}
                            >
                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                                    <div style={{ ...s.featureIcon, background: f.bg }}>{f.icon}</div>
                                    <span style={{ ...s.featureTag, background: f.tagBg, color: f.tagColor }}>
                                        {f.tag}
                                    </span>
                                </div>
                                <h3 style={s.featureTitle}>{f.title}</h3>
                                <p style={s.featureDesc}>{f.desc}</p>
                                <div style={{ ...s.featureAction, color: f.color, opacity: activeFeature === i ? 1 : 0 }}>
                                    {f.action}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div style={s.rightCol}>

                    {/* Today's Goal */}
                    <div style={s.goalCard}>
                        <div style={s.goalHeader}>
                            <span style={s.goalTitle}>🎯 Today's Goal</span>
                            <span style={s.goalPercent}>65%</span>
                        </div>
                        <div style={s.progressBg}>
                            <div style={s.progressFill}></div>
                        </div>
                        <p style={s.goalDesc}>Study 2 hours · Complete 1 quiz · Review flashcards</p>
                    </div>

                    {/* Recent Activity */}
                    <div style={s.activityCard}>
                        <h3 style={s.activityTitle}>📋 Recent Activity</h3>
                        <div style={s.activityList}>
                            {recentActivity.map((item, i) => (
                                <div key={i} style={s.activityItem}>
                                    <div style={{ ...s.activityIcon, background: item.color + "15", color: item.color }}>
                                        {item.icon}
                                    </div>
                                    <div style={s.activityInfo}>
                                        <div style={s.activityText}>{item.text}</div>
                                        <div style={s.activityTime}>{item.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Ask */}
                    <div style={s.quickAsk}>
                        <div style={s.qaLabel}>⚡ Quick Ask AI</div>
                        <div style={s.qaInputRow}>
                            <input
                                style={s.qaInput}
                                placeholder="Ask anything..."
                                onFocus={(e) => (e.currentTarget.style.borderColor = "#d4500a")}
                                onBlur={(e) => (e.currentTarget.style.borderColor = "#e8e0d5")}
                            />
                            <button style={s.qaBtn}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#b03500")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "#d4500a")}
                            >
                                →
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

/* ── Styles ── */
const s = {
    page: {
        padding: "36px 44px",
        background: "#faf7f2",
        minHeight: "100vh",
        fontFamily: "'Bricolage Grotesque', sans-serif",
    },

    /* Welcome */
    welcome: {
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "32px",
        background: "#ffffff",
        border: "1px solid #e8e0d5",
        borderRadius: "16px",
        padding: "28px 32px",
    },
    welcomeTag: {
        fontSize: "0.72rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "1px",
        color: "#8a7e6e", marginBottom: "8px",
    },
    welcomeTitle: {
        fontSize: "1.8rem", fontWeight: 800,
        letterSpacing: "-0.8px", color: "#1a1208",
        lineHeight: 1.2, marginBottom: "6px",
    },
    welcomeSub: {
        fontSize: "0.9rem", color: "#8a7e6e", fontWeight: 400,
    },
    startBtn: {
        background: "#d4500a", color: "white",
        border: "none", borderRadius: "12px",
        padding: "14px 28px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.92rem", fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.2s, transform 0.2s",
        whiteSpace: "nowrap",
        boxShadow: "0 4px 16px rgba(212,80,10,0.25)",
    },

    /* Stats */
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "32px",
    },
    statCard: {
        background: "#ffffff",
        border: "1px solid #e8e0d5",
        borderRadius: "14px",
        padding: "20px",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
    },
    statIcon: {
        width: "40px", height: "40px",
        borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.1rem", marginBottom: "12px",
    },
    statValue: {
        fontSize: "2rem", fontWeight: 800,
        letterSpacing: "-1px", lineHeight: 1,
        marginBottom: "4px",
    },
    statLabel: {
        fontSize: "0.82rem", fontWeight: 600,
        color: "#1a1208", marginBottom: "2px",
    },
    statSub: {
        fontSize: "0.72rem", color: "#8a7e6e",
    },

    /* Main grid */
    mainGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 300px",
        gap: "24px",
    },

    /* Features section */
    featuresSection: {},
    sectionHeader: {
        display: "flex", alignItems: "baseline",
        gap: "12px", marginBottom: "16px",
    },
    sectionTitle: {
        fontSize: "1rem", fontWeight: 700,
        color: "#1a1208", letterSpacing: "-0.3px",
    },
    sectionSub: {
        fontSize: "0.78rem", color: "#8a7e6e",
    },
    featuresGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "14px",
    },
    featureCard: {
        border: "1px solid",
        borderRadius: "14px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    featureIcon: {
        width: "40px", height: "40px",
        borderRadius: "10px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.1rem",
    },
    featureTag: {
        fontSize: "0.62rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.5px",
        padding: "3px 9px", borderRadius: "100px",
    },
    featureTitle: {
        fontSize: "0.88rem", fontWeight: 700,
        color: "#1a1208", marginBottom: "6px",
        letterSpacing: "-0.2px",
    },
    featureDesc: {
        fontSize: "0.78rem", color: "#8a7e6e",
        lineHeight: 1.6, marginBottom: "10px",
    },
    featureAction: {
        fontSize: "0.78rem", fontWeight: 700,
        transition: "opacity 0.2s",
    },

    /* Right column */
    rightCol: {
        display: "flex", flexDirection: "column", gap: "16px",
    },

    /* Goal card */
    goalCard: {
        background: "#ffffff",
        border: "1px solid #e8e0d5",
        borderRadius: "14px",
        padding: "20px",
    },
    goalHeader: {
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "12px",
    },
    goalTitle: {
        fontSize: "0.88rem", fontWeight: 700, color: "#1a1208",
    },
    goalPercent: {
        fontSize: "1rem", fontWeight: 800,
        color: "#d4500a",
    },
    progressBg: {
        height: "8px", background: "#f3ede4",
        borderRadius: "100px", marginBottom: "10px",
        overflow: "hidden",
    },
    progressFill: {
        height: "100%", width: "65%",
        background: "linear-gradient(90deg, #d4500a, #e8a020)",
        borderRadius: "100px",
    },
    goalDesc: {
        fontSize: "0.75rem", color: "#8a7e6e", lineHeight: 1.6,
    },

    /* Activity */
    activityCard: {
        background: "#ffffff",
        border: "1px solid #e8e0d5",
        borderRadius: "14px",
        padding: "20px",
    },
    activityTitle: {
        fontSize: "0.88rem", fontWeight: 700,
        color: "#1a1208", marginBottom: "14px",
    },
    activityList: { display: "flex", flexDirection: "column", gap: "12px" },
    activityItem: { display: "flex", gap: "10px", alignItems: "center" },
    activityIcon: {
        width: "32px", height: "32px",
        borderRadius: "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.85rem", flexShrink: 0,
    },
    activityInfo: { flex: 1 },
    activityText: {
        fontSize: "0.78rem", fontWeight: 500,
        color: "#1a1208", lineHeight: 1.3,
    },
    activityTime: {
        fontSize: "0.68rem", color: "#8a7e6e", marginTop: "2px",
    },

    /* Quick Ask */
    quickAsk: {
        background: "#1a1208",
        borderRadius: "14px",
        padding: "18px",
    },
    qaLabel: {
        fontSize: "0.75rem", fontWeight: 700,
        color: "rgba(255,255,255,0.5)",
        marginBottom: "10px",
        textTransform: "uppercase", letterSpacing: "0.8px",
    },
    qaInputRow: {
        display: "flex", gap: "8px",
    },
    qaInput: {
        flex: 1,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
        padding: "10px 12px",
        color: "white",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.82rem",
        outline: "none",
        transition: "border-color 0.2s",
    },
    qaBtn: {
        background: "#d4500a",
        color: "white",
        border: "none",
        borderRadius: "8px",
        width: "38px",
        fontWeight: 700, fontSize: "1rem",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
    },
}
