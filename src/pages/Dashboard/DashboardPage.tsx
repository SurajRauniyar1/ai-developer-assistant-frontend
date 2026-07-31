import Sidebar from "../../components/Sidebar/Sidebar";
import ChatWindow from "../../components/chat/ChatWindow";
import DocumentPanel from "../../components/documents/DocumentPanel";

const DashboardPage = () => {
  return (
    <div className="h-screen bg-[#0B1120] text-white">
      <div className="flex h-full overflow-hidden">

        {/* Sidebar */}
        <aside className="w-[280px] border-r border-gray-800 bg-[#111827]">
          <Sidebar />
        </aside>

        {/* Chat */}
        <main className="flex flex-1 justify-center bg-[#0B1120]">
          <div className="w-full max-w-5xl border-x border-gray-800">
            <ChatWindow />
          </div>
        </main>

        {/* Documents */}
        <aside className="w-[320px] border-l border-gray-800 bg-[#111827]">
          <DocumentPanel />
        </aside>

      </div>
    </div>
  );
};

export default DashboardPage;