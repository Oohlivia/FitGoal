import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { OnboardingFormData } from './types'

interface OnboardingStore {
  formData: Partial<OnboardingFormData>
  currentStep: number
  setFormData: (data: Partial<OnboardingFormData>) => void
  setCurrentStep: (step: number) => void
  resetOnboarding: () => void
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      formData: {},
      currentStep: 1,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetOnboarding: () => set({ formData: {}, currentStep: 1 }),
    }),
    {
      name: 'onboarding-storage',
    }
  )
)

interface AppStore {
  userId: string | null
  setUserId: (id: string | null) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: 'app-storage',
    }
  )
)
