"use client";

import { Bot, Send, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

import { getBotResponse } from "@/lib/assistant";

type Message = {
  sender: "bot" | "user";
  text: string;
};

type MobileFrame = {
  top: number;
  height: number;
};

const PROMPTS = [
  { label: "Experience", query: "What is your experience?" },
  { label: "Focus", query: "What do you build?" },
  { label: "Projects", query: "Show your projects" },
  { label: "Schedule", query: "Schedule a meeting" },
  { label: "Contact", query: "How can I contact you?" },
];

const MOBILE_QUERY = "(max-width: 767px)";

function replyTo(text: string) {
  try {
    return getBotResponse(text);
  } catch {
    return "Something went wrong answering that. Please try again.";
  }
}

export default function ChatBot() {
  const reduce = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi. I can tell you about Shubham's role as Executive at NR Agrawal, his work on AI calling agents, AI chatbots, CRM apps, and apps, Stampzo, or how to schedule a meeting.",
    },
  ]);
  const [input, setInput] = useState("");
  const [mobileFrame, setMobileFrame] = useState<MobileFrame | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, isOpen, reduce]);

  useEffect(() => {
    if (!isOpen) {
      setMobileFrame(null);

      return;
    }

    const media = window.matchMedia(MOBILE_QUERY);
    const previousOverflow = document.body.style.overflow;

    const sync = () => {
      const mobile = media.matches;

      document.body.style.overflow = mobile ? "hidden" : previousOverflow;

      if (!mobile) {
        setMobileFrame(null);

        return;
      }

      const viewport = window.visualViewport;

      setMobileFrame({
        top: viewport?.offsetTop ?? 0,
        height: viewport?.height ?? window.innerHeight,
      });
    };

    sync();
    media.addEventListener("change", sync);
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);

    if (!media.matches) {
      inputRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      media.removeEventListener("change", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
    };
  }, [isOpen]);

  const send = (text: string) => {
    const userMessage = text.trim();

    if (!userMessage) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
      { sender: "bot", text: replyTo(userMessage) },
    ]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(input);
  };

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={`fixed z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] ${
          isOpen ? "max-md:hidden" : ""
        }`}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={22} /> : <Bot size={22} />}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="assistant-panel"
            animate={{ opacity: 1, y: 0 }}
            aria-label="Chat with Shubham's assistant"
            aria-modal="true"
            className="fixed z-[80] flex w-full max-w-[100dvw] flex-col overflow-hidden px-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pl-[max(0.75rem,env(safe-area-inset-left))] pt-[max(0.75rem,env(safe-area-inset-top))] max-md:inset-x-0 max-md:top-0 max-md:h-[100dvh] md:bottom-[calc(4.25rem+max(1.25rem,env(safe-area-inset-bottom)))] md:right-[max(1.25rem,env(safe-area-inset-right))] md:h-auto md:w-[min(24rem,calc(100dvw-2.5rem))] md:max-h-[min(36rem,calc(100dvh-6.5rem-env(safe-area-inset-bottom)))] md:p-0"
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            role="dialog"
            style={
              mobileFrame
                ? { top: mobileFrame.top, height: mobileFrame.height, left: 0, right: 0 }
                : undefined
            }
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-divider bg-content1 text-foreground shadow-2xl md:h-[min(36rem,calc(100dvh-6.5rem-env(safe-area-inset-bottom)))] md:flex-none">
              <div className="flex shrink-0 items-center justify-between border-b border-divider px-4 py-3">
                <div className="flex min-w-0 items-center gap-2 font-medium">
                  <Bot className="shrink-0 text-primary" size={18} />
                  <span className="truncate">Shubham</span>
                </div>
                <button
                  aria-label="Close chat"
                  className="shrink-0 rounded-full p-1 text-foreground-500 hover:bg-content2"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="custom-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 text-sm">
                {messages.map((message, index) => (
                  <div
                    key={`${message.sender}-${index}`}
                    className={`flex min-w-0 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`max-w-[85%] whitespace-pre-line break-words rounded-2xl px-3 py-2 leading-relaxed [overflow-wrap:anywhere] ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-content2 text-foreground"
                      }`}
                    >
                      {message.text}
                    </p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="flex max-w-full shrink-0 gap-2 overflow-x-auto border-t border-divider px-3 py-2">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt.label}
                    className="shrink-0 whitespace-nowrap rounded-full border border-divider px-3 py-1 text-xs text-foreground-600 hover:border-primary/40"
                    type="button"
                    onClick={() => send(prompt.query)}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              <form
                className="flex shrink-0 items-center gap-2 border-t border-divider p-3"
                onSubmit={handleSubmit}
              >
                <label className="sr-only" htmlFor="assistant-input">
                  Message
                </label>
                <input
                  ref={inputRef}
                  className="min-w-0 flex-1 rounded-2xl border border-divider bg-background px-3 py-2 text-base outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  id="assistant-input"
                  placeholder="Ask about work, or book a meeting"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <button
                  aria-label="Send message"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground disabled:opacity-40"
                  disabled={!input.trim()}
                  type="submit"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
