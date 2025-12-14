import MainContent from "./main-content";
import ChatRoom from "./chat-room";
import Sidebar from "@/components/layout/side-bar";

export default function StreamingDashboard() {
  return (
    <div className="flex h-screen bg-[#13141c] text-white font-sans overflow-hidden selection:bg-blue-500 selection:text-white">
      <Sidebar />
      <MainContent src="" />
      <ChatRoom />
    </div>
  );
}
