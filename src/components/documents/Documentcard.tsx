import { FileText, Trash2 } from "lucide-react";
import type { Document } from "../../services/documentService";

interface Props {
  document: Document;
  onDelete: (id: number) => void;
}

const DocumentCard = ({ document, onDelete }: Props) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-700 bg-gray-900 p-4 transition hover:border-gray-600">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="rounded-lg bg-red-500/10 p-2">
          <FileText className="text-red-500" size={22} />
        </div>

        <div className="overflow-hidden">
          <h3 className="truncate font-medium text-white">
            {document.filename}
          </h3>

          <p className="text-sm text-gray-400">
            {new Date(document.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDelete(document.id)}
        className="rounded-lg p-2 text-red-500 transition hover:bg-red-500/10"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default DocumentCard;