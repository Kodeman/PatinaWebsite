-- Designer applications table (Founding 50)
CREATE TABLE IF NOT EXISTS designer_applications (
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

-- Indexes
CREATE INDEX idx_designer_applications_email ON designer_applications(email);
CREATE INDEX idx_designer_applications_status ON designer_applications(status);
CREATE INDEX idx_designer_applications_created_at ON designer_applications(created_at);

-- RLS — service role only, API route uses supabaseAdmin
ALTER TABLE designer_applications ENABLE ROW LEVEL SECURITY;

-- Reuse the updated_at trigger function from earlier migrations
CREATE TRIGGER update_designer_applications_updated_at
    BEFORE UPDATE ON designer_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
