"use client";

import { Bot, Send, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { getBotResponse } from "@/lib/assistant";

type Message = {
  sender: "bot" | "user";
  text: string;
};

const PROMPTS = [
  { label: "Experience", query: "What is your experience?" },
  { label: "Focus", query: "What do you build?" },
  { label: "Projects", query: "Show your projects" },
  { label: "Schedule", query: "Schedule a meeting" },
  { label: "Contact", query: "How can I contact you?" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi. I can tell you about Shubham's role as Executive at NR Agrawal, his work on AI calling agents, AI chatbots, CRM apps, and apps, Stampzo, or how to schedule a meeting.",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const send = (text: string) => {
    const userMessage = text.trim();

    if (!userMessage) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
      { sender: "bot", text: getBotResponse(userMessage) },
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
        className="fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={22} /> : <Bot size={22} />}
      </button>

      {isOpen ? (
        <div
          aria-label="Chat with Shubham's assistant"
          className="fixed bottom-24 right-3 z-[70] flex max-h-[min(70vh,560px)] w-[min(100vw-1.5rem,400px)] flex-col overflow-hidden rounded-3xl border border-divider bg-content1 text-foreground shadow-2xl"
          role="dialog"
        >
          <div className="flex items-center justify-between border-b border-divider px-4 py-3">
            <div className="flex items-center gap-2 font-medium">
              <Bot className="text-primary" size={18} />
              Shubham
            </div>
            <button
              aria-label="Close chat"
              className="rounded-full p-1 text-foreground-500 hover:bg-content2"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3 py-2 leading-relaxed ${
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

          <div className="flex gap-2 overflow-x-auto border-t border-divider px-3 py-2">
            {PROMPTS.map((prompt) => (
              <button
                key={prompt.label}
                className="whitespace-nowrap rounded-full border border-divider px-3 py-1 text-xs text-foreground-600 hover:border-primary/40"
                type="button"
                onClick={() => send(prompt.query)}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          <form className="flex items-center gap-2 border-t border-divider p-3" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="assistant-input">
              Message
            </label>
            <input
              className="min-w-0 flex-1 rounded-2xl border border-divider bg-background px-3 py-2 text-base outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              id="assistant-input"
              placeholder="Ask about work, or book a meeting"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button
              aria-label="Send message"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground disabled:opacity-40"
              disabled={!input.trim()}
              type="submit"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
