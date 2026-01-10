/**
 * Alfred - Dakota Rea's AI Customer Service Assistant
 * High-tech, futuristic chat interface
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Minimize2,
  Maximize2
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AlfredChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get Alfred's greeting
  const { data: greeting } = trpc.alfred.greeting.useQuery(undefined, {
    enabled: isOpen && messages.length === 0,
  });

  // Chat mutation
  const chatMutation = trpc.alfred.chat.useMutation({
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message,
        timestamp: new Date(data.timestamp),
      }]);
      setIsTyping(false);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: "I apologize, but I'm experiencing a temporary difficulty. Please try again.",
        timestamp: new Date(),
      }]);
      setIsTyping(false);
    },
  });

  // Add greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0 && greeting) {
      setMessages([{
        id: "greeting",
        role: "assistant",
        content: greeting.message,
        timestamp: new Date(greeting.timestamp),
      }]);
    }
  }, [isOpen, greeting, messages.length]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Send to Alfred
    chatMutation.mutate({
      message: userMessage.content,
      history: messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      })),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button with Label */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
          >
            {/* Label Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="px-4 py-3 rounded-xl shadow-lg max-w-[200px]"
              style={{ 
                backgroundColor: "oklch(0.15 0.03 250)",
                border: "1px solid oklch(0.72 0.14 85 / 0.3)",
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.72 0.14 85)" }}>
                Meet Alfred
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "oklch(0.97 0.01 90 / 0.8)" }}>
                Advanced AI Assistant designed by Dakota Rea
              </p>
            </motion.div>
            
            {/* Chat Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full shadow-2xl flex items-center justify-center group relative"
              style={{
                background: "linear-gradient(135deg, oklch(0.72 0.14 85) 0%, oklch(0.62 0.14 85) 100%)",
              }}
            >
              {/* Pulse animation */}
              <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "oklch(0.72 0.14 85)" }} />
              
              {/* Icon */}
              <div className="relative flex items-center justify-center">
                <Bot size={28} className="text-white" />
                <Sparkles size={14} className="absolute -top-1 -right-1 text-white animate-pulse" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? "auto" : "600px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ 
              backgroundColor: "oklch(0.98 0.005 90)",
              border: "1px solid oklch(0.90 0.01 90)",
            }}
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between p-4"
              style={{ 
                background: "linear-gradient(135deg, oklch(0.15 0.03 250) 0%, oklch(0.20 0.03 250) 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Alfred Avatar */}
                <div className="relative">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ 
                      background: "linear-gradient(135deg, oklch(0.72 0.14 85) 0%, oklch(0.62 0.14 85) 100%)",
                    }}
                  >
                    <Bot size={20} className="text-white" />
                  </div>
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" 
                    style={{ backgroundColor: "oklch(0.7 0.2 145)" }} />
                </div>
                
                <div>
                  <h3 className="font-semibold text-white flex items-center gap-1.5">
                    Alfred
                    <Sparkles size={14} style={{ color: "oklch(0.72 0.14 85)" }} />
                  </h3>
                  <p className="text-xs" style={{ color: "oklch(0.97 0.01 90 / 0.7)" }}>
                    AI Assistant • Online
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                >
                  {isMinimized ? (
                    <Maximize2 size={18} className="text-white/70" />
                  ) : (
                    <Minimize2 size={18} className="text-white/70" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg transition-colors hover:bg-white/10"
                >
                  <X size={18} className="text-white/70" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{ 
                    background: "linear-gradient(180deg, oklch(0.98 0.005 90) 0%, oklch(0.96 0.005 90) 100%)",
                  }}
                >
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      {/* Avatar */}
                      <div 
                        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                          message.role === "user" ? "" : ""
                        }`}
                        style={{ 
                          backgroundColor: message.role === "user" 
                            ? "oklch(0.72 0.14 85)" 
                            : "oklch(0.15 0.03 250)",
                        }}
                      >
                        {message.role === "user" ? (
                          <User size={16} className="text-white" />
                        ) : (
                          <Bot size={16} className="text-white" />
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div 
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user" 
                            ? "rounded-br-md" 
                            : "rounded-bl-md"
                        }`}
                        style={{ 
                          backgroundColor: message.role === "user" 
                            ? "oklch(0.72 0.14 85)" 
                            : "white",
                          color: message.role === "user" 
                            ? "white" 
                            : "oklch(0.25 0.02 250)",
                          boxShadow: "0 2px 8px oklch(0 0 0 / 0.08)",
                        }}
                      >
                        {message.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none">
                            <Streamdown>{message.content}</Streamdown>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: "oklch(0.15 0.03 250)" }}
                      >
                        <Bot size={16} className="text-white" />
                      </div>
                      <div 
                        className="rounded-2xl rounded-bl-md px-4 py-3"
                        style={{ 
                          backgroundColor: "white",
                          boxShadow: "0 2px 8px oklch(0 0 0 / 0.08)",
                        }}
                      >
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "oklch(0.72 0.14 85)", animationDelay: "0ms" }} />
                          <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "oklch(0.72 0.14 85)", animationDelay: "150ms" }} />
                          <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: "oklch(0.72 0.14 85)", animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div 
                  className="p-4 border-t"
                  style={{ borderColor: "oklch(0.90 0.01 90)" }}
                >
                  <div 
                    className="flex items-center gap-2 rounded-xl px-4 py-2"
                    style={{ 
                      backgroundColor: "oklch(0.96 0.005 90)",
                      border: "1px solid oklch(0.90 0.01 90)",
                    }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Alfred anything..."
                      className="flex-1 bg-transparent outline-none text-sm"
                      style={{ color: "oklch(0.25 0.02 250)" }}
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ 
                        backgroundColor: inputValue.trim() ? "oklch(0.72 0.14 85)" : "transparent",
                      }}
                    >
                      <Send 
                        size={18} 
                        className={inputValue.trim() ? "text-white" : ""} 
                        style={{ color: inputValue.trim() ? undefined : "oklch(0.5 0.02 250)" }}
                      />
                    </button>
                  </div>
                  
                  <p className="text-center text-xs mt-2" style={{ color: "oklch(0.5 0.02 250)" }}>
                    Powered by Dakota Rea's AI • <span style={{ color: "oklch(0.72 0.14 85)" }}>Alfred v1.0</span>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
