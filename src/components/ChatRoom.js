import React, { useEffect, useState, useRef } from "react";
import { Send, MessageCircle, User, Clock, CheckCheck } from 'lucide-react';

// Simulation des dépendances pour la démo
const axios = {
  get: (url) => Promise.resolve({ 
    data: [
      {
        id: 1,
        sender_id: 'user-456',
        message: 'Salut ! Comment ça va ?',
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: 2,
        sender_id: 'user-123',
        message: 'Très bien merci ! Et toi ?',
        timestamp: new Date(Date.now() - 240000).toISOString()
      }
    ]
  }),
  post: (url, data) => Promise.resolve({ data: 'success' })
};

const socket = {
  emit: (event, data) => console.log('Socket emit:', event, data),
  on: (event, callback) => console.log('Socket on:', event),
  off: (event) => console.log('Socket off:', event)
};

const styles = {
  container: {
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0e1229ff 0%, #0a0331ff 25%, #1f2937 50%, #181341ff 75%, #081520ff 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  chatContainer: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '800px',
    width: '100%',
    height: '600px',
    margin: '2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideIn 0.8s ease-out',
  },
  header: {
    padding: '1.5rem 2rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: 'white',
  },
  headerIcon: {
    padding: '0.75rem',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: '0 0 0.25rem 0',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  headerSubtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  messagesContainer: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent',
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0.75rem',
    animation: 'messageSlideIn 0.5s ease-out',
  },
  messageWrapperSent: {
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.8rem',
    fontWeight: '600',
    flexShrink: 0,
  },
  messageAvatarSent: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  },
  messageBubble: {
    maxWidth: '70%',
    padding: '1rem 1.25rem',
    borderRadius: '20px',
    position: 'relative',
    wordWrap: 'break-word',
    transition: 'all 0.3s ease',
  },
  messageReceived: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    color: 'white',
    borderBottomLeftRadius: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  messageSent: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    borderBottomRightRadius: '6px',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
  },
  messageText: {
    fontSize: '1rem',
    lineHeight: '1.4',
    margin: '0',
  },
  messageTime: {
    fontSize: '0.75rem',
    opacity: '0.7',
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    padding: '1.5rem 2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    padding: '1rem 1.5rem',
    borderRadius: '20px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    resize: 'none',
    fontFamily: 'inherit',
  },
  messageInputFocus: {
    borderColor: 'rgba(59, 130, 246, 0.5)',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
    transform: 'scale(1.02)',
  },
  sendButton: {
    padding: '1rem',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    borderWidth: 'none',
    borderStyle: 'none',
    borderColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
    position: 'relative',
    overflow: 'hidden',
  },
  sendButtonHover: {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.6)',
  },
  sendButtonActive: {
    transform: 'scale(0.95)',
  },
  sendButtonDisabled: {
    opacity: '0.5',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: '0 4px 10px rgba(59, 130, 246, 0.2)',
  },
  floatingElements: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    zIndex: '0',
  },
  floatingIcon: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.1)',
    animation: 'float 6s ease-in-out infinite',
  },
  floatingIcon1: {
    top: '15%',
    left: '10%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '25%',
    right: '15%',
    animationDelay: '2s',
  },
  floatingIcon3: {
    bottom: '20%',
    left: '15%',
    animationDelay: '4s',
  },
  sparkleContainer: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
    fontSize: '2rem',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    gap: '1rem',
  },
  emptyStateIcon: {
    padding: '2rem',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    animation: 'pulse 2s ease-in-out infinite',
  },
};

const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @keyframes messageSlideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(5deg); }
    66% { transform: translateY(-10px) rotate(-3deg); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  
  *::-webkit-scrollbar {
    width: 6px;
  }
  
  *::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  *::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
  
  *::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  input::placeholder, textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    .chat-container {
      margin: 1rem !important;
      height: 90vh !important;
    }
    
    .message-bubble {
      max-width: 85% !important;
    }
  }
`;

const ChatRoom = ({ roomId = 'demo-room', currentUserId = 'user-123', otherUserId = 'user-456' }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [sendButtonHovered, setSendButtonHovered] = useState(false);
  const [sendButtonActive, setSendButtonActive] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("joinRoom", roomId);
    
    axios.get(`/messages/${roomId}`).then((res) => setMessages(res.data));
    
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [roomId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const msgData = {
      sender_id: currentUserId,
      receiver_id: otherUserId,
      room_id: roomId,
      message,
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post("/messages/send", msgData);
      socket.emit("sendMessage", msgData);
      setMessages((prev) => [...prev, msgData]);
      setMessage("");
      
      setSendButtonActive(true);
      setTimeout(() => setSendButtonActive(false), 150);
    } catch (error) {
      console.error("Erreur envoi message", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <MessageCircle size={60} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <User size={40} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <MessageCircle size={50} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
        </div>

        {/* Sparkle décoratif */}
        <div style={styles.sparkleContainer}>
          <MessageCircle size={32} />
        </div>

        <div style={styles.chatContainer} className="chat-container">
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>
              <MessageCircle size={24} />
            </div>
            <div style={styles.headerText}>
              <h2 style={styles.headerTitle}>Conversation</h2>
              <p style={styles.headerSubtitle}>
                <Clock size={14} />
                En ligne maintenant
              </p>
            </div>
          </div>

          {/* Messages Container */}
          <div style={styles.messagesContainer}>
            {messages.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyStateIcon}>
                  <MessageCircle size={48} />
                </div>
                <p>Aucun message pour le moment</p>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  Commencez la conversation !
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => {
                const isSent = msg.sender_id === currentUserId;
                return (
                  <div
                    key={idx}
                    style={{
                      ...styles.messageWrapper,
                      ...(isSent ? styles.messageWrapperSent : {})
                    }}
                  >
                    <div style={{
                      ...styles.messageAvatar,
                      ...(isSent ? styles.messageAvatarSent : {})
                    }}>
                      <User size={16} />
                    </div>
                    <div style={{
                      ...styles.messageBubble,
                      ...(isSent ? styles.messageSent : styles.messageReceived)
                    }} className="message-bubble">
                      <p style={styles.messageText}>{msg.message}</p>
                      <div style={styles.messageTime}>
                        {formatTime(msg.timestamp)}
                        {isSent && <CheckCheck size={14} />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Container */}
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Tapez votre message..."
              style={{
                ...styles.messageInput,
                ...(inputFocused ? styles.messageInputFocus : {})
              }}
            />
            <button
              onClick={sendMessage}
              onMouseEnter={() => setSendButtonHovered(true)}
              onMouseLeave={() => setSendButtonHovered(false)}
              disabled={!message.trim()}
              style={{
                ...styles.sendButton,
                ...(sendButtonHovered && message.trim() ? styles.sendButtonHover : {}),
                ...(sendButtonActive ? styles.sendButtonActive : {}),
                ...(!message.trim() ? styles.sendButtonDisabled : {})
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;