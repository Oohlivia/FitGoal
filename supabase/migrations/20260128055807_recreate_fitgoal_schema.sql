/*
  # Recreate FitGoal Schema

  1. Drop existing tables
  2. Create new tables with updated schema
  3. Set up RLS policies
*/

DROP TABLE IF EXISTS meal_plans CASCADE;
DROP TABLE IF EXISTS workout_programs CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;

CREATE TABLE user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer,
  sex text,
  height_cm integer,
  weight_kg numeric,
  
  fitness_goal text NOT NULL,
  experience_level text NOT NULL,
  days_per_week integer NOT NULL DEFAULT 3,
  session_duration integer NOT NULL DEFAULT 45,
  equipment text[] DEFAULT ARRAY[]::text[],
  constraints text[] DEFAULT ARRAY[]::text[],
  workout_style text NOT NULL,
  
  dietary_style text NOT NULL,
  allergens text[] DEFAULT ARRAY[]::text[],
  favorite_ingredients text[] DEFAULT ARRAY[]::text[],
  disliked_ingredients text[] DEFAULT ARRAY[]::text[],
  meals_per_day integer NOT NULL DEFAULT 3,
  meal_prep_time integer NOT NULL DEFAULT 30,
  cooking_tools text[] DEFAULT ARRAY[]::text[],
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE workout_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  program_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE meal_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  plan_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert profiles"
  ON user_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update profiles"
  ON user_profiles FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete profiles"
  ON user_profiles FOR DELETE
  USING (true);

CREATE POLICY "Anyone can view workout programs"
  ON workout_programs FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert workout programs"
  ON workout_programs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete workout programs"
  ON workout_programs FOR DELETE
  USING (true);

CREATE POLICY "Anyone can view meal plans"
  ON meal_plans FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert meal plans"
  ON meal_plans FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can delete meal plans"
  ON meal_plans FOR DELETE
  USING (true);
