import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getConversations,
  type Conversation,
} from "../services/conversationService";

import { useAuth } from "./AuthContext";

interface ConversationContextType {
  conversations: Conversation[];
  selectedConversation: Conversation | null;

  setSelectedConversation: (
    conversation: Conversation | null
  ) => void;

  refreshConversations: () => Promise<void>;

  addConversation: (
    conversation: Conversation
  ) => void;

  clearConversations: () => void;
}

const ConversationContext = createContext<
  ConversationContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export const ConversationProvider = ({
  children,
}: Props) => {
  const { token } = useAuth();

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [
    selectedConversation,
    setSelectedConversation,
  ] = useState<Conversation | null>(null);

  const clearConversations = () => {
    setConversations([]);
    setSelectedConversation(null);
  };

  const refreshConversations = async () => {
    if (!token) {
      clearConversations();
      return;
    }

    try {
      const data = await getConversations();

      setConversations(data);

      setSelectedConversation((current) => {
        if (!current) {
          return data.length > 0 ? data[0] : null;
        }

        const updated = data.find(
          (c) => c.id === current.id
        );

        return updated ?? (data.length > 0 ? data[0] : null);
      });
    } catch (error) {
      console.error(error);
      clearConversations();
    }
  };

  const addConversation = (
    conversation: Conversation
  ) => {
    setConversations((prev) => [
      conversation,
      ...prev,
    ]);

    setSelectedConversation(conversation);
  };

  useEffect(() => {
    if (!token) {
      clearConversations();
      return;
    }

    void refreshConversations();
  }, [token]);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        selectedConversation,
        setSelectedConversation,
        refreshConversations,
        addConversation,
        clearConversations,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(
    ConversationContext
  );

  if (!context) {
    throw new Error(
      "useConversation must be used inside ConversationProvider"
    );
  }

  return context;
};