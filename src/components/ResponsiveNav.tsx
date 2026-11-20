import { useEffect, useId, useState, type ReactNode } from "react";

const inkLinkClass =
  "rounded-full px-3 py-2 hover:bg-white/80 hover:text-[#0B1B4A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A5CFF]";
const inverseLinkClass =
  "rounded-full px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

type NavItem = {
  href: string;
  label: string;
};

type ResponsiveNavProps = {
  items: readonly NavItem[];
  action?: ReactNode;
  tone?: "ink" | "inverse";
  /** Viewport where the row of links replaces the menu button. */
  expandAt?: "lg" | "1100";
};

export default function ResponsiveNav({ items, action, tone = "ink", expandAt = "lg" }: ResponsiveNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const inverse = tone === "inverse";
  const linkClass = inverse ? inverseLinkClass : inkLinkClass;
  const rowClass =
    expandAt === "1100"
      ? "hidden min-[1100px]:flex items-center gap-1 text-sm font-semibold"
      : "hidden lg:flex items-center gap-1 text-sm font-semibold";
  const actionClass = expandAt === "1100" ? "hidden min-[1100px]:block" : "hidden lg:block";
  const menuButtonClass =
    expandAt === "1100"
      ? "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold ring-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-[1100px]:hidden"
      : "inline-flex min-h-11 items-center rounded-full px-3 text-sm font-semibold ring-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden";
  const panelClass =
    expandAt === "1100"
      ? "absolute inset-x-0 top-full z-40 border-b px-4 py-4 shadow-lg min-[1100px]:hidden"
      : "absolute inset-x-0 top-full z-40 border-b px-4 py-4 shadow-lg lg:hidden";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav
        className={`${rowClass} ${inverse ? "text-white/90" : "text-[#0B1B4A]/75"}`}
        aria-label="Primary"
      >
        {items.map((item) => (
          <a key={item.href} className={linkClass} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      {action ? <div className={actionClass}>{action}</div> : null}
      <button
        type="button"
        className={`${menuButtonClass} ${inverse ? "text-white ring-white/30 focus-visible:outline-white" : "text-[#0B1B4A] ring-[#0B1B4A]/15 focus-visible:outline-[#0A5CFF]"}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        <nav
          id={menuId}
          aria-label="Primary"
          className={`${panelClass} ${inverse ? "border-white/10 bg-[#0B1B4A]" : "border-[#0B1B4A]/8 bg-[#F4F0FF]"}`}
        >
          <ul className={`flex flex-col gap-1 text-base font-semibold ${inverse ? "text-white" : "text-[#0B1B4A]"}`}>
            {items.map((item) => (
              <li key={item.href}>
                <a className={`${linkClass} block`} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          {action ? <div className="mt-4">{action}</div> : null}
        </nav>
      ) : null}
    </>
  );
}
