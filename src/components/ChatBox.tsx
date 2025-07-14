import React, { useState, useEffect, useRef } from 'react';
import type { Avatar } from '../types';
import type { KeyboardEvent, FormEvent } from 'react';
import { loadScript } from './loadScript';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  recommendedAvatar?: string;
}

interface ChatBoxProps {
  avatar: Avatar;
  sessionId?: string | null;
  onEndChat: () => void;
  readyQuestions?: string[];
  categoryName?: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ avatar, sessionId, onEndChat, readyQuestions, categoryName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [firstUserMessageSent, setFirstUserMessageSent] = useState(false);
  const [answerLength, setAnswerLength] = useState<'one' | 'two' | 'paragraph'>('one');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    // Auto-focus input after messages update
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  useEffect(() => {
    loadScript('https://js.puter.com/v2/', 'puter')
      .then(() => {
        // Puter.com script loaded, window.puter available
      })
      .catch((err) => {
        console.error('Puter.com script load error:', err);
      });
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    if (!firstUserMessageSent) setFirstUserMessageSent(true);
    
    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => setShowQuestions(false), 100);

    // Get backend API URL from env, fallback to local if not set
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      setIsTyping(true);
      // Debug: log the data being sent to backend
      console.log({
        message: userMessage.content,
        avatar: avatar.name,
        categoryName: categoryName,
        answerLength: answerLength,
        messages: messages.map(msg => ({ sender: msg.sender, content: msg.content }))
      });
      // 1. Get prompt from backend
      const backendRes = await fetch(`${apiUrl}/api/puter-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          avatar: avatar.name,
          categoryName: categoryName, // FIX: send the actual category name string from prop
          answerLength: answerLength,
          messages: messages.map(msg => ({ sender: msg.sender, content: msg.content }))
        })
      });
      const data = await backendRes.json();
      if (!data.allowed) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'ai',
          content: data.response,
          timestamp: new Date()
        }]);
        setIsTyping(false);
        setIsLoading(false);
        return;
      }
      // 2. Use Puter SDK in frontend
      if (window.puter && window.puter.ai && window.puter.ai.chat) {
        const puterRes = await window.puter.ai.chat(data.prompt);
        const aiContent = puterRes.message?.content || 'No response';
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          sender: 'ai',
          content: aiContent,
          timestamp: new Date()
        }]);
        // 3. (Optional) Log result to backend
        await fetch(`${apiUrl}/api/puter-result`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userMessage: userMessage.content,
            aiResponse: aiContent,
            avatar: avatar.name,
            categoryName,
            answerLength
          })
        });
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          sender: 'ai',
          content: 'Puter.com SDK not loaded in browser.',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        content: "Sorry, I'm having trouble right now. Please try again!",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper to render AI messages as lists if possible
  function renderAIMessage(content: string) {
    const lines = content.split(/\r?\n/).filter(line => line.trim() !== '');
    const isNumberedList = lines.length > 1 && lines.every(line => /^\d+\./.test(line.trim()));
    const isBulletedList = lines.length > 1 && lines.every(line => /^[-*]\s/.test(line.trim()));
    if (isNumberedList) {
      return (
        <ol style={{ paddingLeft: 20 }}>
          {lines.map((line, idx) => (
            <li key={idx}>{line.replace(/^\d+\.\s*/, '')}</li>
          ))}
        </ol>
      );
    }
    if (isBulletedList) {
      return (
        <ul style={{ paddingLeft: 20 }}>
          {lines.map((line, idx) => (
            <li key={idx}>{line.replace(/^[-*]\s*/, '')}</li>
          ))}
        </ul>
      );
    }
    return content.split(/\r?\n/).map((line, idx) => (
      <span key={idx}>
        {line}
        {idx < lines.length - 1 && <br />}
      </span>
    ));
  }

  // --- UI ---
  return (
    <div style={{ background: '#fafbfc', minHeight: '100vh', padding: 0, margin: 0, width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '18px 16px 12px 16px', background: '#fff', borderBottom: '1px solid #eee',
        position: 'sticky', top: 0, zIndex: 10, minHeight: 64
      }}>
        <button onClick={onEndChat} style={{ background: 'none', border: 'none', fontSize: 22, marginRight: 10, cursor: 'pointer' }}>&larr;</button>
        <img src={avatar.image} alt={avatar.name} style={{ width: 44, height: 44, borderRadius: '50%', marginRight: 12, objectFit: 'cover', border: '2px solid #e0e0e0' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222', lineHeight: 1 }}>{avatar.name}</div>
          <div style={{ color: '#f7b500', fontWeight: 600, fontSize: 15 }}>{categoryName}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', marginRight: 6 }}></span>
            <span style={{ color: '#22c55e', fontSize: 13 }}>Online</span>
          </div>
        </div>
      </div>
      {/* Ask Now Section */}
      {!firstUserMessageSent && readyQuestions && readyQuestions.length > 0 && showQuestions && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', padding: '24px 18px', width: 340, maxWidth: '95vw' }}>
            <div style={{ color: '#f7b500', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Ask now!</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 18 }}>Your personal style guide is here!</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {readyQuestions.map((q, idx) => (
                <button
                  key={idx}
                  style={{
                    border: '1.5px solid #d6f000',
                    background: input === q ? '#f6ffe6' : '#fff',
                    color: '#222',
                    borderRadius: 16,
                    padding: '14px 10px',
                    fontSize: 16,
                    fontWeight: 500,
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: input === q ? '0 2px 8px rgba(214,240,0,0.10)' : 'none',
                    outline: input === q ? '2px solid #d6f000' : 'none',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onClick={() => setInput(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 0 90px 0', width: '100vw' }}>
        {messages.map((message) => (
          <div key={message.id} style={{
            display: 'flex', flexDirection: message.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', marginBottom: 16
          }}>
            <div style={{
              background: message.sender === 'user' ? '#d6f000' : '#f6f6f6',
              color: message.sender === 'user' ? '#222' : '#222',
              borderRadius: 18,
              padding: '14px 18px',
              maxWidth: 320,
              width: '90vw',
              fontSize: 16,
              fontWeight: 500,
              boxShadow: message.sender === 'user' ? '0 2px 8px rgba(214,240,0,0.10)' : 'none',
              marginLeft: message.sender === 'user' ? 0 : 8,
              marginRight: message.sender === 'user' ? 8 : 0,
              wordBreak: 'break-word',
            }}>
              {message.sender === 'ai' ? (
                renderAIMessage(message.content)
              ) : (
                message.content
              )}
              <div style={{ fontSize: 12, color: '#888', marginTop: 8, textAlign: message.sender === 'user' ? 'right' : 'left' }}>{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ color: '#888', fontSize: 15, margin: '12px 0 0 12px' }}>{avatar.name} is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <form
        className="input-form"
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          sendMessage();
        }}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent',
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 0 18px 0',
        }}
      >
        <div style={{
          background: '#fff',
          borderRadius: 32,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '95vw',
          padding: '6px 12px',
        }}>
          <input
            type="text"
            className="input-field"
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Type your message...`}
            disabled={isLoading}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 16,
              background: 'transparent',
              flex: 1,
              padding: '10px 8px',
            }}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!input.trim() || isLoading}
            style={{
              background: '#d6f000',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 8,
              cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 8px rgba(214,240,0,0.10)',
              transition: 'background 0.2s',
              fontSize: 22,
              color: '#222',
            }}
          >
            <span style={{ display: 'inline-block', transform: 'rotate(-45deg)' }}>➤</span>
          </button>
        </div>
      </form>
    </div>
  );
};

// TypeScript declaration for window.puter
// (keep this at the end)
declare global {
  interface Window {
    puter?: {
      ai?: {
        chat?: (prompt: string) => Promise<{ message?: { content: string } }>;
      };
    };
  }
}

export default ChatBox;
