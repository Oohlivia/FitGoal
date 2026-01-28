import Link from 'next/link'
import { Dumbbell, Utensils, Target, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Your Personal Fitness & Nutrition Coach
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Reach Your Fitness Goals with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              FitGoal
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Get personalized workout programs and meal prep recipes designed for your unique goals, preferences, and lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg shadow-emerald-600/30"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors border-2 border-gray-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
              <Dumbbell className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Workouts</h3>
            <p className="text-gray-600 mb-6">
              Personalized 4-week programs with progressive overload, adapted to your equipment and experience level.
            </p>
            <ul className="space-y-3">
              {['Progressive overload built-in', 'Equipment-based variations', 'Injury-aware substitutions', 'Edit & customize plans'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Utensils className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Meal Prep Magic</h3>
            <p className="text-gray-600 mb-6">
              Weekly meal plans based on your favorite ingredients, with automatic grocery lists and batch cooking tips.
            </p>
            <ul className="space-y-3">
              {['Ingredient-first recipes', 'Auto-generated grocery lists', 'Dietary preferences respected', 'Swap & lock meals'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Goal-Focused</h3>
            <p className="text-gray-600 mb-6">
              Whether you're losing fat, building muscle, or improving endurance, we optimize your plan for results.
            </p>
            <ul className="space-y-3">
              {['Science-based programming', 'Adaptable to your schedule', 'Track your progress', 'Export & print plans'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl mb-8 text-emerald-50">
            Get your personalized workout and meal plan in under 5 minutes.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Dumbbell className="w-5 h-5" />
              <span className="font-semibold">FitGoal</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/about" className="hover:text-gray-900 transition-colors">
                About
              </Link>
              <span>•</span>
              <Link href="/onboarding" className="hover:text-gray-900 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
