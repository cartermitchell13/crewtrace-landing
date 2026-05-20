-- Add company name to calculator submissions
ALTER TABLE public.calculator_submissions
ADD COLUMN IF NOT EXISTS company TEXT;
