import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — G.S. Express Pvt. Ltd." },
      { name: "description", content: "Get in touch with G.S. Express Pvt. Ltd. — head office in Gomti Nagar, Lucknow." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Contact</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-6xl">Get in Touch</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">
            Talk to our team about EPC partnerships, tenders, careers or media enquiries.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-5 lg:px-8">
        <div className="space-y-6 lg:col-span-2">
          <InfoCard icon={MapPin} title="Registered Office">
            5/203A, Vineet Khand, Gomti Nagar, Lucknow (U.P.) — 226010
          </InfoCard>
          <InfoCard icon={Phone} title="Phone">
            <a href="tel:+918009230007" className="hover:text-primary block">+91 8009230007 — Sandeep Anand (MD)</a>
            <a href="tel:+915222983700" className="hover:text-primary block">+91 522-2983700 — Office</a>
            <a href="tel:+919415008643" className="hover:text-primary block">+91 9415008643</a>
          </InfoCard>
          <InfoCard icon={Mail} title="Email">
            <a href="mailto:theanandgroup@gmail.com" className="hover:text-primary">theanandgroup@gmail.com</a>
          </InfoCard>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="lg:col-span-3 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
        >
          <h2 className="text-2xl font-bold text-foreground">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">We typically respond within 1–2 business days.</p>

          {sent ? (
            <div className="mt-8 flex flex-col items-center rounded-lg bg-secondary p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">Thank you</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your message has been received. Our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" />
              <Field label="Company" name="company" />
              <div className="sm:col-span-2">
                <Field label="Subject" name="subject" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <textarea
                  required
                  rows={5}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-[image:var(--gradient-accent)] px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md hover:opacity-95"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="mt-3 text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-foreground">{label}{required && <span className="text-destructive"> *</span>}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
