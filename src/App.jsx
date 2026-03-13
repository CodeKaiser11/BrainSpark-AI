import { useState } from "react"
import Sidebar from "./components/sidebar"
import Navbar from "./components/navbar"
import Hero from "./components/hero"
import Stats from "./components/stats"
import HowItWorks from "./components/working"
import CTA from "./components/cta"
import Footer from "./components/footer"
import Dashboard from "./pages/dashboard"
import ChatPage from "./pages/chatbot"

export default function App() {
    const [page, setPage] = useState("landing")

    return (
        <div style={styles.shell}>

            {/* ── LANDING PAGE ── */}
            {page === "landing" && (
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={styles.landingNav}>
                        <div style={styles.navLogo}>
                            <div style={styles.navLogoIcon}>🧠</div>
                            <span style={styles.navLogoText}>
                                BrainSpark <span style={{ color: "#d4500a" }}>AI</span>
                            </span>
                        </div>
                        <div style={styles.navActions}>
                            <button style={styles.ghostBtn} onClick={() => setPage("dashboard")}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1a1208")}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d4c9b8")}
                            >Dashboard</button>
                            <button style={styles.solidBtn} onClick={() => setPage("chat")}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#d4500a")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1208")}
                            >Try AI Tutor →</button>
                        </div>
                    </div>
                    <Hero />
                    <Stats />
                    <HowItWorks />
                    <CTA />
                    <Footer />
                </div>
            )}

            {/* ── APP PAGES (Dashboard / Chat) ── */}
            {(page === "dashboard" || page === "chat") && (
                <>
                    <AppSidebar currentPage={page} onNavigate={setPage} />
                    <main style={styles.main}>
                        <AppTopbar currentPage={page} onNavigate={setPage} />
                        {page === "dashboard" && <Dashboard />}
                        {page === "chat" && <ChatPage />}
                    </main>
                </>
            )}

        </div>
    )
}

/* ══ Sidebar ══ */
function AppSidebar({ currentPage, onNavigate }) {
    const sections = [
        {
            label: "Core",
            items: [
                { icon: "🏠", name: "Dashboard", desc: "Overview & stats", page: "dashboard" },
                { icon: "🤖", name: "AI Tutor Chat", desc: "Ask anything", page: "chat" },
                { icon: "📸", name: "Snap & Solve", desc: "Photo → solution", page: null, tag: "Phase 4" },
            ],
        },
        {
            label: "Study Tools",
            items: [
                { icon: "🧠", name: "AI Mind Maps", desc: "Visual explorer", page: null, tag: "Phase 6" },
                { icon: "📝", name: "Notes Generator", desc: "Upload → AI notes", page: null, tag: "Phase 5" },
                { icon: "🎯", name: "Smart Quizzes", desc: "Adaptive AI quizzes", page: null, tag: "Phase 6" },
                { icon: "🃏", name: "Flashcards", desc: "Spaced repetition", page: null, tag: "Phase 6" },
            ],
        },
        {
            label: "Discover",
            items: [
                { icon: "▶️", name: "YouTube Picks", desc: "Smart video recs", page: null, tag: "Phase 5" },
                { icon: "📅", name: "Study Planner", desc: "AI schedule", page: null, tag: "Phase 5" },
                { icon: "🔥", name: "Streak & Badges", desc: "Stay motivated", page: null, tag: "Phase 7" },
            ],
        },
    ]

    return (
        <aside style={sb.sidebar}>
            <div style={sb.logo}>
                <div style={sb.logoIcon}>🧠</div>
                <div>
                    <div style={sb.logoText}>BrainSpark <span style={{ color: "#d4500a" }}>AI</span></div>
                    <div style={sb.logoSub}>Intelligent Study Assistant</div>
                </div>
            </div>

            {sections.map((section) => (
                <div key={section.label}>
                    <div style={sb.sLabel}>{section.label}</div>
                    {section.items.map((item) => {
                        const active = item.page === currentPage
                        return (
                            <div key={item.name}
                                style={{
                                    ...sb.item,
                                    background: active ? "rgba(212,80,10,0.18)" : "transparent",
                                    borderLeft: active ? "3px solid #d4500a" : "3px solid transparent",
                                    cursor: item.page ? "pointer" : "not-allowed",
                                    opacity: item.page ? 1 : 0.45,
                                }}
                                onClick={() => item.page && onNavigate(item.page)}
                                onMouseEnter={(e) => { if (item.page && !active) e.currentTarget.style.background = "rgba(255,255,255,0.05)" }}
                                onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent" }}
                            >
                                <div style={sb.icon}>{item.icon}</div>
                                <div style={sb.info}>
                                    <div style={{ ...sb.name, color: active ? "#ffb899" : "#f0e8d8" }}>{item.name}</div>
                                    <div style={sb.desc}>{item.desc}</div>
                                </div>
                                {item.tag && <span style={sb.tag}>{item.tag}</span>}
                            </div>
                        )
                    })}
                    <hr style={sb.divider} />
                </div>
            ))}

            <div style={sb.bottom}>
                <button style={sb.cta} onClick={() => onNavigate("landing")}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#b03500")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#d4500a")}
                >🏠 Back to Home</button>
                <div style={sb.ver}>v1.0.0 — beta</div>
            </div>
        </aside>
    )
}

