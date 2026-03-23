export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Location {
  country: string;
  state: string;
  cityType: 'urban' | 'rural' | 'coastal';
}

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  activityLevel: 'sedentary' | 'moderate' | 'active';
  goal: 'maintain' | 'lose' | 'gain';
  dietaryPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'no-seafood';
  healthConditions: string[];
}

export interface FamilyProfile {
  primaryUser: User;
  members: FamilyMember[];
  location: Location;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  eaten: boolean;
  isCustom?: boolean;
}

export interface DailyMealPlan {
  memberId: string;
  memberName: string;
  date: string;
  targetCalories: number;
  consumedCalories: number;
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
}

export interface MonthlyPlan {
  memberId: string;
  memberName: string;
  days: Record<string, DailyMealPlan>;
}

export type HealthCondition = string;