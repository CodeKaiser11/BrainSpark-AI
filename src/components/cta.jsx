function CTA() {
    return (
        <section style={styles.section} id="cta">

            {/* Left */}
            <div style={styles.left}>
                <h2 style={styles.title}>Ready to spark<br />your learning?</h2>
                <p style={styles.desc}>
                    Join thousands of students already studying smarter with BrainSpark AI.
                    Free forever, no credit card needed.
                </p>
            </div>

            {/* Right — Signup box */}
            <div style={styles.right}>
                <p style={styles.boxLabel}>Get early access — it's free</p>
                <div style={styles.inputs}>
                    <input
                        type="text"
                        placeholder="Your name"
                        style={styles.input}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#d4500a")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <input
                        type="email"
                        placeholder="Your email address"
                        style={styles.input}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#d4500a")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <button
                        style={styles.btn}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#b03500")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#d4500a")}
                    >
                        Get Early Access →
                    </button>
                </div>
                <p style={styles.note}>No spam. Unsubscribe anytime.</p>
            </div>

        </section>
    )
}

const styles = {
    section: {
        padding: "72px 44px",
        display: "flex",
        gap: "48px",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #e8e0d5",
    },
    left: { flex: 1 },
    title: {
        fontSize: "clamp(1.7rem, 3vw, 2.8rem)",
        fontWeight: 800,
        letterSpacing: "-1.5px",
        color: "#1a1208",
        lineHeight: 1.1,
        marginBottom: "12px",
        maxWidth: "420px",
    },
    desc: {
        fontSize: "0.88rem",
        color: "#8a7e6e",
        lineHeight: 1.7,
        maxWidth: "360px",
    },
    right: {
        flexShrink: 0,
        background: "#1a1208",
        borderRadius: "14px",
        padding: "28px",
        minWidth: "300px",
    },
    boxLabel: {
        fontSize: "0.75rem",
        color: "rgba(255,255,255,0.4)",
        marginBottom: "13px",
    },
    inputs: {
        display: "flex",
        flexDirection: "column",
        gap: "9px",
    },
    input: {
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px",
        padding: "11px 13px",
        color: "white",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.85rem",
        outline: "none",
        transition: "border-color 0.2s",
    },
    btn: {
        background: "#d4500a",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "12px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.85rem",
        fontWeight: 700,
        cursor: "pointer",
        transition: "background 0.2s",
    },
    note: {
        textAlign: "center",
        fontSize: "0.68rem",
        color: "rgba(255,255,255,0.25)",
        marginTop: "8px",
    },
}

export default CTA