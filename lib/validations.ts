import { z } from 'zod'

export const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().optional(),
  sex: z.enum(['male', 'female', 'other']).optional(),
  height_cm: z.string().optional(),
  weight_kg: z.string().optional(),
})

export const step2Schema = z.object({
  fitness_goal: z.enum(['fat_loss', 'muscle_gain', 'maintenance', 'strength', 'endurance', 'mobility']),
  experience_level: z.enum(['beginner', 'intermediate', 'advanced']),
  days_per_week: z.string().min(1, 'Please select days per week'),
  session_duration: z.string().min(1, 'Please select session duration'),
  workout_style: z.enum(['hiit', 'bodybuilding', 'powerlifting', 'pilates', 'running', 'mixed']),
})

export const step3Schema = z.object({
  equipment: z.array(z.enum(['none', 'dumbbells', 'barbell', 'full_gym', 'bands', 'kettlebells'])).min(1, 'Select at least one equipment option'),
  constraints: z.array(z.enum(['knee_issues', 'low_back', 'shoulder', 'pregnancy_postpartum'])),
})

export const step4Schema = z.object({
  dietary_style: z.enum(['none', 'high_protein', 'low_carb', 'vegetarian', 'vegan', 'pescatarian']),
  allergens: z.array(z.enum(['nuts', 'dairy', 'gluten', 'shellfish', 'eggs'])),
  favorite_ingredients: z.array(z.string()).min(1, 'Add at least one favorite ingredient'),
  disliked_ingredients: z.array(z.string()),
  meals_per_day: z.string().min(1, 'Please select meals per day'),
  meal_prep_time: z.string().min(1, 'Please select meal prep time'),
  cooking_tools: z.array(z.enum(['microwave', 'air_fryer', 'stove', 'oven', 'slow_cooker'])).min(1, 'Select at least one cooking tool'),
})

export const completeOnboardingSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
})

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type Step3Data = z.infer<typeof step3Schema>
export type Step4Data = z.infer<typeof step4Schema>
export type CompleteOnboardingData = z.infer<typeof completeOnboardingSchema>
