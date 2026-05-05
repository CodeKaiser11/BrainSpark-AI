function Footer() {
    const links = ["Privacy", "Terms", "GitHub", "Contact"]

    return (
        <footer style={styles.footer}>
            <div style={styles.logo}>
                🧠 BrainSpark <span style={{ color: "#d4500a" }}>AI</span>
            </div>
            <p style={styles.copy}>© 2025 BrainSpark AI — Built with ❤️ by Anjali</p>
            <div style={styles.links}>
                {links.map((l) => (
                    <a
                        key={l}
                        href="#"
                        style={styles.link}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1208")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#8a7e6e")}
                    >
                        {l}
                    </a>
                ))}
            </div>
        </footer>
    )
}

const styles = {
    footer: {
        padding: "24px 44px",
        borderTop: "1px solid #e8e0d5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logo: {
        fontSize: "0.95rem",
        fontWeight: 700,
        color: "#1a1208",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    copy: {
        fontSize: "0.75rem",
        color: "#8a7e6e",
    },
    links: { display: "flex", gap: "22px" },
    link: {
        fontSize: "0.75rem",
        color: "#8a7e6e",
        textDecoration: "none",
        transition: "color 0.2s",
    },
}

export default Footer