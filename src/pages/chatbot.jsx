import { useState, useRef, useEffect } from "react"

const suggestions = [
    "Explain Photosynthesis simply",
    "What is Newton's 3rd Law?",
    "Summarize World War 2",
    "How does RAM work?",
]

const initialMessages = [
    {
        role: "ai",
        text: "Hi Anjali! 👋 I'm your BrainSpark AI Tutor. Ask me anything — any subject, any topic. I'll explain it clearly!",
        time: "Just now",
    },
]

export default function ChatPage() {
    const [messages, setMessages] = useState(initialMessages)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const sendMessage = async (text) => {
        const msg = text || input.trim()
        if (!msg) return

        // Add user message
        setMessages((prev) => [
            ...prev,
            { role: "user", text: msg, time: "Just now" },
        ])
        setInput("")
        setLoading(true)

        // Simulate AI response (will connect to real API in Phase 4)
        await new Promise((r) => setTimeout(r, 1500))

        setMessages((prev) => [
            ...prev,
            {
                role: "ai",
                text: `Great question about "${msg}"! 🧠\n\nThis is where GPT-4 will answer you in Phase 4 when we connect the OpenAI API. For now, I'm a demo — but soon I'll give you real, detailed explanations for anything you ask!`,
                time: "Just now",
            },
        ])
        setLoading(false)
    }

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div style={s.page}>

            {/* ── Header ── */}
            <div style={s.header}>
                <div style={s.headerLeft}>
                    <div style={s.aiAvatar}>🧠</div>
                    <div>
                        <div style={s.aiName}>BrainSpark AI Tutor</div>
                        <div style={s.aiStatus}>
                            <span style={s.statusDot}></span>
                            Online — powered by GPT-4
                        </div>
                    </div>
                </div>
                <div style={s.headerRight}>
                    <button style={s.clearBtn}
                        onClick={() => setMessages(initialMessages)}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1a1208")}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e0d5")}
                    >
                        🗑️ Clear Chat
                    </button>
                </div>
            </div>

            {/* ── Messages ── */}
            <div style={s.messages}>

                {/* Suggestions — show only at start */}
                {messages.length === 1 && (
                    <div style={s.suggestions}>
                        <div style={s.suggestLabel}>💡 Try asking:</div>
                        <div style={s.suggestGrid}>
                            {suggestions.map((s_, i) => (
                                <button
                                    key={i}
                                    style={s.suggestBtn}
                                    onClick={() => sendMessage(s_)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "#d4500a"
                                        e.currentTarget.style.color = "#d4500a"
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "#e8e0d5"
                                        e.currentTarget.style.color = "#8a7e6e"
                                    }}
                                >
                                    {s_}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Message bubbles */}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        style={{
                            ...s.msgRow,
                            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                        }}
                    >
                        {msg.role === "ai" && (
                            <div style={s.msgAvatar}>🧠</div>
                        )}

                        <div style={{
                            ...s.bubble,
                            ...(msg.role === "user" ? s.userBubble : s.aiBubble),
                        }}>
                            {msg.role === "ai" && (
                                <div style={s.aiLabel}>✦ BrainSpark AI</div>
                            )}
                            <div style={s.msgText}>
                                {msg.text.split("\n").map((line, j) => (
                                    <span key={j}>{line}<br /></span>
                                ))}
                            </div>
                            <div style={s.msgTime}>{msg.time}</div>
                        </div>

                        {msg.role === "user" && (
                            <div style={s.userAvatar}>👩</div>
                        )}
                    </div>
                ))}

                {/* Loading dots */}
                {loading && (
                    <div style={{ ...s.msgRow, justifyContent: "flex-start" }}>
                        <div style={s.msgAvatar}>🧠</div>
                        <div style={{ ...s.bubble, ...s.aiBubble }}>
                            <div style={s.aiLabel}>✦ BrainSpark AI</div>
                            <div style={s.typingDots}>
                                <span style={s.dot}></span>
                                <span style={{ ...s.dot, animationDelay: "0.2s" }}></span>
                                <span style={{ ...s.dot, animationDelay: "0.4s" }}></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div style={s.inputArea}>
                <div style={s.inputBox}>
                    <textarea
                        style={s.textarea}
                        placeholder="Ask anything... 'Explain Quantum Physics simply'"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        rows={1}
                        onFocus={(e) => (e.currentTarget.parentElement.style.borderColor = "#d4500a")}
                        onBlur={(e) => (e.currentTarget.parentElement.style.borderColor = "#e8e0d5")}
                    />
                    <button
                        style={{
                            ...s.sendBtn,
                            background: input.trim() ? "#d4500a" : "#e8e0d5",
                            cursor: input.trim() ? "pointer" : "default",
                        }}
                        onClick={() => sendMessage()}
                        disabled={!input.trim()}
                    >
                        ⚡
                    </button>
                </div>
                <div style={s.inputHint}>
                    Press <strong>Enter</strong> to send · <strong>Shift+Enter</strong> for new line · GPT-4 connected in Phase 4
                </div>
            </div>

            <style>{`
        @keyframes bounce {
          0%,100%{opacity:.3;transform:translateY(0)}
          50%{opacity:1;transform:translateY(-4px)}
        }
      `}</style>
        </div>
    )
}

