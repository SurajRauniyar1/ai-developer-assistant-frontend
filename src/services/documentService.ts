import api from "../api/axios";

export interface Document {
  id: number;
  filename: string;
  filepath: string;
  user_id: number;
  created_at: string;
}

export const getDocuments = async (): Promise<Document[]> => {
  const response = await api.get("/document/");
  return response.data;
};

export const uploadDocument = async (
  file: File
): Promise<Document> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/document/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteDocument = async (
  documentId: number
): Promise<void> => {
  await api.delete(`/document/${documentId}`);
};