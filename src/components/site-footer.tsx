import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[image:var(--gradient-accent)] font-bold">
              GS
            </div>
            <div>
              <div className="font-semibold">G.S. Express Pvt. Ltd.</div>
              <div className="text-xs opacity-70">Anand Group</div>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Building the Future. A leading EPC partner delivering large-scale infrastructure across India since 2006.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-80">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="opacity-80 hover:opacity-100">About Us</Link></li>
            <li><Link to="/businesses" className="opacity-80 hover:opacity-100">Businesses</Link></li>
            <li><Link to="/capabilities" className="opacity-80 hover:opacity-100">Capabilities</Link></li>
            <li><Link to="/projects" className="opacity-80 hover:opacity-100">Projects</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-80">Sectors</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>Roads & Highways</li>
            <li>Bridges, Flyovers, ROBs & RUBs</li>
            <li>Railway Infrastructure</li>
            <li>Institutional Buildings</li>
            <li>Urban Infrastructure</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider opacity-80">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />5/203A, Vineet Khand, Gomti Nagar, Lucknow (U.P.) - 226010</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" />+91 522-2983700 / +91 9415008643</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" />theanandgroup@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-70 lg:flex-row lg:px-8">
          <div>© {new Date().getFullYear()} G.S. Express Pvt. Ltd. All rights reserved.</div>
          <div>EPC • Engineering • Procurement • Construction</div>
        </div>
      </div>
    </footer>
  );
}
