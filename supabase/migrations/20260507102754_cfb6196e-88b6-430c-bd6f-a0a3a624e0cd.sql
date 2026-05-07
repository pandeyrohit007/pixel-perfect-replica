
-- Contact submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Career applications
CREATE TABLE public.career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience NUMERIC,
  location TEXT,
  position TEXT NOT NULL,
  qualification TEXT,
  cover_letter TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can apply" ON public.career_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Resume storage bucket (public read so admins can preview via URL; uploads via anon allowed)
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can upload resumes" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Public can read resumes" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'resumes');
