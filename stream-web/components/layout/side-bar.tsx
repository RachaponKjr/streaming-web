import { Compass, Home, Menu, PlayCircle, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const NavItem = ({
  icon,
  active,
}: {
  icon: React.ReactNode;
  active?: boolean;
}) => (
  <div
    className={`p-3 rounded-xl cursor-pointer transition ${
      active
        ? "text-white bg-gray-800"
        : "text-gray-500 hover:text-white hover:bg-gray-800"
    }`}
  >
    {icon}
  </div>
);

const Sidebar = () => {
  return (
    <div className="w-20 shrink-0 bg-[#1a1b26] flex flex-col items-center py-6 border-r border-gray-800 overflow-y-auto md:flex">
      {/* Menu Icons */}
      <div className="space-y-6 mb-10">
        <div className="p-3 bg-blue-600 rounded-xl cursor-pointer hover:bg-blue-500 transition shadow-lg shadow-blue-500/30">
          <Menu className="text-white w-6 h-6" />
        </div>
        <NavItem icon={<Home className="w-6 h-6" />} active />
        <NavItem icon={<Compass className="w-6 h-6" />} />
        <NavItem icon={<PlayCircle className="w-6 h-6" />} />
        <NavItem icon={<Users className="w-6 h-6" />} />
      </div>

      {/* Following List (Avatars) */}
      <div className="flex-1 w-full flex flex-col items-center gap-4 border-t border-gray-800 pt-6">
        <p className="text-xs text-gray-500 font-semibold mb-2">Watching</p>
        {/* {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="relative cursor-pointer group">
            <div
              className={`w-10 h-10 rounded-full bg-linear-to-tr from-purple-500 to-blue-500 p-[2px]`}
            >
              <Image
                src={`https://i.pravatar.cc/150?img=${i + 10}`}
                alt="User"
                className="w-full h-full rounded-full border-2 border-[#1a1b26]"
                width={40}
                height={40}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1b26]"></div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Sidebar;