const s = {
    page: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#faf7f2",
        fontFamily: "'Bricolage Grotesque', sans-serif",
    },

    /* Header */
    header: {
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 32px",
        background: "#ffffff",
        borderBottom: "1px solid #e8e0d5",
        flexShrink: 0,
    },
    headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
    aiAvatar: {
        width: "42px", height: "42px",
        background: "linear-gradient(135deg,#d4500a,#e8a020)",
        borderRadius: "12px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.1rem",
    },
    aiName: { fontSize: "0.95rem", fontWeight: 700, color: "#1a1208" },
    aiStatus: {
        fontSize: "0.72rem", color: "#22c55e",
        display: "flex", alignItems: "center", gap: "5px",
        marginTop: "2px",
    },
    statusDot: {
        width: "6px", height: "6px",
        borderRadius: "50%", background: "#22c55e",
        display: "inline-block",
        animation: "pulse 1.5s infinite",
    },
    headerRight: {},
    clearBtn: {
        background: "none",
        border: "1px solid #e8e0d5",
        borderRadius: "8px",
        padding: "7px 14px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.8rem", fontWeight: 500,
        color: "#8a7e6e", cursor: "pointer",
        transition: "border-color 0.2s",
    },

    /* Messages */
    messages: {
        flex: 1, overflowY: "auto",
        padding: "24px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },

    /* Suggestions */
    suggestions: { marginBottom: "8px" },
    suggestLabel: {
        fontSize: "0.75rem", color: "#8a7e6e",
        fontWeight: 600, marginBottom: "10px",
    },
    suggestGrid: {
        display: "flex", flexWrap: "wrap", gap: "8px",
    },
    suggestBtn: {
        background: "#ffffff",
        border: "1px solid #e8e0d5",
        borderRadius: "100px",
        padding: "7px 16px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.8rem", fontWeight: 500,
        color: "#8a7e6e", cursor: "pointer",
        transition: "border-color 0.2s, color 0.2s",
    },

    /* Bubbles */
    msgRow: {
        display: "flex", gap: "10px", alignItems: "flex-end",
    },
    msgAvatar: {
        width: "32px", height: "32px",
        background: "linear-gradient(135deg,#d4500a,#e8a020)",
        borderRadius: "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.85rem", flexShrink: 0,
    },
    userAvatar: {
        width: "32px", height: "32px",
        background: "#f3ede4",
        border: "1px solid #e8e0d5",
        borderRadius: "8px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "0.85rem", flexShrink: 0,
    },
    bubble: {
        maxWidth: "65%",
        borderRadius: "14px",
        padding: "12px 16px",
    },
    aiBubble: {
        background: "#ffffff",
        border: "1px solid #e8e0d5",
        borderBottomLeftRadius: "4px",
    },
    userBubble: {
        background: "#d4500a",
        color: "white",
        borderBottomRightRadius: "4px",
    },
    aiLabel: {
        fontSize: "0.62rem", fontWeight: 700,
        textTransform: "uppercase", letterSpacing: "0.8px",
        color: "#d4500a", marginBottom: "5px",
    },
    msgText: {
        fontSize: "0.88rem",
        lineHeight: 1.65,
        color: "inherit",
    },
    msgTime: {
        fontSize: "0.65rem",
        color: "rgba(255,255,255,0.5)",
        marginTop: "5px",
    },

    /* Typing */
    typingDots: {
        display: "flex", gap: "4px", alignItems: "center",
        padding: "4px 0",
    },
    dot: {
        width: "6px", height: "6px",
        borderRadius: "50%", background: "#d4500a",
        animation: "bounce 1.2s infinite",
        display: "inline-block",
    },

    /* Input area */
    inputArea: {
        padding: "16px 32px 20px",
        background: "#ffffff",
        borderTop: "1px solid #e8e0d5",
        flexShrink: 0,
    },
    inputBox: {
        display: "flex", gap: "10px", alignItems: "center",
        background: "#faf7f2",
        border: "1.5px solid #e8e0d5",
        borderRadius: "12px",
        padding: "8px 8px 8px 16px",
        transition: "border-color 0.2s",
        marginBottom: "8px",
    },
    textarea: {
        flex: 1, background: "none",
        border: "none", outline: "none",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontSize: "0.9rem", color: "#1a1208",
        resize: "none", lineHeight: 1.5,
        maxHeight: "120px",
    },
    sendBtn: {
        width: "38px", height: "38px",
        border: "none", borderRadius: "8px",
        color: "white", fontSize: "1rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
        flexShrink: 0,
    },
    inputHint: {
        fontSize: "0.7rem", color: "#8a7e6e",
        textAlign: "center",
    },
}
