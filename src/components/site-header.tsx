import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/businesses", label: "Businesses" },
  { to: "/projects", label: "Projects" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/djoqadjge/image/upload/v1778152667/company-logo_xu0vrj.png"
            alt="G.S. Express Pvt. Ltd. logo"
            className="h-10 w-auto"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-foreground">G.S. Express</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pvt. Ltd.</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href="tel:+918009230007"
            className="ml-3 inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-accent)] px-4 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:opacity-95"
          >
            <Phone className="h-4 w-4" /> +91 8009230007
          </a>
        </nav>
        <button
          aria-label="Toggle menu"
          className="lg:hidden rounded-md p-2 hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
