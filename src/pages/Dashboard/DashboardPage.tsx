import { useState } from "react";
import { Menu, FileText, X } from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import DocumentPanel from "../../components/documents/DocumentPanel";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-gray-950 text-white">
      {/* Mobile Overlay */}
      {(sidebarOpen || documentOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setDocumentOpen(false);
          }}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden w-[280px] border-r border-gray-800 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[280px] transform border-r border-gray-800 bg-[#111827] transition-transform duration-300 lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar
          onConversationSelected={() => setSidebarOpen(false)}
        />
      </aside>

      {/* Main Content */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Mobile Header */}
       <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-800 bg-gray-900 px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-800"
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold">
            AI Assistant
          </h1>

          <button
            onClick={() => setDocumentOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-800"
          >
            <FileText size={22} />
          </button>
        </header>

        {/* Chat */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <ChatWindow />
        </div>
      </div>

      {/* Desktop Documents */}
      <aside className="hidden w-[320px] border-l border-gray-800 xl:block">
        <DocumentPanel />
      </aside>

      {/* Mobile Document Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-gray-800 bg-[#111827] transition-transform duration-300 lg:hidden ${documentOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-4">
          <h2 className="text-lg font-semibold">
            Documents
          </h2>

          <button
            onClick={() => setDocumentOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <DocumentPanel />
        </div>
      </aside>
    </div>
  );
};

export default DashboardPage;