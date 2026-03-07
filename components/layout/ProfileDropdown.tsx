import Image from "next/image";
import { useCurrentUser } from "@/queries/auth";

type ProfileDropdownProps = {
  closeDropdown: () => void;
};

export default function ProfileDropdown({
  closeDropdown,
}: ProfileDropdownProps) {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="absolute flex flex-col gap-4 right-0 top-12 w-72 p-4 bg-black border border-green-500 rounded-lg shadow-lg">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="absolute flex flex-col gap-4 right-0 top-12 w-72 p-4 bg-black border border-green-500 rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-2">
        <Image
          src="/pfp.jpg"
          alt="pfp"
          width={40}
          height={40}
          className="rounded-full border-2 border-green-500 hover:scale-105 transition-transform transition-duration-200 cursor-pointer"
        />
        <p>{currentUser?.username || "Loading..."}</p>
      </div>
      <div className="flex border-y border-green-500/50 flex-col gap-2 py-4">
        <button
          className="block w-full text-left hover:bg-white/10 p-2 rounded cursor-pointer"
          onClick={closeDropdown}
        >
          Profile
        </button>

        <button
          className="block w-full text-left hover:bg-white/10 p-2 rounded cursor-pointer"
          onClick={closeDropdown}
        >
          Profile
        </button>

        <button
          className="block w-full text-left hover:bg-white/10 p-2 rounded cursor-pointer"
          onClick={closeDropdown}
        >
          Profile
        </button>
      </div>

      <button
        className="block w-full text-left hover:bg-white/10 p-2 rounded cursor-pointer"
        onClick={closeDropdown}
      >
        Logout
      </button>
    </div>
  );
}
