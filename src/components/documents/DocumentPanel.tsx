import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import UploadDocument from "./UploadDocument";
import DocumentList from "./DocumentList";

import {
  getDocuments,
  type Document,
} from "../../services/documentService";

const DocumentPanel = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const data = await getDocuments();

      setDocuments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDocuments();
  }, []);

  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl bg-gray-950 p-5">
      <h2 className="text-xl font-bold text-white">
        Documents
      </h2>

      <UploadDocument
        onUploadSuccess={loadDocuments}
      />

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2
              className="animate-spin text-blue-500"
              size={30}
            />
          </div>
        ) : (
          <DocumentList
            documents={documents}
            refreshDocuments={loadDocuments}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentPanel;