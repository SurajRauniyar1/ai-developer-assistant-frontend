import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { uploadDocument } from "../../services/documentService";

interface Props {
  onUploadSuccess: () => Promise<void>;
}

const UploadDocument = ({ onUploadSuccess }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    try {
      setUploading(true);

      await uploadDocument(file);

      toast.success("Document uploaded successfully.");

      await onUploadSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload document.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    await handleUpload(file);
  };

  const handleDrop = async (
    e: React.DragEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    await handleUpload(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="rounded-2xl border-2 border-dashed border-gray-700 bg-gray-900 p-6 transition hover:border-blue-500"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleFileChange}
      />

      <div className="flex flex-col items-center justify-center gap-4">
        {uploading ? (
          <Loader2
            size={40}
            className="animate-spin text-blue-500"
          />
        ) : (
          <Upload
            size={40}
            className="text-blue-500"
          />
        )}

        <h3 className="text-lg font-semibold text-white">
          Upload PDF
        </h3>

        <p className="text-center text-sm text-gray-400">
          Drag & Drop your PDF here
          <br />
          or click the button below.
        </p>

        <button
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Choose PDF"}
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;