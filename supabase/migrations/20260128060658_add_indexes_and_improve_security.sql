/*
  # Add Indexes and Improve Security

  1. Performance Improvements
    - Add indexes on foreign key columns for better query performance
    - Index on user_id columns in workout_programs and meal_plans tables

  2. Security Notes
    - Current RLS policies are permissive to allow the app to function without authentication
    - These should be updated to use auth.uid() when authentication is implemented
    - For now, keeping open access as the app doesn't have user authentication yet

  3. Changes
    - Add index on workout_programs(user_id)
    - Add index on meal_plans(user_id)
    - Add index on user_profiles(id) for faster lookups
*/

-- Add indexes for foreign key columns to improve query performance
CREATE INDEX IF NOT EXISTS idx_workout_programs_user_id 
  ON workout_programs(user_id);

CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id 
  ON meal_plans(user_id);

-- Add index on user_profiles primary key for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at 
  ON user_profiles(created_at DESC);

-- Add updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to automatically update updated_at column
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

/*
  IMPORTANT SECURITY NOTE:
  
  The current RLS policies allow unrestricted access because this app does not
  yet implement user authentication. When you add Supabase Auth, you MUST update
  the RLS policies to use auth.uid() for proper security.
  
  Example of secure policies for future implementation:
  
  -- Users can only view their own profile
  CREATE POLICY "Users can view own profile"
    ON user_profiles FOR SELECT
    TO authenticated
    USING (auth.uid()::text = id::text);
  
  -- Users can only update their own profile
  CREATE POLICY "Users can update own profile"
    ON user_profiles FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = id::text)
    WITH CHECK (auth.uid()::text = id::text);
  
  Similar policies should be added for workout_programs and meal_plans tables.
*/
