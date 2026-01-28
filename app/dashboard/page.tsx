'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'
import { Dumbbell, Utensils, User } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const { userId } = useAppStore()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      router.push('/onboarding')
      return
    }

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        console.error('Error loading profile:', error)
        router.push('/onboarding')
        return
      }

      if (!data) {
        router.push('/onboarding')
        return
      }

      setProfile(data)
      setLoading(false)
    }

    loadProfile()
  }, [userId, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile?.name}!</h1>
              <p className="text-gray-600 mt-1">Your personalized fitness journey starts here</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Workout Plan</h2>
                <p className="text-sm text-gray-600">4-week progressive program</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Goal:</span>
                <span className="font-semibold capitalize">{profile?.fitness_goal?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Experience:</span>
                <span className="font-semibold capitalize">{profile?.experience_level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Days/Week:</span>
                <span className="font-semibold">{profile?.days_per_week} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{profile?.session_duration} min</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors">
              Generate Workout Program
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Your Meal Plan</h2>
                <p className="text-sm text-gray-600">Personalized recipes</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Dietary Style:</span>
                <span className="font-semibold capitalize">{profile?.dietary_style?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Meals/Day:</span>
                <span className="font-semibold">{profile?.meals_per_day} meals</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Prep Time:</span>
                <span className="font-semibold">{profile?.meal_prep_time} min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Favorites:</span>
                <span className="font-semibold">{profile?.favorite_ingredients?.length || 0} ingredients</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
              Generate Meal Plan
            </button>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-emerald-900 mb-2">Profile Created Successfully!</h3>
          <p className="text-emerald-700">
            Your personalized fitness profile has been saved. The workout and meal plan generators are currently being built and will be available soon.
          </p>
        </div>
      </div>
    </div>
  )
}
