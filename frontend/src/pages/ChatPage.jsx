import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { sendMessage, getHistory, createChat } from "../api/chat"
import axios from "../api/axios"

const suggestions = [
    "Explain Photosynthesis simply",
    "What is Newton's 3rd Law?",
    "Summarize World War 2",
    "How does RAM work?",
]

const defaultWelcome = {
    role: "ai",
    text: "Hi! 👋 I'm your BrainSpark AI Tutor powered by Gemini! Ask me anything — any subject, any topic!",
    time: "Just now",
}

export default function ChatPage() {
    const [messages, setMessages] = useState([defaultWelcome])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [chatId, setChatId] = useState(null)
    const [history, setHistory] = useState([])
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await getHistory();
            if (data.chats) {
                setHistory(data.chats);
                if (data.chats.length > 0 && !chatId) {
                    loadChat(data.chats[0]);
                }
            }
        } catch (err) {
            console.error("Failed to load history", err);
        }
    };

    const loadChat = (chat) => {
        setChatId(chat._id);
        if (chat.messages && chat.messages.length > 0) {
            const formatted = chat.messages.map(m => ({
                role: m.role,
                text: m.content,
                time: new Date(m.time || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));
            setMessages(formatted);
        } else {
            setMessages([defaultWelcome]);
        }
    };

    const startNewChat = async () => {
        setMessages([defaultWelcome]);
        setChatId(null);
        try {
            const res = await createChat('New Chat', 'General');
            setChatId(res.chat._id);
            loadHistory();
        } catch (err) {
            console.error('Failed to create new chat', err);
        }
    };

    const send = async (text) => {
        const msg = text || input.trim()
        if (!msg || loading) return

        const newMessages = [
            ...messages,
            { role: "user", text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        ];
        
        setMessages(newMessages);
        setInput("")
        setLoading(true)
        setError(null)

        try {
            const data = await sendMessage(msg, chatId)
            if (data.chatId && !chatId) {
                setChatId(data.chatId);
            }
            
            setMessages((prev) => [
                ...prev,
                { role: "ai", text: data.reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            ])
            
            // Refresh history to update sidebar titles
            loadHistory();
        } catch (err) {
            setError("Something went wrong! Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const deleteChat = async (id, e) => {
        e.stopPropagation();
        try {
            // Wait, we don't have a deleteChat API function exported in chat.js
            // Let's call axios directly if needed, or just remove locally for now.
            await axios.delete(`/chat/${id}`);
            if (chatId === id) {
                setMessages([defaultWelcome]);
                setChatId(null);
            }
            loadHistory();
        } catch (err) {
            console.error("Failed to delete chat", err);
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
            {/* Left Sidebar */}
            <div style={s.sidebar}>
                <div style={s.sidebarHeader}>
                    <Link to="/dashboard" style={s.backBtn}>← Dashboard</Link>
                    <button style={s.newChatBtn} onClick={startNewChat}>+ New Chat</button>
                </div>
                <div style={s.historyList}>
                    {history.length === 0 && <div style={s.emptyHistory}>No previous chats</div>}
                    {history.map(chat => (
                        <div 
                            key={chat._id} 
                            style={{
                                ...s.historyItem,
                                ...(chat._id === chatId ? s.historyItemActive : {})
                            }}
                            onClick={() => loadChat(chat)}
                        >
                            <div style={s.historyTitle}>{chat.title || 'Conversation'}</div>
                            <button 
                                style={s.deleteBtn} 
                                onClick={(e) => deleteChat(chat._id, e)}
                                title="Delete chat"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div style={s.mainArea}>
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
        </div>
    )
}

const s = {
    page: {
        display: "flex",
        height: "100vh",
        backgroundColor: "#fcfaf8",
        color: "#1a1208",
        fontFamily: "'Inter', sans-serif",
    },
    sidebar: {
        width: "250px",
        backgroundColor: "#12100c",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #2a251e",
    },
    sidebarHeader: {
        padding: "1.5rem 1rem",
        borderBottom: "1px solid #2a251e",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    backBtn: {
        color: "#a3998f",
        textDecoration: "none",
        fontSize: "0.9rem",
        fontWeight: "500",
    },
    newChatBtn: {
        backgroundColor: "#d4500a",
        color: "#fff",
        border: "none",
        padding: "0.8rem",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.2s",
    },
    historyList: {
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    emptyHistory: {
        color: "#6b6255",
        fontSize: "0.9rem",
        textAlign: "center",
        marginTop: "2rem",
    },
    historyItem: {
        padding: "0.8rem",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "background-color 0.2s",
        color: "#e8e0d5",
    },
    historyItemActive: {
        backgroundColor: "rgba(212, 80, 10, 0.15)", // Light orange background
        color: "#d4500a", // Orange text
        fontWeight: "600",
        borderRight: "3px solid #d4500a", // Orange accent border
    },
    historyTitle: {
        fontSize: "0.9rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "150px",
    },
    deleteBtn: {
        background: "transparent",
        border: "none",
        color: "#8a7e6e",
        cursor: "pointer",
        fontSize: "1.2rem",
        lineHeight: 1,
        padding: "0 0.2rem",
    },
    mainArea: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
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
