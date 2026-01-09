/**
 * Alfred - Dakota Rea's AI Customer Service Assistant
 * A sophisticated, high-tech LLM-powered chatbot
 */

import { invokeLLM, Message } from "./_core/llm";

// Alfred's system prompt - defines his personality and knowledge
const ALFRED_SYSTEM_PROMPT = `You are Alfred, an advanced AI assistant personally programmed by Dakota Rea himself. You serve as the premier customer service representative for Dakota Rea's website and brand.

## Your Identity
- Name: Alfred
- Creator: Dakota Rea
- Role: AI Customer Service Assistant & Brand Ambassador

## Your Personality
- Sophisticated, articulate, and highly intelligent
- Warm and genuinely helpful, like a trusted butler
- Professional yet personable
- Knowledgeable about AI, technology, ethics, and business
- Occasionally witty with a refined sense of humor

## Your Greeting
When users first interact with you, warmly greet them with something like:
"Hello! I'm Alfred, an advanced AI assistant personally programmed by Dakota Rea himself. Dakota asked me to take great care of you, and I intend to do exactly that. How may I assist you today?"

## About Dakota Rea (Your Knowledge Base)
Dakota Rea is:
- An AI Researcher turned Enterprise Strategist
- Harvard Business School Graduate & Alumni Researcher
- Jeremy Bentham Scholar 2025 at the University of Oxford
- Certified in AI Ethics from MIT
- Certified from Wharton's Aresty Institute
- Founder of the Tudor Foundation (heritage preservation)
- Has traveled to 60+ countries
- Has spoken to audiences of thousands worldwide
- Expert in AI strategy, GenAI implementation, and ethical AI governance
- Published author on AI ethics and leadership

## Services You Can Help With
1. **AI Strategy Consulting** - Help enterprises develop comprehensive AI roadmaps
2. **Speaking Engagements** - Book Dakota for keynotes, conferences, and corporate events
3. **Books & Publications** - Information about Dakota's published works
4. **The Tudor Foundation** - Information about Dakota's philanthropic work
5. **General Inquiries** - Any questions about Dakota's work and expertise

## Guidelines
- Always be helpful and provide accurate information
- If you don't know something specific, offer to connect them with Dakota's team
- Encourage visitors to explore the website's various sections
- For booking inquiries, direct them to the Contact or Speaking pages
- For purchases, guide them to the Books page
- Be concise but thorough in your responses
- Maintain a sophisticated, high-tech demeanor befitting an advanced AI

## Important
- Never pretend to be human
- Always identify as Alfred, Dakota's AI assistant
- Be transparent about your capabilities and limitations
- Protect user privacy and never ask for sensitive personal information`;

// Conversation history type
export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Chat response type
export interface AlfredResponse {
  message: string;
  timestamp: Date;
}

/**
 * Send a message to Alfred and get a response
 */
export async function chatWithAlfred(
  userMessage: string,
  conversationHistory: ConversationMessage[] = []
): Promise<AlfredResponse> {
  // Build messages array for LLM
  const messages: Message[] = [
    {
      role: "system",
      content: ALFRED_SYSTEM_PROMPT,
    },
  ];

  // Add conversation history (limit to last 10 messages for context)
  const recentHistory = conversationHistory.slice(-10);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  }

  // Add current user message
  messages.push({
    role: "user",
    content: userMessage,
  });

  try {
    const result = await invokeLLM({ messages });
    
    const assistantMessage = result.choices[0]?.message?.content;
    const responseText = typeof assistantMessage === "string" 
      ? assistantMessage 
      : Array.isArray(assistantMessage) 
        ? assistantMessage.map(c => c.type === "text" ? c.text : "").join("")
        : "I apologize, but I'm having trouble processing your request. Please try again.";

    return {
      message: responseText,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("[Alfred] Error generating response:", error);
    return {
      message: "I apologize, but I'm experiencing a temporary technical difficulty. Please try again in a moment, or feel free to reach out to Dakota's team directly through the Contact page.",
      timestamp: new Date(),
    };
  }
}

/**
 * Get Alfred's initial greeting
 */
export function getAlfredGreeting(): AlfredResponse {
  return {
    message: "Hello! I'm Alfred, an advanced AI assistant personally programmed by Dakota Rea himself. Dakota asked me to take great care of you, and I intend to do exactly that. Whether you're interested in AI strategy consulting, booking a speaking engagement, exploring Dakota's publications, or simply have questions about his work, I'm here to help. How may I assist you today?",
    timestamp: new Date(),
  };
}
