-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy for users to update their own profile  
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create policy for admins to view all profiles
-- First, create an admins table
CREATE TABLE IF NOT EXISTS public.admins (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on admins table
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Only admins can view admins table
CREATE POLICY "Only admins can view admins" ON public.admins
  FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM public.admins));

-- Admin can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT
  USING (
    auth.uid() IN (SELECT user_id FROM public.admins)
  );

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert your admin email (REPLACE WITH YOUR ACTUAL ADMIN EMAIL)
-- First, you need to sign up with this email, then run this:
-- INSERT INTO public.admins (user_id, email)
-- SELECT id, email FROM auth.users WHERE email = 'your-admin-email@example.com'
-- ON CONFLICT (user_id) DO NOTHING;
