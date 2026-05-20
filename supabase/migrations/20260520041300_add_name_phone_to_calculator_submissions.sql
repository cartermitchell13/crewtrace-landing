-- Migration to add name and phone columns to public.calculator_submissions
ALTER TABLE public.calculator_submissions
ADD COLUMN IF NOT EXISTS name TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;
