import { useState } from "react";
import { Menu, X, FileText } from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import DocumentPanel from "../../components/documents/DocumentPanel";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);

  return (
    <div className="h-screen bg-[#0B1120] text-white">

      {/* Mobile Header */}

      <header className="flex items-center justify-between border-b border-gray-800 bg-[#111827] px-4 py-3 lg:hidden">

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>

        <h1 className="font-semibold">
          AI Assistant
        </h1>

        <button
          onClick={() => setDocumentOpen(true)}
          className="rounded-lg p-2 hover:bg-gray-800"
        >
          <FileText size={22} />
        </button>

      </header>

      <div className="flex h-[calc(100vh-57px)] lg:h-screen">

        {/* Sidebar */}

        <aside
          className={`fixed left-0 top-0 z-40 h-full w-[280px] transform bg-[#111827] transition-transform duration-300 lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >

          <div className="flex justify-end p-3 lg:hidden">

            <button
              onClick={() => setSidebarOpen(false)}
            >
              <X />
            </button>

          </div>

          <Sidebar />

        </aside>

        {/* Overlay */}

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          />
        )}

        {/* Chat */}

        <main className="flex flex-1 justify-center overflow-hidden">

          <div className="w-full max-w-5xl">
            <ChatWindow />
          </div>

        </main>

        {/* Documents */}

        <aside className="hidden w-[320px] border-l border-gray-800 bg-[#111827] xl:block">

          <DocumentPanel />

        </aside>

        {/* Mobile Documents */}

        {documentOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 xl:hidden"
              onClick={() => setDocumentOpen(false)}
            />

            <div className="fixed right-0 top-0 z-50 h-full w-[320px] bg-[#111827] shadow-2xl">

              <div className="flex justify-end p-3">

                <button
                  onClick={() => setDocumentOpen(false)}
                >
                  <X />
                </button>

              </div>

              <DocumentPanel />

            </div>
          </>
        )}

      </div>

    </div>
  );
};

export default DashboardPage;