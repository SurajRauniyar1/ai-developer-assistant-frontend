import { useState } from "react";
import toast from "react-hot-toast";

import DocumentCard from "./Documentcard";

import {
  deleteDocument,
  type Document,
} from "../../services/documentService";

interface Props {
  documents: Document[];
  refreshDocuments: () => Promise<void>;
}

const DocumentList = ({
  documents,
  refreshDocuments,
}: Props) => {
  const [deletingId, setDeletingId] = useState<number | null>(
    null
  );

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);

      await deleteDocument(id);

      toast.success("Document deleted.");

      await refreshDocuments();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete document.");
    } finally {
      setDeletingId(null);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-700 p-8 text-center text-gray-400">
        No documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <div
          key={document.id}
          className={
            deletingId === document.id
              ? "pointer-events-none opacity-50"
              : ""
          }
        >
          <DocumentCard
            document={document}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default DocumentList;