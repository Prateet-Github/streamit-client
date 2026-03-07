type ProfileDropdownProps = {
  closeDropdown: () => void;
};

export default function ProfileDropdown({
  closeDropdown,
}: ProfileDropdownProps) {
  return (
    <div className="absolute right-0 top-12 w-48 bg-black border border-white/10 rounded-lg shadow-lg">
      <button
        className="block w-full p-3 text-left hover:bg-white/10"
        onClick={closeDropdown}
      >
        Profile
      </button>

      <button
        className="block w-full p-3 text-left hover:bg-white/10"
        onClick={closeDropdown}
      >
        Logout
      </button>
    </div>
  );
}
