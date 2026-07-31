import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: Props) => {
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      180
    )}px`;
  }, [message]);

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    onSend(text);

    setMessage("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-800 bg-gray-950 p-4">
      <div className="flex items-end gap-3 rounded-2xl border border-gray-700 bg-gray-900 p-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          placeholder="Ask anything..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="max-h-44 flex-1 resize-none overflow-y-auto bg-transparent text-white outline-none placeholder:text-gray-500"
        />

        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendHorizontal size={18} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-gray-500">
        Press <kbd>Enter</kbd> to send • <kbd>Shift + Enter</kbd> for a new line
      </p>
    </div>
  );
};

export default ChatInput;