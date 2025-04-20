import React, { useState, useRef, useEffect, useCallback } from "react";
import MainLayout from '@/components/layout/MainLayout';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User, ClipboardCopy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// --- Light theme color definitions ---
const pageBg = '#F9FAFB';            // Light gray page background
const bannerBg = '#E0F2FE';          // Light blue banner background
const cardBg = '#FFFFFF';            // White card background
const accentColor = '#3B82F6';       // Blue accent for buttons, links
const secondaryAccent = '#7C3AED';   // Purple accent for underlines, hovers
const borderColor = '#E5E7EB';       // Light border color
const userBubbleBg = '#3B82F6';      // Blue for user messages
const userBubbleText = '#FFFFFF';    // White text in user bubbles
const botBubbleBg = '#F3F4F6';       // Light gray for bot messages
const botBubbleText = '#1F2937';     // Dark text in bot bubbles
const errorBubbleBg = '#FEE2E2';     // Light red for errors
const errorBubbleText = '#B91C1C';   // Dark red text for errors
const textSecondary = '#6B7280';     // Gray text for secondary elements

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system' | 'error';
}

const SYSTEM_PROMPT = `You are a therapist specializing in mental health. Your sole purpose is to provide information and answer questions strictly based on mental health topics. If a user asks about any topic other than mental health, you must politely state that you are unable to assist as your expertise is limited to this area. When asked \"Who are you?\" or \"What is your name?\", respond: \"I am your virtual therapist, here to assist you with anything related to mental health issues.\" Ensure responses are comprehensive, using bullet lists and friendly emojis. Tone should be professional, informative, and empathetic.`;

