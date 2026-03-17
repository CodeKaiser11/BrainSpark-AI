const stats = [
    { num: "50", suffix: "K+", label: "Students Learning" },
    { num: "2", suffix: "M+", label: "Questions Answered" },
    { num: "98", suffix: "%", label: "Satisfaction Rate" },
    { num: "40", suffix: "+", label: "Subjects Covered" },
]

function Stats() {
    return (
        <div style={styles.grid}>
            {stats.map((s, i) => (
                <div key={i} style={{
                    ...styles.item,
                    borderRight: i < stats.length - 1 ? "1px solid #e8e0d5" : "none",
                }}>
                    <div style={styles.num}>
                        {s.num}<span style={styles.accent}>{s.suffix}</span>
                    </div>
                    <div style={styles.label}>{s.label}</div>
                </div>
            ))}
        </div>
    )
}

const styles = {
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid #e8e0d5",
        borderBottom: "1px solid #e8e0d5",
    },
    item: {
        padding: "28px 44px",
    },
    num: {
        fontSize: "2rem", fontWeight: 800,
        letterSpacing: "-1.5px",
        color: "#1a1208", lineHeight: 1,
    },
    accent: { color: "#d4500a" },
    label: {
        fontSize: "0.78rem",
        color: "#8a7e6e",
        marginTop: "5px",
    },
}

export default Stats