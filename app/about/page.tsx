import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About FitGoal</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-8">
              FitGoal is your personal fitness and nutrition companion, designed to create customized workout programs and meal plans tailored to your unique goals and preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">How It Works</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Tell Us About You</h3>
                <p className="text-gray-600">
                  Complete our comprehensive onboarding to share your fitness goals, experience level, available equipment, dietary preferences, and favorite ingredients.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Get Your Personalized Plan</h3>
                <p className="text-gray-600">
                  Our intelligent system generates a 4-week progressive workout program and weekly meal prep plan optimized for your goals and constraints.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Customize & Execute</h3>
                <p className="text-gray-600">
                  Edit exercises, swap recipes, lock meals you love, and export your plans. Track your progress and regenerate as needed.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Features</h2>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-600"><strong>Progressive Overload:</strong> Workouts automatically increase in intensity week over week</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-600"><strong>Equipment-Aware:</strong> Programs adapt to your available equipment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-600"><strong>Injury-Conscious:</strong> Substitutions for common constraints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-600"><strong>Ingredient-First Meals:</strong> Recipes built around foods you actually enjoy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-600"><strong>Auto Grocery Lists:</strong> Aggregated shopping lists for the week</span>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <h3 className="text-xl font-semibold text-emerald-900 mb-2">Ready to get started?</h3>
              <p className="text-emerald-700 mb-4">
                Your personalized fitness journey is just a few questions away.
              </p>
              <Link
                href="/onboarding"
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
