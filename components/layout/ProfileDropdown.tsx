import Image from "next/image";
import { useCurrentUser } from "@/queries/auth";
import { User, Upload, Settings, LogOut } from "lucide-react";
import useLogout from "@/hooks/useLogout";

type ProfileDropdownProps = {
  closeDropdown: () => void;
};

export default function ProfileDropdown({
  closeDropdown,
}: ProfileDropdownProps) {
  const { data: currentUser, isLoading } = useCurrentUser();
  const logout = useLogout();

  const menuItems = [
    {
      icon: User,
      label: "Profile",
    },
    {
      icon: Upload,
      label: "Upload Video",
    },
    {
      icon: Settings,
      label: "Settings",
    },
  ];

  if (isLoading) {
    return (
      <div className="absolute right-0 top-12 w-72 p-4 bg-black border border-green-500 rounded-lg shadow-lg">
        <p className="text-sm text-white/70">Loading...</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-12 w-72 p-4 bg-black  rounded-lg shadow-lg flex flex-col gap-4">
      {/* User Info */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/pfp.jpg"
          alt="profile"
          width={40}
          height={40}
          className="rounded-full hover:scale-105 transition cursor-pointer"
        />

        <p className="font-medium text-white">{currentUser?.username}</p>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-1 border-y border-green-500/40 py-3">
        {menuItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            onClick={closeDropdown}
            className="flex items-center gap-3 w-full text-left p-2 rounded hover:bg-white/10 hover:text-green-400 transition"
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          closeDropdown();
        }}
        className="flex items-center cursor-pointer gap-3 w-full text-left p-2 rounded hover:bg-red-500/10 text-red-400 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
