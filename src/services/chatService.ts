import api from "../api/axios";

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export const getMessages = async (
  chatId: number
): Promise<Message[]> => {
  const response = await api.get(`/message/history/${chatId}`);
  return response.data;
};

export const sendMessage = async (
  chatId: number,
  content: string
): Promise<Message> => {
  const response = await api.post(`/message/send/${chatId}`, {
    content,
  });

  return response.data;
};

export const streamMessage = async (
  chatId: number,
  content: string,
  onChunk: (chunk: string) => void
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/message/stream/${chatId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
      }),
    }
  );

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();

  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    onChunk(decoder.decode(value));
  }
};