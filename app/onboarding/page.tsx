'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { useOnboardingStore, useAppStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  type Step1Data,
  type Step2Data,
  type Step3Data,
  type Step4Data,
} from '@/lib/validations'

export default function Onboarding() {
  const router = useRouter()
  const { formData, setFormData, currentStep, setCurrentStep, resetOnboarding } = useOnboardingStore()
  const { setUserId } = useAppStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 4

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: formData.name || '',
      age: formData.age || '',
      sex: formData.sex,
      height_cm: formData.height_cm || '',
      weight_kg: formData.weight_kg || '',
    },
  })

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      fitness_goal: formData.fitness_goal || 'maintenance',
      experience_level: formData.experience_level || 'beginner',
      days_per_week: formData.days_per_week || '3',
      session_duration: formData.session_duration || '45',
      workout_style: formData.workout_style || 'mixed',
    },
  })

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      equipment: formData.equipment || [],
      constraints: formData.constraints || [],
    },
  })

  const step4Form = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      dietary_style: formData.dietary_style || 'none',
      allergens: formData.allergens || [],
      favorite_ingredients: formData.favorite_ingredients || [],
      disliked_ingredients: formData.disliked_ingredients || [],
      meals_per_day: formData.meals_per_day || '3',
      meal_prep_time: formData.meal_prep_time || '30',
      cooking_tools: formData.cooking_tools || [],
    },
  })

  const [newFavoriteIngredient, setNewFavoriteIngredient] = useState('')
  const [newDislikedIngredient, setNewDislikedIngredient] = useState('')

  const handleNext = async () => {
    let isValid = false
    let data: any = {}

    if (currentStep === 1) {
      isValid = await step1Form.trigger()
      if (isValid) {
        data = step1Form.getValues()
      }
    } else if (currentStep === 2) {
      isValid = await step2Form.trigger()
      if (isValid) {
        data = step2Form.getValues()
      }
    } else if (currentStep === 3) {
      isValid = await step3Form.trigger()
      if (isValid) {
        data = step3Form.getValues()
      }
    }

    if (isValid) {
      setFormData(data)
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (data: Step4Data) => {
    setIsSubmitting(true)

    try {
      const allData = {
        ...formData,
        ...data,
      }

      const profileData = {
        name: allData.name!,
        age: allData.age ? parseInt(allData.age) : null,
        sex: allData.sex || null,
        height_cm: allData.height_cm ? parseInt(allData.height_cm) : null,
        weight_kg: allData.weight_kg ? parseFloat(allData.weight_kg) : null,
        fitness_goal: allData.fitness_goal!,
        experience_level: allData.experience_level!,
        days_per_week: parseInt(allData.days_per_week!),
        session_duration: parseInt(allData.session_duration!),
        equipment: allData.equipment!,
        constraints: allData.constraints!,
        workout_style: allData.workout_style!,
        dietary_style: allData.dietary_style!,
        allergens: allData.allergens!,
        favorite_ingredients: allData.favorite_ingredients!,
        disliked_ingredients: allData.disliked_ingredients!,
        meals_per_day: parseInt(allData.meals_per_day!),
        meal_prep_time: parseInt(allData.meal_prep_time!),
        cooking_tools: allData.cooking_tools!,
      }

      const { data: profile, error } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select()
        .single()

      if (error) throw error

      setUserId(profile.id)
      resetOnboarding()
      router.push('/dashboard')
    } catch (error) {
      console.error('Error creating profile:', error)
      alert('Failed to create profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Get Started with FitGoal</h1>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {currentStep === 1 && (
          <form className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600">Basic information to personalize your experience.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...step1Form.register('name')}
                  placeholder="Your name"
                  className="mt-1"
                />
                {step1Form.formState.errors.name && (
                  <p className="text-sm text-red-600 mt-1">{step1Form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age (optional)</Label>
                  <Input
                    id="age"
                    type="number"
                    {...step1Form.register('age')}
                    placeholder="25"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="sex">Sex (optional)</Label>
                  <select
                    id="sex"
                    {...step1Form.register('sex')}
                    className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="height_cm">Height (cm)</Label>
                  <Input
                    id="height_cm"
                    type="number"
                    {...step1Form.register('height_cm')}
                    placeholder="170"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="weight_kg">Weight (kg)</Label>
                  <Input
                    id="weight_kg"
                    type="number"
                    step="0.1"
                    {...step1Form.register('weight_kg')}
                    placeholder="70"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Fitness Goals</h2>
              <p className="text-gray-600">Tell us what you want to achieve.</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Primary Fitness Goal *</Label>
                <RadioGroup
                  value={step2Form.watch('fitness_goal')}
                  onValueChange={(value) => step2Form.setValue('fitness_goal', value as any)}
                  className="mt-3 grid gap-3"
                >
                  {[
                    { value: 'fat_loss', label: 'Fat Loss', desc: 'Burn fat and lose weight' },
                    { value: 'muscle_gain', label: 'Muscle Gain', desc: 'Build muscle mass' },
                    { value: 'maintenance', label: 'Maintenance', desc: 'Stay fit and healthy' },
                    { value: 'strength', label: 'Strength', desc: 'Get stronger' },
                    { value: 'endurance', label: 'Endurance', desc: 'Improve stamina' },
                    { value: 'mobility', label: 'Mobility', desc: 'Increase flexibility' },
                  ].map((goal) => (
                    <div key={goal.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={goal.value} id={goal.value} />
                      <Label htmlFor={goal.value} className="flex-1 cursor-pointer">
                        <div className="font-semibold">{goal.label}</div>
                        <div className="text-sm text-gray-600">{goal.desc}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {step2Form.formState.errors.fitness_goal && (
                  <p className="text-sm text-red-600 mt-1">{step2Form.formState.errors.fitness_goal.message}</p>
                )}
              </div>

              <div>
                <Label>Experience Level *</Label>
                <RadioGroup
                  value={step2Form.watch('experience_level')}
                  onValueChange={(value) => step2Form.setValue('experience_level', value as any)}
                  className="mt-3 grid gap-3"
                >
                  {[
                    { value: 'beginner', label: 'Beginner', desc: 'New to fitness' },
                    { value: 'intermediate', label: 'Intermediate', desc: 'Several months experience' },
                    { value: 'advanced', label: 'Advanced', desc: 'Years of training' },
                  ].map((level) => (
                    <div key={level.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={level.value} id={level.value} />
                      <Label htmlFor={level.value} className="flex-1 cursor-pointer">
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-sm text-gray-600">{level.desc}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="days_per_week">Days Per Week *</Label>
                  <select
                    id="days_per_week"
                    {...step2Form.register('days_per_week')}
                    className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {[2, 3, 4, 5, 6].map((days) => (
                      <option key={days} value={days}>{days} days</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="session_duration">Session Duration *</Label>
                  <select
                    id="session_duration"
                    {...step2Form.register('session_duration')}
                    className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {[20, 30, 45, 60, 75, 90].map((mins) => (
                      <option key={mins} value={mins}>{mins} minutes</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Preferred Workout Style *</Label>
                <RadioGroup
                  value={step2Form.watch('workout_style')}
                  onValueChange={(value) => step2Form.setValue('workout_style', value as any)}
                  className="mt-3 grid gap-3"
                >
                  {[
                    { value: 'hiit', label: 'HIIT', desc: 'High-intensity intervals' },
                    { value: 'bodybuilding', label: 'Bodybuilding', desc: 'Hypertrophy focus' },
                    { value: 'powerlifting', label: 'Powerlifting', desc: 'Strength focus' },
                    { value: 'pilates', label: 'Pilates', desc: 'Core and stability' },
                    { value: 'running', label: 'Running', desc: 'Cardio-based' },
                    { value: 'mixed', label: 'Mixed', desc: 'Variety of styles' },
                  ].map((style) => (
                    <div key={style.value} className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={style.value} id={`style-${style.value}`} />
                      <Label htmlFor={`style-${style.value}`} className="flex-1 cursor-pointer">
                        <div className="font-semibold">{style.label}</div>
                        <div className="text-sm text-gray-600">{style.desc}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Equipment & Constraints</h2>
              <p className="text-gray-600">Tell us what you have access to and any limitations.</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Available Equipment * (select all that apply)</Label>
                <div className="mt-3 space-y-3">
                  {[
                    { value: 'none', label: 'No Equipment / Bodyweight Only' },
                    { value: 'dumbbells', label: 'Dumbbells' },
                    { value: 'barbell', label: 'Barbell' },
                    { value: 'full_gym', label: 'Full Gym Access' },
                    { value: 'bands', label: 'Resistance Bands' },
                    { value: 'kettlebells', label: 'Kettlebells' },
                  ].map((equip) => (
                    <div key={equip.value} className="flex items-center space-x-3">
                      <Checkbox
                        id={`equipment-${equip.value}`}
                        checked={step3Form.watch('equipment')?.includes(equip.value as any)}
                        onCheckedChange={(checked) => {
                          const current = step3Form.watch('equipment') || []
                          if (checked) {
                            step3Form.setValue('equipment', [...current, equip.value as any])
                          } else {
                            step3Form.setValue('equipment', current.filter((e) => e !== equip.value))
                          }
                        }}
                      />
                      <Label htmlFor={`equipment-${equip.value}`} className="cursor-pointer">{equip.label}</Label>
                    </div>
                  ))}
                </div>
                {step3Form.formState.errors.equipment && (
                  <p className="text-sm text-red-600 mt-1">{step3Form.formState.errors.equipment.message}</p>
                )}
              </div>

              <div>
                <Label>Physical Constraints (optional)</Label>
                <p className="text-sm text-gray-600 mb-3">We'll provide alternative exercises</p>
                <div className="space-y-3">
                  {[
                    { value: 'knee_issues', label: 'Knee Issues' },
                    { value: 'low_back', label: 'Lower Back Issues' },
                    { value: 'shoulder', label: 'Shoulder Issues' },
                    { value: 'pregnancy_postpartum', label: 'Pregnancy / Postpartum' },
                  ].map((constraint) => (
                    <div key={constraint.value} className="flex items-center space-x-3">
                      <Checkbox
                        id={`constraint-${constraint.value}`}
                        checked={step3Form.watch('constraints')?.includes(constraint.value as any)}
                        onCheckedChange={(checked) => {
                          const current = step3Form.watch('constraints') || []
                          if (checked) {
                            step3Form.setValue('constraints', [...current, constraint.value as any])
                          } else {
                            step3Form.setValue('constraints', current.filter((c) => c !== constraint.value))
                          }
                        }}
                      />
                      <Label htmlFor={`constraint-${constraint.value}`} className="cursor-pointer">{constraint.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}

        {currentStep === 4 && (
          <form onSubmit={step4Form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Meal Preferences</h2>
              <p className="text-gray-600">Let's create meal plans you'll actually enjoy.</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Dietary Style *</Label>
                <RadioGroup
                  value={step4Form.watch('dietary_style')}
                  onValueChange={(value) => step4Form.setValue('dietary_style', value as any)}
                  className="mt-3 grid gap-3"
                >
                  {[
                    { value: 'none', label: 'No Restrictions' },
                    { value: 'high_protein', label: 'High Protein' },
                    { value: 'low_carb', label: 'Low Carb' },
                    { value: 'vegetarian', label: 'Vegetarian' },
                    { value: 'vegan', label: 'Vegan' },
                    { value: 'pescatarian', label: 'Pescatarian' },
                  ].map((diet) => (
                    <div key={diet.value} className="flex items-center space-x-3 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={diet.value} id={`diet-${diet.value}`} />
                      <Label htmlFor={`diet-${diet.value}`} className="flex-1 cursor-pointer font-medium">{diet.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label>Allergies (optional)</Label>
                <div className="mt-3 space-y-2">
                  {[
                    { value: 'nuts', label: 'Nuts' },
                    { value: 'dairy', label: 'Dairy' },
                    { value: 'gluten', label: 'Gluten' },
                    { value: 'shellfish', label: 'Shellfish' },
                    { value: 'eggs', label: 'Eggs' },
                  ].map((allergen) => (
                    <div key={allergen.value} className="flex items-center space-x-3">
                      <Checkbox
                        id={`allergen-${allergen.value}`}
                        checked={step4Form.watch('allergens')?.includes(allergen.value as any)}
                        onCheckedChange={(checked) => {
                          const current = step4Form.watch('allergens') || []
                          if (checked) {
                            step4Form.setValue('allergens', [...current, allergen.value as any])
                          } else {
                            step4Form.setValue('allergens', current.filter((a) => a !== allergen.value))
                          }
                        }}
                      />
                      <Label htmlFor={`allergen-${allergen.value}`} className="cursor-pointer">{allergen.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Favorite Ingredients * (add at least 1)</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    placeholder="e.g. chicken, salmon, broccoli"
                    value={newFavoriteIngredient}
                    onChange={(e) => setNewFavoriteIngredient(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (newFavoriteIngredient.trim()) {
                          const current = step4Form.watch('favorite_ingredients') || []
                          step4Form.setValue('favorite_ingredients', [...current, newFavoriteIngredient.trim()])
                          setNewFavoriteIngredient('')
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (newFavoriteIngredient.trim()) {
                        const current = step4Form.watch('favorite_ingredients') || []
                        step4Form.setValue('favorite_ingredients', [...current, newFavoriteIngredient.trim()])
                        setNewFavoriteIngredient('')
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {step4Form.watch('favorite_ingredients')?.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => {
                          const current = step4Form.watch('favorite_ingredients') || []
                          step4Form.setValue('favorite_ingredients', current.filter((_, i) => i !== index))
                        }}
                        className="ml-1 hover:text-emerald-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {step4Form.formState.errors.favorite_ingredients && (
                  <p className="text-sm text-red-600 mt-1">{step4Form.formState.errors.favorite_ingredients.message}</p>
                )}
              </div>

              <div>
                <Label>Disliked Ingredients (optional)</Label>
                <div className="mt-2 flex gap-2">
                  <Input
                    placeholder="e.g. mushrooms, olives"
                    value={newDislikedIngredient}
                    onChange={(e) => setNewDislikedIngredient(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        if (newDislikedIngredient.trim()) {
                          const current = step4Form.watch('disliked_ingredients') || []
                          step4Form.setValue('disliked_ingredients', [...current, newDislikedIngredient.trim()])
                          setNewDislikedIngredient('')
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (newDislikedIngredient.trim()) {
                        const current = step4Form.watch('disliked_ingredients') || []
                        step4Form.setValue('disliked_ingredients', [...current, newDislikedIngredient.trim()])
                        setNewDislikedIngredient('')
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {step4Form.watch('disliked_ingredients')?.map((ingredient, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => {
                          const current = step4Form.watch('disliked_ingredients') || []
                          step4Form.setValue('disliked_ingredients', current.filter((_, i) => i !== index))
                        }}
                        className="ml-1 hover:text-gray-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meals_per_day">Meals Per Day *</Label>
                  <select
                    id="meals_per_day"
                    {...step4Form.register('meals_per_day')}
                    className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {[2, 3, 4, 5].map((meals) => (
                      <option key={meals} value={meals}>{meals} meals</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="meal_prep_time">Meal Prep Time *</Label>
                  <select
                    id="meal_prep_time"
                    {...step4Form.register('meal_prep_time')}
                    className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {[15, 30, 45, 60].map((mins) => (
                      <option key={mins} value={mins}>{mins}+ minutes</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Cooking Tools * (select all that apply)</Label>
                <div className="mt-3 space-y-2">
                  {[
                    { value: 'microwave', label: 'Microwave' },
                    { value: 'air_fryer', label: 'Air Fryer' },
                    { value: 'stove', label: 'Stove' },
                    { value: 'oven', label: 'Oven' },
                    { value: 'slow_cooker', label: 'Slow Cooker' },
                  ].map((tool) => (
                    <div key={tool.value} className="flex items-center space-x-3">
                      <Checkbox
                        id={`tool-${tool.value}`}
                        checked={step4Form.watch('cooking_tools')?.includes(tool.value as any)}
                        onCheckedChange={(checked) => {
                          const current = step4Form.watch('cooking_tools') || []
                          if (checked) {
                            step4Form.setValue('cooking_tools', [...current, tool.value as any])
                          } else {
                            step4Form.setValue('cooking_tools', current.filter((t) => t !== tool.value))
                          }
                        }}
                      />
                      <Label htmlFor={`tool-${tool.value}`} className="cursor-pointer">{tool.label}</Label>
                    </div>
                  ))}
                </div>
                {step4Form.formState.errors.cooking_tools && (
                  <p className="text-sm text-red-600 mt-1">{step4Form.formState.errors.cooking_tools.message}</p>
                )}
              </div>
            </div>
          </form>
        )}

        <div className="flex gap-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex-1"
          >
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={step4Form.handleSubmit(handleSubmit)}
              disabled={isSubmitting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Your Profile...
                </>
              ) : (
                <>
                  Create My Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
