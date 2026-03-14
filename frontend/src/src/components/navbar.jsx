function Navbar() {
    return (
        <nav style={styles.nav}>
            <ul style={styles.links}>
                <li><a href="#how" style={styles.link}>How it works</a></li>
                <li><a href="#cta" style={styles.link}>Pricing</a></li>
                <li><a href="#about" style={styles.link}>About</a></li>
            </ul>
            <div style={styles.actions}>
                <button
                    style={styles.ghost}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1a1208")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d4c9b8")}
                >
                    Log in
                </button>
                <button
                    style={styles.dark}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#d4500a")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1208")}
                >
                    Get Started →
                </button>
            </div>
        </nav>
    )
}

const styles = {
    nav: {
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,247,242,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e8e0d5",
        padding: "15px 44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    links: {
        display: "flex", gap: "28px",
        listStyle: "none",
    },
    link: {
        textDecoration: "none",
        color: "#8a7e6e",
        fontSize: "0.85rem", fontWeight: 500,
    },
    actions: { display: "flex", gap: "10px" },
    ghost: {
        background: "none",
        border: "1.5px solid #d4c9b8",
        color: "#3d3525",
        padding: "8px 18px",
        borderRadius: "8px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.82rem", fontWeight: 500,
        cursor: "pointer",
        transition: "border-color 0.2s",
    },
    dark: {
        background: "#1a1208",
        color: "#faf7f2",
        padding: "8px 20px",
        borderRadius: "8px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.82rem", fontWeight: 700,
        border: "none", cursor: "pointer",
        transition: "background 0.2s",
    },
}

export default Navbar