# FitGoal - Personalized Fitness & Meal Planning

A production-quality Next.js 14 app that generates personalized workout programs and meal plans based on user goals and preferences.

## ✅ Completed Features

### 1. Multi-Step Onboarding (Fully Functional)

Complete 4-step onboarding flow with full form validation and Supabase persistence:

**Step 1: Personal Information**
- Name (required)
- Age, sex, height, weight (optional)
- Form validation with Zod

**Step 2: Fitness Goals**
- Primary fitness goal (fat loss, muscle gain, maintenance, strength, endurance, mobility)
- Experience level (beginner, intermediate, advanced)
- Days per week (2-6)
- Session duration (20-90 minutes)
- Preferred workout style (HIIT, bodybuilding, powerlifting, Pilates, running, mixed)

**Step 3: Equipment & Constraints**
- Equipment selection (bodyweight, dumbbells, barbell, full gym, bands, kettlebells)
- Physical constraints (knee issues, low back, shoulder, pregnancy/postpartum)
- Multi-select checkboxes with validation

**Step 4: Meal Preferences**
- Dietary style (none, high protein, low carb, vegetarian, vegan, pescatarian)
- Allergens (nuts, dairy, gluten, shellfish, eggs)
- Favorite ingredients (dynamic list with add/remove)
- Disliked ingredients
- Meals per day (2-5)
- Meal prep time (15-60+ minutes)
- Cooking tools (microwave, air fryer, stove, oven, slow cooker)

### 2. Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript with strict mode
- **Styling:** Tailwind CSS with custom theme
- **UI Components:** shadcn/ui (Button, Input, Label, Checkbox, RadioGroup)
- **Forms:** react-hook-form with @hookform/resolvers
- **Validation:** Zod schemas
- **State Management:** Zustand with persist middleware
- **Database:** Supabase with Row Level Security
- **Icons:** lucide-react

### 3. Database Schema

**user_profiles** table:
- Personal info (name, age, sex, height, weight)
- Fitness preferences (goal, experience level, days per week, session duration, equipment, constraints, workout style)
- Meal preferences (dietary style, allergens, favorite/disliked ingredients, meals per day, meal prep time, cooking tools)
- Timestamps (created_at, updated_at)

**workout_programs** table (ready for generator):
- user_id (foreign key)
- program_data (JSONB)
- created_at

**meal_plans** table (ready for generator):
- user_id (foreign key)
- plan_data (JSONB)
- created_at

### 4. Pages & Routes

- `/` - Landing page with value proposition and CTAs
- `/about` - Information about the app
- `/onboarding` - Complete 4-step form with validation
- `/dashboard` - User dashboard showing profile summary

### 5. Features

✅ **Form Validation:** Comprehensive Zod validation on all steps
✅ **State Persistence:** Form data persists across page refreshes using Zustand
✅ **Database Integration:** User profiles saved to Supabase
✅ **Error Handling:** Clear error messages for validation failures
✅ **Loading States:** Spinner and disabled states during submission
✅ **Responsive Design:** Mobile-first design with Tailwind CSS
✅ **Type Safety:** Full TypeScript coverage
✅ **Progress Indicator:** Visual progress bar showing current step
✅ **Navigation:** Back/Continue buttons with validation

## 🚧 Next Steps (For Future Development)

The foundation is complete. Here's what can be added next:

### Workout Generator
- Seed exercise library (40-60 exercises with metadata)
- Rule-based workout generation algorithm
- Progressive overload logic (4-week program)
- Equipment-based exercise substitutions
- Constraint-aware exercise selection
- Weekly schedule generator
- Edit/swap exercises functionality
- Export to PDF

### Meal Plan Generator
- Seed recipe library (20-30 recipes)
- Ingredient-first recipe matching
- Weekly meal plan generation
- Grocery list aggregation
- Macro calculation
- Swap/lock recipes
- Batch cooking optimization
- Export functionality

### Additional Features
- User authentication (Supabase Auth)
- Profile editing
- Regenerate plans
- Progress tracking
- Exercise substitutions modal
- Recipe card expansion
- Print-friendly views

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
/app
  /page.tsx              # Landing page
  /about/page.tsx        # About page
  /onboarding/page.tsx   # Multi-step form
  /dashboard/page.tsx    # User dashboard
  /layout.tsx            # Root layout
  /globals.css           # Global styles

/components
  /ui/                   # shadcn/ui components
    button.tsx
    input.tsx
    label.tsx
    checkbox.tsx
    radio-group.tsx

/lib
  /types.ts              # TypeScript type definitions
  /validations.ts        # Zod validation schemas
  /store.ts              # Zustand state management
  /supabase.ts           # Supabase client
  /utils.ts              # Utility functions
```

## 🗄️ Database Setup

The database schema is already applied via Supabase migrations. Tables include:

- `user_profiles` - User fitness and meal preferences
- `workout_programs` - Generated workout plans (ready for use)
- `meal_plans` - Generated meal plans (ready for use)

All tables have Row Level Security (RLS) policies configured.

## 🎯 Core Features Summary

| Feature | Status | Description |
|---------|--------|-------------|
| Landing Page | ✅ Complete | Professional homepage with features and CTAs |
| About Page | ✅ Complete | Information about the platform |
| Onboarding Flow | ✅ Complete | 4-step form with validation and persistence |
| User Profiles | ✅ Complete | Save to Supabase with RLS |
| Dashboard | ✅ Complete | Display user profile summary |
| Form Validation | ✅ Complete | Zod schemas for all steps |
| State Management | ✅ Complete | Zustand with persistence |
| UI Components | ✅ Complete | shadcn/ui integration |
| Responsive Design | ✅ Complete | Mobile-first Tailwind CSS |
| TypeScript | ✅ Complete | Full type safety |

## 🔐 Security

### Current State

- Row Level Security (RLS) enabled on all tables
- Database indexes added on foreign keys for optimal performance
- Form validation on client and can be extended to server
- Environment variables for sensitive data
- No hardcoded credentials

### ⚠️ Important Security Notes

**Current RLS Policies are Permissive**: The app currently allows open access to all tables because user authentication has not been implemented yet. This is intentional for the MVP stage but **MUST be updated before production use with multiple users**.

**When Adding Authentication**, you need to:

1. Implement Supabase Auth (email/password or social login)
2. Update all RLS policies to use `auth.uid()` instead of `true`
3. Add proper user ownership checks

**Example Secure RLS Policies** (to implement with auth):

```sql
-- Only allow users to view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Only allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Similar policies needed for workout_programs and meal_plans
```

### Performance Optimizations

- Indexed foreign key columns (`user_id` on `workout_programs` and `meal_plans`)
- Indexed `created_at` on `user_profiles` for efficient sorting
- Automatic `updated_at` trigger on profile updates

## 🎨 Design

- Clean, modern UI with Tailwind CSS
- Custom color scheme (emerald primary, blue secondary)
- Consistent spacing and typography
- Smooth transitions and animations
- Mobile-responsive layouts

## 📝 Notes

- The onboarding form successfully collects all required data
- Profile data is persisted to Supabase database
- Form state persists across page refreshes
- All validation is working correctly
- The app builds successfully with no errors
- Ready for workout and meal plan generator implementation

## 🤝 Contributing

This is a production-quality MVP. The next phase would be:
1. Build the workout generator algorithm
2. Create the meal plan generator
3. Add exercise and recipe seed data
4. Implement edit/swap/export features

## 📄 License

Private project - All rights reserved