/* ══ Topbar ══ */
function AppTopbar({ currentPage, onNavigate }) {
    const titles = { dashboard: "📊 Dashboard", chat: "🤖 AI Tutor Chat" }
    return (
        <div style={tb.bar}>
            <span style={tb.title}>{titles[currentPage]}</span>
            <div style={tb.actions}>
                <button style={tb.navBtn} onClick={() => onNavigate("dashboard")}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f3ede4")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >Dashboard</button>
                <button style={tb.navBtn} onClick={() => onNavigate("chat")}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f3ede4")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                >Chat</button>
                <button style={tb.solidBtn} onClick={() => onNavigate("landing")}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#d4500a")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1208")}
                >Home →</button>
            </div>
        </div>
    )
}

/* ══ Styles ══ */
const styles = {
    shell: {
        display: "flex", minHeight: "100vh",
        background: "#faf7f2",
        fontFamily: "'Bricolage Grotesque', sans-serif",
    },
    main: { marginLeft: "256px", flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
    landingNav: {
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,247,242,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e8e0d5", padding: "15px 44px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
    },
    navLogo: { display: "flex", alignItems: "center", gap: "10px" },
    navLogoIcon: {
        width: "36px", height: "36px", borderRadius: "9px",
        background: "linear-gradient(135deg,#d4500a,#e8a020)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
    },
    navLogoText: { fontSize: "1rem", fontWeight: 700, color: "#1a1208" },
    navActions: { display: "flex", gap: "10px" },
    ghostBtn: {
        background: "none", border: "1.5px solid #d4c9b8", color: "#3d3525",
        padding: "8px 18px", borderRadius: "8px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "border-color 0.2s",
    },
    solidBtn: {
        background: "#1a1208", color: "#faf7f2", padding: "8px 20px", borderRadius: "8px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.82rem", fontWeight: 700, border: "none", cursor: "pointer", transition: "background 0.2s",
    },
}

const sb = {
    sidebar: {
        width: "256px", minHeight: "100vh", background: "#12100c",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 200,
        display: "flex", flexDirection: "column", paddingBottom: "24px",
        overflowY: "auto", borderRight: "1px solid rgba(255,255,255,0.05)",
    },
    logo: {
        padding: "22px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px",
    },
    logoIcon: {
        width: "36px", height: "36px", borderRadius: "9px",
        background: "linear-gradient(135deg,#d4500a,#e8a020)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1rem", flexShrink: 0,
    },
    logoText: { fontSize: "1rem", fontWeight: 700, color: "#f0e8d8" },
    logoSub: { fontSize: "0.63rem", color: "#6a6050", marginTop: "2px" },
    sLabel: {
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
        textTransform: "uppercase", letterSpacing: "1.5px",
        color: "#6a6050", padding: "14px 20px 6px",
    },
    item: {
        display: "flex", alignItems: "center", gap: "11px",
        padding: "9px 20px", transition: "background 0.18s", position: "relative",
    },
    icon: {
        width: "30px", height: "30px", borderRadius: "7px",
        background: "rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.88rem", flexShrink: 0,
    },
    info: { flex: 1, minWidth: 0 },
    name: { fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.2 },
    desc: { fontSize: "0.68rem", color: "#6a6050", marginTop: "1px" },
    tag: {
        fontSize: "0.58rem", fontWeight: 700, padding: "2px 7px", borderRadius: "100px",
        background: "rgba(255,255,255,0.07)", color: "#6a6050", flexShrink: 0,
    },
    divider: { border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "6px 0" },
    bottom: {
        marginTop: "auto", padding: "16px 20px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    cta: {
        width: "100%", background: "#d4500a", color: "white",
        border: "none", borderRadius: "9px", padding: "11px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "background 0.2s",
    },
    ver: {
        textAlign: "center", fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.62rem", color: "#6a6050", marginTop: "10px",
    },
}

const tb = {
    bar: {
        background: "rgba(250,247,242,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e8e0d5", padding: "13px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, flexShrink: 0,
    },
    title: { fontSize: "0.95rem", fontWeight: 700, color: "#1a1208" },
    actions: { display: "flex", gap: "8px", alignItems: "center" },
    navBtn: {
        background: "none", border: "none", color: "#8a7e6e", padding: "6px 12px",
        borderRadius: "7px", cursor: "pointer",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.8rem", fontWeight: 500, transition: "background 0.2s",
    },
    solidBtn: {
        background: "#1a1208", color: "#faf7f2", padding: "7px 16px", borderRadius: "8px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.8rem", fontWeight: 700, border: "none", cursor: "pointer", transition: "background 0.2s",
    },
}