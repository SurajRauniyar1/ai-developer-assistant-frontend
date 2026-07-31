import { useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

import { useConversation } from "../../context/ConversationContext";

import {
  getMessages,
  streamMessage,
  type Message,
} from "../../services/chatService";

const ChatWindow = () => {
  const {
    selectedConversation,
    refreshConversations,
  } = useConversation();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const loadMessages = async (chatId: number) => {
    try {
      setLoading(true);
      const history = await getMessages(chatId);
      setMessages(history);
    } catch (error) {
      console.error(error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMessages([]);

    if (!selectedConversation) return;

    void loadMessages(selectedConversation.id);
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const handleSend = async (content: string) => {
    if (!selectedConversation) return;

    try {
      setTyping(true);

      const userMessage: Message = {
        id: Date.now(),
        role: "user",
        content,
        created_at: new Date().toISOString(),
      };

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "",
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
        assistantMessage,
      ]);

      await streamMessage(
        selectedConversation.id,
        content,
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id
                ? {
                    ...msg,
                    content: msg.content + chunk,
                  }
                : msg
            )
          );
        }
      );

      const history = await getMessages(
        selectedConversation.id
      );

      setMessages(history);

      await refreshConversations();
    } catch (error) {
      console.error(error);
    } finally {
      setTyping(false);
    }
  };

  if (!selectedConversation) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Create or select a conversation
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-950">

      {/* Desktop conversation title */}
      <div className="hidden border-b border-gray-800 px-6 py-3 sm:block">
        <h2 className="truncate text-lg font-semibold">
          {selectedConversation.title}
        </h2>
      </div>

      {/* Scrollable messages */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-6 space-y-4">

        {loading ? (
          <div className="text-center text-gray-400">
            Loading...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">
            Start a new conversation
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))
        )}

        {typing && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      {/* Fixed input */}
      <div className="shrink-0 border-t border-gray-800 bg-gray-950 p-3 sm:p-4">
        <ChatInput onSend={handleSend} />
      </div>

    </div>
  );
};

export default ChatWindow;