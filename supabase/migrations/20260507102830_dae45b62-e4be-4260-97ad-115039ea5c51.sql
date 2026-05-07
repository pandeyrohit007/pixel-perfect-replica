
-- Length limits on contact_submissions
ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT contact_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT contact_phone_len CHECK (phone IS NULL OR char_length(phone) <= 40),
  ADD CONSTRAINT contact_company_len CHECK (company IS NULL OR char_length(company) <= 160),
  ADD CONSTRAINT contact_subject_len CHECK (subject IS NULL OR char_length(subject) <= 200),
  ADD CONSTRAINT contact_message_len CHECK (char_length(message) BETWEEN 1 AND 5000);

-- Length limits on career_applications
ALTER TABLE public.career_applications
  ADD CONSTRAINT career_name_len CHECK (char_length(name) BETWEEN 1 AND 120),
  ADD CONSTRAINT career_email_len CHECK (char_length(email) BETWEEN 3 AND 255),
  ADD CONSTRAINT career_phone_len CHECK (char_length(phone) BETWEEN 3 AND 40),
  ADD CONSTRAINT career_location_len CHECK (location IS NULL OR char_length(location) <= 160),
  ADD CONSTRAINT career_position_len CHECK (char_length(position) BETWEEN 1 AND 160),
  ADD CONSTRAINT career_qualification_len CHECK (qualification IS NULL OR char_length(qualification) <= 200),
  ADD CONSTRAINT career_cover_len CHECK (cover_letter IS NULL OR char_length(cover_letter) <= 5000),
  ADD CONSTRAINT career_resume_len CHECK (resume_url IS NULL OR char_length(resume_url) <= 1000),
  ADD CONSTRAINT career_exp_range CHECK (experience IS NULL OR (experience >= 0 AND experience <= 70));

-- Make resumes bucket private with file-type and size limits
UPDATE storage.buckets
SET public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
WHERE id = 'resumes';

-- Drop the broad public read policy; uploads still allowed for anon
DROP POLICY IF EXISTS "Public can read resumes" ON storage.objects;
