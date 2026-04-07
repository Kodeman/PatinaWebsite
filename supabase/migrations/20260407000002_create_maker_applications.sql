-- Maker applications table
CREATE TABLE IF NOT EXISTS maker_applications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    brand_name text NOT NULL,
    contact_name text NOT NULL,
    email text NOT NULL,
    website text,
    description text,
    referral_source text,
    status text CHECK (status IN ('pending', 'reviewed', 'accepted', 'declined')) DEFAULT 'pending',
    reviewed_at timestamp with time zone,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Indexes
CREATE INDEX idx_maker_applications_email ON maker_applications(email);
CREATE INDEX idx_maker_applications_status ON maker_applications(status);
CREATE INDEX idx_maker_applications_created_at ON maker_applications(created_at);

-- RLS
ALTER TABLE maker_applications ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (used by API routes with supabaseAdmin)
-- No public access needed since applications go through our API route

-- Reuse the updated_at trigger function (created in previous migration)
CREATE TRIGGER update_maker_applications_updated_at
    BEFORE UPDATE ON maker_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
