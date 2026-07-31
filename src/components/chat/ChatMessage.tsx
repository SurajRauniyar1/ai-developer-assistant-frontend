import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: Props) => {
  const isUser = role === "user";

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div
      className={`mb-6 flex items-start gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow">
          <Bot size={18} />
        </div>
      )}

      <div
        className={`max-w-[780px] rounded-2xl border px-5 py-4 shadow-md ${
          isUser
            ? "border-blue-500 bg-blue-600 text-white"
            : "border-gray-700 bg-[#1F2937] text-gray-100"
        }`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children }) {
              const match = /language-(\w+)/.exec(className || "");
              const code = String(children).replace(/\n$/, "");

              if (match) {
                return (
                  <div className="my-4 overflow-hidden rounded-xl border border-gray-700">
                    <div className="flex items-center justify-between bg-[#111827] px-4 py-2">
                      <span className="text-xs uppercase tracking-wide text-gray-400">
                        {match[1]}
                      </span>

                      <button
                        onClick={() => copyCode(code)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-300 transition hover:bg-gray-700"
                      >
                        <Copy size={14} />
                        Copy
                      </button>
                    </div>

                    <SyntaxHighlighter
                      language={match[1]}
                      style={oneDark as any}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        background: "#0F172A",
                        padding: "18px",
                      }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  </div>
                );
              }

              return (
                <code className="rounded bg-gray-700 px-1.5 py-0.5 text-sm">
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {isUser && (
        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-white shadow">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;