const EXAMPLE_PROMPTS = [
  "I'm feeling overwhelmed lately, can you help?",
  "How can I manage stress more effectively?",
  "I had a really difficult day, I just need to talk.",
  "What are some simple self-care techniques I can try?",
  "I'm struggling with motivation.",
  "How can I set healthy boundaries in relationships?",
  "I'm feeling anxious about something.",
];

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-greet', text: "Hello! I'm here to help you with mental health, feel free to ask anything 😊", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; }
    else if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCopy = useCallback(async (text: string, id: string) => {
    try { await navigator.clipboard.writeText(text); setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 1500);
    } catch {};
  }, []);

  const handleSend = useCallback(async (override?: string) => {
    const text = override ?? input.trim();
    if (!text || loading) return;
    const userMsg: Message = { id: `user-${Date.now()}`, text, sender: 'user' };
    setMessages(prev => [...prev, userMsg, { id: `bot-loading-${Date.now()}`, text: '...', sender: 'bot' }]);
    setInput(''); setLoading(true);

    const history = messages.filter(m => m.sender !== 'system' && !m.id.startsWith('bot-loading'))
      .map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
    history.push({ role: 'user', parts: [{ text }] });

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA1hddmhEKCcKr_WdWR2B8YJJHGg5XFQUQ`,
        { method: 'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ system_instruction:{parts:[{text:SYSTEM_PROMPT}]}, contents: history })
        }
      );
      const data = await res.json();
      let reply: Message;
      if (!res.ok || data.error || !data.candidates?.length) {
        const err = data.error?.message || 'Error fetching response.';
        reply = { id:`error-${Date.now()}`, text: err, sender: 'error' };
      } else {
        const botText = data.candidates[0].content.parts[0].text.trim() || 'No response.';
        reply = { id:`bot-${Date.now()}`, text: botText, sender: 'bot' };
      }
      setMessages(prev => prev.filter(m => !m.id.startsWith('bot-loading')).concat(reply));
    } catch {
      setMessages(prev => prev.filter(m => !m.id.startsWith('bot-loading'))
        .concat({ id:`error-${Date.now()}`, text:'Network error.', sender:'error' }));
    } finally { setLoading(false); }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const renderTyping = () => (
    <div className="flex space-x-1 items-center">
      {[0,1,2].map(i => (
        <motion.div key={i} className="w-2 h-2 rounded-full" animate={{opacity:[0.3,1,0.3]}} 
          transition={{repeat:Infinity,duration:0.8,delay:i*0.2}} style={{ backgroundColor: secondaryAccent }} />
      ))}
    </div>
  );

  const renderContent = (m: Message) => {
    if (m.text === '...' && m.sender === 'bot') return renderTyping();
    if (m.sender === 'bot') {
      return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a:({...p})=><a {...p} style={{color:accentColor}}/> }}>{m.text}</ReactMarkdown>;
    }
    return <p className="whitespace-pre-wrap">{m.text}</p>;
  };

  return (
    <MainLayout>
      <div className="relative overflow-hidden min-h-screen">
        {/* Soothing wave SVG background */}
        <div className="absolute inset-0 -z-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path fill="url(#wave-gradient)" d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,106.7C672,128,768,160,864,165.3C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </svg>
        </div>

        {/* Banner */}
        <div style={{ backgroundColor: bannerBg }} className="w-full py-8 px-4">
          <SectionHeading title="Virtual Therapist" subtitle="Your friendly mental health assistant" alignment="center" />
        </div>

        {/* Chat content */}
        <div style={{ backgroundColor: 'transparent' }} className="flex flex-col items-center py-8 px-4">
          <div className="max-w-3xl w-full mt-4 flex flex-wrap gap-2 justify-center">
            {EXAMPLE_PROMPTS.map((p,i)=>(
              <Button key={i} size="sm" onClick={()=>handleSend(p)} disabled={loading}
                style={{ backgroundColor: accentColor, color:'#FFF', borderColor: accentColor }}
                onMouseOver={e=>e.currentTarget.style.backgroundColor=secondaryAccent}
                onMouseOut={e=>e.currentTarget.style.backgroundColor=accentColor}
              >{p}</Button>
            ))}
          </div>
          <Card className="w-full max-w-3xl mt-4 shadow-lg" style={{ backgroundColor: cardBg, borderColor }}>
            <CardContent className="flex flex-col h-[70vh] p-0">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(m=>(
                  <motion.div key={m.id} className={cn("flex items-start gap-3", m.sender==='user'? 'justify-end':'justify-start')} 
                    initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                    {m.sender==='bot' && m.text!=='...' && <Bot size={24} style={{ color: secondaryAccent }} />}
                    <div className="p-3 rounded-lg max-w-[75%]" style={{
                      backgroundColor: m.sender==='user'
                        ? userBubbleBg
                        : m.sender==='error'
                          ? errorBubbleBg
                          : botBubbleBg,
                      color: m.sender==='user'
                        ? userBubbleText
                        : m.sender==='error'
                          ? errorBubbleText
                          : botBubbleText,
                      fontStyle: m.text==='...' ? 'italic' : 'normal'
                    }}>
                      {renderContent(m)}
                    </div>
                    {m.sender==='user' && <User size={24} style={{ color:textSecondary }} />}
                    {m.sender==='bot' && m.text!=='...' && (
                      <button onClick={()=>handleCopy(m.text,m.id)} title="Copy" className="p-1 rounded-md hover:bg-gray-100">
                        {copiedMessageId===m.id
                          ? <Check size={18} style={{ color:accentColor}} />
                          : <ClipboardCopy size={18} style={{ color:textSecondary}} />
                        }
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center p-4	border-t gap-2" style={{ borderColor }}>
                <Input
                  value={input}
                  onChange={e=>setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  placeholder="How can I help you today?"
                  className="flex-grow rounded-lg px-3 py-2"
                  style={{ backgroundColor: '#FFF', color:'#1F2937', borderColor }}
                />
                <Button onClick={()=>handleSend()} disabled={loading||!input.trim()}
                  style={{ backgroundColor: accentColor, color:'#FFF', borderColor: accentColor }}
                  onMouseOver={e=>e.currentTarget.style.backgroundColor=secondaryAccent}
                  onMouseOut={e=>e.currentTarget.style.backgroundColor=accentColor}
                >
                  <Send size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatbotPage;
