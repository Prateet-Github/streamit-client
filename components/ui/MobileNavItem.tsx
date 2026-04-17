import Link from "next/link";

export default function MobileNavItem({
  href,
  icon: Icon,
  label,
  active,
}: {
  href: string;
  icon: any;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-90"
    >
      <Icon
        size={20}
        strokeWidth={active ? 2.5 : 2}
        className={active ? "text-green-500" : "text-slate-500"}
      />
      <span
        className={`text-[9px] font-mono uppercase tracking-widest ${active ? "text-green-500 font-bold" : "text-slate-600"}`}
      >
        {label}
      </span>
    </Link>
  );
}
