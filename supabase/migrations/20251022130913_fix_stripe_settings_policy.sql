-- Allow full access to stripe_settings (functions need to read these)
CREATE POLICY "Allow full access to stripe_settings"
  ON stripe_settings FOR ALL
  USING (true)
  WITH CHECK (true);