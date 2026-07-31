import api from "../api/axios";

export interface Conversation {
    id: number;
    title: string;
    created_at: string;
}

export const getConversations = async (): Promise<Conversation[]> => {
    const response = await api.get("/chat/list");
    return response.data;
};

export const createConversation = async (
    title: string
): Promise<Conversation> => {
    const response = await api.post("/chat/create", {
        title,
    });

    return response.data;
};

export const renameConversation = async (
    conversationId: number,
    title: string
): Promise<Conversation> => {
    const response = await api.patch(`/chat/${conversationId}`, {
        title,
    });

    return response.data;
};

export const deleteConversation = async (
    conversationId: number
): Promise<void> => {
    await api.delete(`/chat/${conversationId}`);
};