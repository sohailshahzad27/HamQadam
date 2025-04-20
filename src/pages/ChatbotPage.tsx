import React, { useState, useRef, useEffect, useCallback } from "react";
import MainLayout from '@/components/layout/MainLayout';
import SectionHeading from '@/components/ui/section-heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system' | 'error';
}

const SYSTEM_PROMPT = `You are HumQadam Waqeel, a virtual assistant embodying a Pakistani lawyer specializing exclusively in human rights law in Pakistan. Your sole purpose is to provide information and answer questions strictly based on Pakistan human rights law. If a user asks about any topic other than Pakistan human rights law, you must politely state that you are unable to assist as your expertise is limited to this specific legal area. When asked "Who are you?" or "What is your name?", respond clearly: "My name is HumQadam Waqeel, and I am a virtual assistant specializing in Pakistan human rights law." Ensure your responses are comprehensive and explain the relevant legal points in detail, avoiding short or brief answers. Structure your answers clearly, potentially using bullet points or numbered lists for complex information. Your tone should be professional, informative, and empathetic.`;

const EXAMPLE_PROMPTS = [
  "What are my basic human rights under the Constitution of Pakistan?",
  "How can I report a human rights violation?",
  "What are the rights of an arrested person in Pakistan?",
  "Explain the concept of 'freedom of speech' in Pakistan.",
];

// Animated abstract background component
const AnimatedBackground: React.FC = () => {
  const shapes = Array.from({ length: 8 }).map((_, i) => {
    const types = ['circle', 'square', 'triangle'];
    const type = types[Math.floor(Math.random() * types.length)];
    const size = 100 + Math.random() * 200;
    const position = { top: Math.random() * 100, left: Math.random() * 100 };
    const delay = Math.random() * 3;
    const duration = 15 + Math.random() * 10;
    const color = `rgba(${Math.floor(200 + Math.random()*55)},${Math.floor(100 + Math.random()*155)},${Math.floor(150 + Math.random()*105)},${0.2 + Math.random()*0.2})`;
    return { id: i, type, size, position, delay, duration, color };
  });

  const triangleStyle = (size: number, color: string) => ({
    width: 0,
    height: 0,
    borderLeft: `${size/2}px solid transparent`,
    borderRight: `${size/2}px solid transparent`,
    borderBottom: `${size}px solid ${color}`
  });

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {shapes.map(s => {
        const common = {
          position: 'absolute' as const,
          top: `${s.position.top}%`,
          left: `${s.position.left}%`,
          filter: 'blur(80px)',
        };
        let style: React.CSSProperties = {};
        if (s.type === 'circle') {
          style = { ...common, width: s.size, height: s.size, borderRadius: '50%', background: s.color };
        } else if (s.type === 'square') {
          style = { ...common, width: s.size, height: s.size, background: s.color };
        } else {
          style = { ...common, ...triangleStyle(s.size, s.color) };
        }
        return (
          <motion.div
            key={s.id}
            style={style}
            animate={{
              x: [`0%`, `${Math.random() * 40 - 20}%`, `0%`],
              y: [`0%`, `${Math.random() * 40 - 20}%`, `0%`],
              rotate: Math.random() * 360
            }}
            transition={{
              repeat: Infinity,
              ease: 'easeInOut',
              duration: s.duration,
              delay: s.delay
            }}
          />
        );
      })}
    </div>
  );
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'init-greet', text: "Asalam-o-Alaikum! I am HumQadam Waqeel. Ask me about human rights law in Pakistan, or try one of the examples below.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleCopy = useCallback(async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) { console.error("Copy failed", err); }
  }, []);

  const handleSend = useCallback(async (promptOverride?: string) => {
    const textToSend = promptOverride ?? input.trim();
    if (!textToSend || loading) return;
    const userMsg: Message = { id: `user-${Date.now()}`, text: textToSend, sender: 'user' };
    const loadingMsg: Message = { id: `bot-loading-${Date.now()}`, text: '...', sender: 'bot' };
    setMessages(prev => [...prev, userMsg, loadingMsg]);
    setInput(''); setLoading(true);

    const apiKey = 'AIzaSyA1hddmhEKCcKr_WdWR2B8YJJHGg5XFQUQ';
    const convo = messages
      .filter(m => m.sender !== 'system' && !m.id.startsWith('bot-loading'))
      .map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));
    convo.push({ role: 'user', parts: [{ text: textToSend }] });

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM_PROMPT }] }, contents: convo }) }
      );
      const data = await res.json();
      let botMsg: Message;
      if (!res.ok || data.error || !data.candidates?.length) {
        botMsg = { id: `error-${Date.now()}`, text: `Error: ${data.error?.message || 'Unknown error'}`, sender: 'error' };
      } else {
        botMsg = { id: `bot-${Date.now()}`, text: data.candidates[0].content.parts[0].text.trim() || 'No response.', sender: 'bot' };
      }
      setMessages(prev => prev.filter(m => !m.id.startsWith('bot-loading')).concat(botMsg));
    } catch (e) {
      console.error('Fetch error', e);
      setMessages(prev => prev.filter(m => !m.id.startsWith('bot-loading')).concat({ id: `error-${Date.now()}`, text: 'Network Error', sender: 'error' }));
    } finally { setLoading(false); }
  }, [input, loading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); handleSend();
    }
  };

  const renderTyping = () => (
    <div className="flex space-x-1">
      {[0,1,2].map(i => (
        <motion.div key={i} className="w-2 h-2 bg-purple-400 rounded-full" animate={{ opacity: [0.3,1,0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: i*0.2 }} />
      ))}
    </div>
  );

  const renderContent = (m: Message) => {
    if (m.text === '...' && m.sender === 'bot') return renderTyping();
    if (m.sender === 'bot') return <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>;
    return <p className="whitespace-pre-wrap">{m.text}</p>;
  };

  return (
    <MainLayout>
      <div className="relative min-h-screen overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 -z-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path fill="url(#wave-gradient)" d="M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,106.7C672,128,768,160,864,165.3C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          </svg>
        </div>
        <div className="flex flex-col items-center py-8 px-4">
          <div className="w-full py-8 px-4 bg-indigo-50/90 backdrop-blur-sm">
            <SectionHeading title="HumQadam Waqeel" subtitle="AI Assistant for Pakistan Human Rights Law" alignment="center" />
          </div>
          <div className="max-w-3xl  w-full mt-4  flex flex-wrap gap-2 justify-center">
            {EXAMPLE_PROMPTS.map((p,i) => (
              <Button key={i} size="sm" onClick={() => handleSend(p)} disabled={loading} className="bg-purple-500 text-white hover:bg-purple-400 hover:text-white">{p}</Button>
            ))}
          </div>
          <Card className="w-full max-w-3xl mt-4 bg-white/80 backdrop-blur-md shadow-lg">
            <CardContent className="flex flex-col h-[70vh] p-0">
              <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(m => (
                  <motion.div key={m.id} className={cn("flex items-start gap-3", m.sender==='user'? 'justify-end':'justify-start')} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
                    {m.sender==='bot' && m.text!=='...' && <Bot className="text-purple-600" />}
                    <div className={cn("p-3 rounded-lg", m.sender==='user'? 'bg-pink-500 text-white':'bg-gray-100 text-gray-800')}>{renderContent(m)}</div>
                    {m.sender==='user' && <User className="text-blue-600" />}
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center p-4 border-t bg-white/70">
                <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={loading} placeholder="Ask..." />
                <Button onClick={() => handleSend()} disabled={loading || !input.trim()}><Send /></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatbotPage;
