-- Founding 50 designer applications (marketing site, pre-auth)
-- Separate from public.designer_applications which is for in-platform
-- applications tied to auth.users.
CREATE TABLE IF NOT EXISTS founding_designer_applications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    company text,
    website text,
    motivation text,
    referral_source text,
    status text CHECK (status IN ('pending', 'reviewed', 'accepted', 'declined')) DEFAULT 'pending',
    reviewed_at timestamp with time zone,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_founding_designer_applications_email ON founding_designer_applications(email);
CREATE INDEX IF NOT EXISTS idx_founding_designer_applications_status ON founding_designer_applications(status);
CREATE INDEX IF NOT EXISTS idx_founding_designer_applications_created_at ON founding_designer_applications(created_at);

-- RLS — service role only, API route uses supabaseAdmin
ALTER TABLE founding_designer_applications ENABLE ROW LEVEL SECURITY;

-- Reuse the updated_at trigger function created in earlier migrations
CREATE TRIGGER update_founding_designer_applications_updated_at
    BEFORE UPDATE ON founding_designer_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
