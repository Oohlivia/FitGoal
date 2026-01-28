export type FitnessGoal = 'fat_loss' | 'muscle_gain' | 'maintenance' | 'strength' | 'endurance' | 'mobility'
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type WorkoutStyle = 'hiit' | 'bodybuilding' | 'powerlifting' | 'pilates' | 'running' | 'mixed'
export type DietaryStyle = 'none' | 'high_protein' | 'low_carb' | 'vegetarian' | 'vegan' | 'pescatarian'
export type Equipment = 'none' | 'dumbbells' | 'barbell' | 'full_gym' | 'bands' | 'kettlebells'
export type CookingTool = 'microwave' | 'air_fryer' | 'stove' | 'oven' | 'slow_cooker'
export type Constraint = 'knee_issues' | 'low_back' | 'shoulder' | 'pregnancy_postpartum'
export type Allergen = 'nuts' | 'dairy' | 'gluten' | 'shellfish' | 'eggs'

export interface UserProfile {
  id: string
  name: string
  age?: number
  sex?: 'male' | 'female' | 'other'
  height_cm?: number
  weight_kg?: number

  fitness_goal: FitnessGoal
  experience_level: ExperienceLevel
  days_per_week: number
  session_duration: number
  equipment: Equipment[]
  constraints: Constraint[]
  workout_style: WorkoutStyle

  dietary_style: DietaryStyle
  allergens: Allergen[]
  favorite_ingredients: string[]
  disliked_ingredients: string[]
  meals_per_day: number
  meal_prep_time: number
  cooking_tools: CookingTool[]

  created_at: string
  updated_at: string
}

export interface OnboardingFormData {
  name: string
  age?: string
  sex?: 'male' | 'female' | 'other'
  height_cm?: string
  weight_kg?: string

  fitness_goal: FitnessGoal
  experience_level: ExperienceLevel
  days_per_week: string
  session_duration: string
  equipment: Equipment[]
  constraints: Constraint[]
  workout_style: WorkoutStyle

  dietary_style: DietaryStyle
  allergens: Allergen[]
  favorite_ingredients: string[]
  disliked_ingredients: string[]
  meals_per_day: string
  meal_prep_time: string
  cooking_tools: CookingTool[]
}

export interface Exercise {
  id: string
  name: string
  muscle_groups: string[]
  equipment: Equipment[]
  movement_pattern: string
  difficulty: ExperienceLevel
  constraint_flags: Constraint[]
  substitutions: string[]
}

export interface Recipe {
  id: string
  name: string
  ingredients: string[]
  prep_time: number
  cook_time: number
  servings: number
  dietary_tags: DietaryStyle[]
  allergens: Allergen[]
  cooking_tools: CookingTool[]
  instructions: string[]
  calories: number
  protein: number
  carbs: number
  fats: number
  storage_tips: string
}

export interface WorkoutDay {
  day: number
  name: string
  warm_up: Exercise[]
  main_lifts: Exercise[]
  accessories: Exercise[]
  finisher?: Exercise[]
  cooldown: Exercise[]
}

export interface WorkoutProgram {
  id: string
  user_id: string
  weeks: {
    week: number
    days: WorkoutDay[]
  }[]
  created_at: string
}

export interface MealPlan {
  id: string
  user_id: string
  days: {
    day: number
    breakfast?: Recipe
    lunch?: Recipe
    dinner?: Recipe
    snack?: Recipe
  }[]
  grocery_list: {
    ingredient: string
    quantity: string
    category: string
  }[]
  created_at: string
}
