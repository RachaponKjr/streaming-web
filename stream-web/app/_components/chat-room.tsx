import { MoreHorizontal, Send } from "lucide-react";
import Image from "next/image";
import React from "react";

const ChatRoom = () => {
  // const messages = [
  //   {
  //     id: 1,
  //     user: "Corey Diaz",
  //     text: "Hey team! 😎",
  //     avatar: 12,
  //     isMe: false,
  //   },
  //   {
  //     id: 2,
  //     user: "Terry Hodges",
  //     text: "Avoid combat, watch the jungle",
  //     avatar: 33,
  //     isMe: false,
  //   },
  //   { id: 3, user: "Kevin Carpenter", text: "Great!", avatar: 5, isMe: false },
  //   { id: 4, user: "You", text: "Let's gooo!", avatar: 60, isMe: true },
  //   {
  //     id: 5,
  //     user: "Julian Parks",
  //     text: "Rush trying so hard to carry monkeys",
  //     avatar: 8,
  //     isMe: false,
  //   },
  // ];
  return (
    <div className="w-80 shrink-0 bg-[#1f212d] m-4 rounded-3xl flex flex-col lg:flex shadow-2xl overflow-hidden border border-gray-800">
      {/* Chat Header */}
      <div className="p-5 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-white font-semibold">Live chat room</h3>
        <MoreHorizontal className="text-gray-400 cursor-pointer hover:text-white" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {/* Message */}
        <div className="flex justify-center items-center h-full">
          ไม่พบข้อความ
        </div>
        {/* {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
          >
            {!msg.isMe && (
              <Image
                src={`https://i.pravatar.cc/150?img=${msg.avatar}`}
                className="w-8 h-8 rounded-full"
                alt="avatar"
                width={32}
                height={32}
              />
            )}
            <div className="flex flex-col gap-1 max-w-[80%]">
              {!msg.isMe && (
                <span className="text-xs text-gray-400 font-medium">
                  {msg.user}
                </span>
              )}
              <div
                className={`p-3 rounded-2xl text-sm ${
                  msg.isMe
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-[#2a2d3e] text-gray-200 rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))} */}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-[#1f212d]">
        <div className="flex items-center gap-2 bg-[#15161c] p-2 rounded-full border border-gray-700">
          <input
            disabled
            type="text"
            placeholder="Send a message..."
            className="bg-transparent text-sm text-white flex-1 px-3 focus:outline-none"
          />
          <button
            disabled
            className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
