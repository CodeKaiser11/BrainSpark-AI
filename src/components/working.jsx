const steps = [
    {
        num: "01",
        title: "Create Account",
        desc: "Sign up free. No credit card. Access all core features from day one.",
    },
    {
        num: "02",
        title: "Upload Notes",
        desc: "Upload PDFs, images, or paste text. BrainSpark reads and understands it all.",
    },
    {
        num: "03",
        title: "Ask & Explore",
        desc: "Chat with AI, generate mind maps, create flashcards, solve doubts instantly.",
    },
    {
        num: "04",
        title: "Track Progress",
        desc: "Monitor growth, complete quizzes, and maintain your study streak daily.",
    },
]

function HowItWorks() {
    return (
        <section style={styles.section} id="how">
            <div style={styles.eye}>// how_it_works</div>
            <h2 style={styles.title}>Up &amp; running<br />in minutes</h2>
            <p style={styles.body}>
                No complicated setup. Sign up, upload your notes, and start studying smarter today.
            </p>

            <div style={styles.grid}>
                {steps.map((step, i) => (
                    <div
                        key={i}
                        style={{
                            ...styles.step,
                            borderRight: i < steps.length - 1 ? "1px solid #e8e0d5" : "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f3ede4")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                        <div style={styles.stepNum}>{step.num}</div>
                        <h3 style={styles.stepTitle}>{step.title}</h3>
                        <p style={styles.stepDesc}>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

const styles = {
    section: {
        padding: "72px 44px",
        borderBottom: "1px solid #e8e0d5",
    },
    eye: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.68rem",
        textTransform: "uppercase",
        letterSpacing: "2px",
        color: "#d4500a",
        marginBottom: "12px",
    },
    title: {
        fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
        fontWeight: 800,
        letterSpacing: "-1.5px",
        color: "#1a1208",
        lineHeight: 1.1,
        marginBottom: "12px",
    },
    body: {
        fontSize: "0.92rem",
        color: "#8a7e6e",
        maxWidth: "460px",
        lineHeight: 1.75,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        border: "1px solid #e8e0d5",
        borderRadius: "14px",
        overflow: "hidden",
        marginTop: "44px",
    },
    step: {
        padding: "28px 24px",
        transition: "background 0.2s",
        cursor: "default",
    },
    stepNum: {
        fontSize: "2.8rem",
        fontWeight: 800,
        letterSpacing: "-2px",
        color: "#d4c9b8",
        lineHeight: 1,
        marginBottom: "16px",
    },
    stepTitle: {
        fontSize: "0.92rem",
        fontWeight: 700,
        color: "#1a1208",
        marginBottom: "7px",
        letterSpacing: "-0.2px",
    },
    stepDesc: {
        fontSize: "0.8rem",
        color: "#8a7e6e",
        lineHeight: 1.65,
    },
}

export default HowItWorks