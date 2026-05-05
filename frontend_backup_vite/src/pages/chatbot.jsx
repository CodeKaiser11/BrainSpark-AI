import { useState, useRef, useEffect } from "react"
import { sendMessage } from "../api/chat"

const suggestions = [
    "Explain Photosynthesis simply",
    "What is Newton's 3rd Law?",
    "Summarize World War 2",
    "How does RAM work?",
]

const initialMessages = [
    {
        role: "ai",
        text: "Hi Anjali! 👋 I'm your BrainSpark AI Tutor powered by Gemini! Ask me anything — any subject, any topic!",
        time: "Just now",
    },
]

export default function ChatPage() {
    const [messages, setMessages] = useState(initialMessages)
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const send = async (text) => {
        const msg = text || input.trim()
        if (!msg || loading) return

        // Add user message
        setMessages((prev) => [
            ...prev,
            { role: "user", text: msg, time: "Just now" },
        ])
        setInput("")
        setLoading(true)
        setError(null)

        try {
            // Real API call!
            const data = await sendMessage(msg)

            setMessages((prev) => [
                ...prev,
                { role: "ai", text: data.reply, time: "Just now" },
            ])
        } catch (err) {
            setError("Something went wrong! Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            send()
        }
    }

    return (
        <div style={s.page}>

            {/* Header */}
            <div style={s.header}>
                <div style={s.headerLeft}>
                    <div style={s.aiAvatar}>🧠</div>
                    <div>
                        <div style={s.aiName}>BrainSpark AI Tutor</div>
                        <div style={s.aiStatus}>
                            <span style={s.statusDot}></span>
                            Online — Gemini Flash 2.0
                        </div>
                    </div>
                </div>
                <button style={s.clearBtn}
                    onClick={() => setMessages(initialMessages)}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1a1208")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e8e0d5")}
                >
                    🗑️ Clear Chat
                </button>
            </div>

            {/* Messages */}
            <div style={s.messages}>

                {/* Suggestions */}
                {messages.length === 1 && (
                    <div style={s.suggestions}>
                        <div style={s.suggestLabel}>💡 Try asking:</div>
                        <div style={s.suggestGrid}>
                            {suggestions.map((s_, i) => (
                                <button key={i} style={s.suggestBtn}
                                    onClick={() => send(s_)}
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

                {/* Message Bubbles */}
                {messages.map((msg, i) => (
                    <div key={i} style={{
                        ...s.msgRow,
                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    }}>
                        {msg.role === "ai" && <div style={s.msgAvatar}>🧠</div>}
                        <div style={{
                            ...s.bubble,
                            ...(msg.role === "user" ? s.userBubble : s.aiBubble),
                        }}>
                            {msg.text}
                            <div style={s.msgTime}>{msg.time}</div>
                        </div>
                    </div>
                ))}

                {loading && (
                    <div style={s.msgRow}>
                        <div style={s.msgAvatar}>🧠</div>
                        <div style={{ ...s.bubble, ...s.aiBubble }}>
                            <div style={s.loadingDots}>•••</div>
                        </div>
                    </div>
                )}

                {error && (
                    <div style={s.errorBanner}>
                        {error}
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div style={s.inputArea}>
                <div style={s.inputWrapper}>
                    <input
                        style={s.input}
                        placeholder="Type your question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                    />
                    <button style={s.sendBtn} onClick={() => send()}>
                        Send ✨
                    </button>
                </div>
            </div>
        </div>
    )
}

const s = {
    page: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#fcfaf8",
        color: "#1a1208",
        fontFamily: "'Inter', sans-serif",
    },
    header: {
        padding: "1rem 2rem",
        borderBottom: "1px solid #e8e0d5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    headerLeft: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },
    aiAvatar: {
        fontSize: "1.5rem",
        backgroundColor: "#fff5f0",
        padding: "0.5rem",
        borderRadius: "12px",
        border: "1px solid #ffccb3",
    },
    aiName: {
        fontWeight: "700",
        fontSize: "1.1rem",
    },
    aiStatus: {
        fontSize: "0.85rem",
        color: "#8a7e6e",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
    },
    statusDot: {
        width: "8px",
        height: "8px",
        backgroundColor: "#22c55e",
        borderRadius: "50%",
    },
    clearBtn: {
        padding: "0.6rem 1rem",
        borderRadius: "10px",
        border: "1px solid #e8e0d5",
        backgroundColor: "transparent",
        color: "#8a7e6e",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.2s",
    },
    messages: {
        flex: 1,
        overflowY: "auto",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    suggestions: {
        textAlign: "center",
        padding: "2rem 0",
    },
    suggestLabel: {
        color: "#8a7e6e",
        marginBottom: "1rem",
        fontSize: "0.95rem",
    },
    suggestGrid: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.8rem",
        justifyContent: "center",
    },
    suggestBtn: {
        padding: "0.8rem 1.2rem",
        borderRadius: "15px",
        border: "1px solid #e8e0d5",
        backgroundColor: "#fff",
        color: "#8a7e6e",
        cursor: "pointer",
        fontSize: "0.95rem",
        transition: "all 0.2s",
    },
    msgRow: {
        display: "flex",
        gap: "0.8rem",
        alignItems: "flex-end",
    },
    msgAvatar: {
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff5f0",
        borderRadius: "8px",
        border: "1px solid #ffccb3",
        fontSize: "1.1rem",
    },
    bubble: {
        maxWidth: "70%",
        padding: "0.9rem 1.2rem",
        borderRadius: "20px",
        fontSize: "1rem",
        lineHeight: "1.5",
        position: "relative",
    },
    aiBubble: {
        backgroundColor: "#fff",
        border: "1px solid #e8e0d5",
        color: "#1a1208",
        borderBottomLeftRadius: "4px",
    },
    userBubble: {
        backgroundColor: "#d4500a",
        color: "#fff",
        borderBottomRightRadius: "4px",
    },
    msgTime: {
        fontSize: "0.75rem",
        marginTop: "0.4rem",
        opacity: 0.7,
    },
    loadingDots: {
        letterSpacing: "2px",
    },
    errorBanner: {
        padding: "0.8rem",
        backgroundColor: "#fee2e2",
        color: "#dc2626",
        borderRadius: "10px",
        textAlign: "center",
        fontSize: "0.9rem",
    },
    inputArea: {
        padding: "1.5rem 2rem",
        backgroundColor: "#fff",
        borderTop: "1px solid #e8e0d5",
    },
    inputWrapper: {
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
    },
    input: {
        flex: 1,
        padding: "1rem 1.5rem",
        borderRadius: "15px",
        border: "1px solid #e8e0d5",
        fontSize: "1rem",
        outline: "none",
        transition: "border-color 0.2s",
    },
    sendBtn: {
        padding: "1rem 2rem",
        borderRadius: "15px",
        backgroundColor: "#d4500a",
        color: "#fff",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform 0.1s, background-color 0.2s",
    },
}