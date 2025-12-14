"use client";

import ActionButton from "@/components/btn-action";
import {
  Bell,
  Heart,
  MoreHorizontal,
  PlayCircle,
  Search,
  Settings,
  Share2,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css"; // อย่าลืม import CSS ของ video.js

// Interface สำหรับ Props
interface MainContentProps {
  src: string | undefined;
}

const MainContent = ({ src }: MainContentProps) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null); // ใช้ type any หรือ import type จาก video.js
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. Initialize & Handle Video Player
  useEffect(() => {
    // ถ้ายังไม่มี Player ให้สร้างใหม่
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");

      // Append video element เข้าไปใน container
      if (videoContainerRef.current) {
        videoContainerRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, {
        autoplay: false, // ปิด autoplay อัตโนมัติเพื่อให้ User กดปุ่มกลางก่อน (UX ดีกว่า)
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: src, // ใช้ค่าจาก Props
            type: "application/x-mpegURL",
          },
        ],
      }));

      // Event Listener: เมื่อวิดีโอเริ่มเล่น ให้ซ่อน Overlay
      player.on("play", () => {
        setIsPlaying(true);
      });

      // Event Listener: เมื่อวิดีโอหยุด (Pause)
      player.on("pause", () => {
        setIsPlaying(false);
      });
    } else {
      // ถ้ามี Player อยู่แล้ว ให้แค่อัปเดต Source
      const player = playerRef.current;
      player.src({
        src: src,
        type: "application/x-mpegURL",
      });
    }

    // Cleanup Function: ทำลาย Player เมื่อ Component ถูกถอดออก (ป้องกัน Memory Leak)
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  // ฟังก์ชันสำหรับกดปุ่ม Play สีแดงตรงกลาง
  const handleOverlayPlay = () => {
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto h-screen bg-[#13141c]">
      {/* Top Bar */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4 bg-[#1f212d] px-4 py-2.5 rounded-full w-full max-w-md border border-gray-800">
          <Search className="text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Everything..."
            className="bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none w-full text-sm"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-white transition">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-600 overflow-hidden border-2 border-blue-400 cursor-pointer relative">
            <Image
              src="https://i.pravatar.cc/150?img=60"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Video Player Container */}
      <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden relative shadow-2xl group border border-gray-800/50">
        {/* Video.js Root */}
        <div ref={videoContainerRef} className="w-full h-full" />

        {/* CSS Override for Video.js (เพื่อให้เข้ากับ Design) */}
        <style jsx global>{`
          .video-js {
            width: 100% !important;
            height: 100% !important;
            background-color: transparent;
          }
          .vjs-control-bar {
            background-color: rgba(0, 0, 0, 0.7) !important;
            margin-bottom: 10px;
            width: 95% !important;
            left: 2.5%;
            border-radius: 10px;
          }
          .vjs-big-play-button {
            /* ซ่อนปุ่มเดิมของ video.js เพราะเราสร้างอันสวยๆ เองแล้ว */
            display: none !important;
          }
        `}</style>

        {/* --- CUSTOM OVERLAYS (แสดงเฉพาะตอนยังไม่เล่น) --- */}
        {!isPlaying && (
          <>
            {/* Live Badge */}
            <div className="absolute top-4 left-4 z-10 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-lg pointer-events-none">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>{" "}
              LIVE
            </div>

            {/* View Count */}
            <div className="absolute top-4 left-20 z-10 bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md border border-white/10 pointer-events-none">
              24K Watching
            </div>

            {/* Custom Play Button (Center) */}
            <div
              className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer bg-black/20 hover:bg-black/10 transition-all duration-300"
              onClick={handleOverlayPlay}
            >
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition duration-300 border border-white/20">
                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                  <PlayCircle className="text-white fill-white w-7 h-7 ml-1" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Stream Info */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white leading-tight">
            Renegades vs Chiefs - ESL Pro League Season 16 - Playoffs
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3v2QyqDq-4wX9Xj2e6F3z3Zq4y9w8e7r0tQ&s"
                  className="rounded-sm object-cover"
                  alt="game icon"
                  fill
                />
              </div>
              <span className="text-blue-400 font-medium hover:text-blue-300 cursor-pointer">
                League of Legends
              </span>
            </div>
            <span className="text-gray-600">•</span>
            <span className="px-2 py-0.5 bg-[#1f212d] border border-gray-700 rounded text-xs text-gray-300">
              English
            </span>
            <span className="px-2 py-0.5 bg-[#1f212d] border border-gray-700 rounded text-xs text-gray-300">
              Esports
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <ActionButton icon={<Heart className="w-5 h-5" />} text="Like" />
          <ActionButton icon={<Share2 className="w-5 h-5" />} text="Share" />
          <button className="p-3 bg-[#1f212d] border border-gray-700 rounded-xl hover:bg-gray-700 text-white transition shadow-sm">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Placeholder for Related Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Content... */}
      </div>
    </div>
  );
};

export default MainContent;
