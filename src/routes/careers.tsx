import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Send, CheckCircle2, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — G.S. Express Pvt. Ltd." },
      { name: "description", content: "Join G.S. Express Pvt. Ltd. — apply for roles in EPC, railway, roads, and infrastructure projects." },
      { property: "og:title", content: "Careers — G.S. Express Pvt. Ltd." },
      { property: "og:description", content: "Build your career with one of India's growing infrastructure and EPC companies." },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const position = String(fd.get("position") || "").trim();
    if (!name || !email || !phone || !position) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const expRaw = String(fd.get("experience") || "").trim();
    const resumeFile = fd.get("resume") as File | null;
    setLoading(true);

    let resume_url: string | null = null;
    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.size > 5 * 1024 * 1024) {
        setLoading(false);
        toast.error("Resume must be under 5MB.");
        return;
      }
      const ext = resumeFile.name.split(".").pop() || "pdf";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("resumes").upload(path, resumeFile, {
        contentType: resumeFile.type,
        upsert: false,
      });
      if (upErr) {
        setLoading(false);
        toast.error("Could not upload resume. Please try again.");
        return;
      }
      resume_url = path;
    }

    const { error } = await supabase.from("career_applications").insert({
      name,
      email,
      phone,
      experience: expRaw ? Number(expRaw) : null,
      location: String(fd.get("location") || "").trim() || null,
      position,
      qualification: String(fd.get("qualification") || "").trim() || null,
      cover_letter: String(fd.get("message") || "").trim() || null,
      resume_url,
    });
    setLoading(false);
    if (error) {
      toast.error("Could not submit application. Please try again.");
      return;
    }
    setSent(true);
  }

  return (
    <>
      <section className="bg-[image:var(--gradient-hero)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-28">
          <div className="text-xs font-semibold uppercase tracking-widest text-accent">Careers</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight lg:text-6xl">Build Your Future With Us</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">
            We're always looking for engineers, project managers, and skilled professionals who want to shape India's infrastructure.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-5 lg:px-8">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground">Why join G.S. Express?</h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80 leading-relaxed">
              <li>• Work on landmark railway, roads, bridges, and institutional projects across India</li>
              <li>• Learn from industry veterans with decades of EPC experience</li>
              <li>• Competitive compensation and clear growth paths</li>
              <li>• Site exposure across multiple states and disciplines</li>
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-foreground">Open areas</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {["Civil Engineer", "Project Manager", "Site Supervisor", "QA/QC", "Surveyor", "Safety Officer", "Accounts", "Procurement"].map((r) => (
                <span key={r} className="rounded-full bg-secondary px-3 py-1 text-foreground/80">{r}</span>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
        >
          <h2 className="text-2xl font-bold text-foreground">Apply Now</h2>
          <p className="mt-1 text-sm text-muted-foreground">Fill in your details and our HR team will reach out.</p>

          {sent ? (
            <div className="mt-8 flex flex-col items-center rounded-lg bg-secondary p-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-accent" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">Application received</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Thank you for applying. We'll review your profile and get in touch shortly.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" required />
              <Field label="Years of experience" name="experience" type="number" />
              <Field label="Current location" name="location" />
              <Field label="Position applying for" name="position" required />
              <div className="sm:col-span-2">
                <Field label="Highest qualification" name="qualification" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Cover letter / About you</label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={5000}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us briefly about your experience and why you'd like to join us."
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-foreground">Upload Resume (PDF/DOC, max 5MB)</label>
                <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-input bg-background px-3 py-4 text-sm text-muted-foreground hover:bg-secondary">
                  <Upload className="h-4 w-4" />
                  <span>{fileName ?? "Click to upload your resume"}</span>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-[image:var(--gradient-accent)] px-6 py-3 text-sm font-semibold text-accent-foreground shadow-md hover:opacity-95 disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}{required && <span className="text-destructive"> *</span>}
      </label>
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
