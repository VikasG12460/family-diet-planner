import type { User, FamilyProfile, MonthlyPlan } from "../types";

const CURRENT_USER_KEY = "family_diet_current_user";
const FAMILY_PROFILE_KEY = "family_diet_profile";
const MONTHLY_PLAN_KEY = "family_diet_monthly_plan";
const USERS_KEY = "family_diet_users";

export const storage = {
  // --- User Management ---
  getUsers: (): (User & { password: string })[] => {
    if (typeof window === "undefined") return [];
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User & { password: string }) => {
    const users = storage.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getUserByEmail: (email: string): (User & { password: string }) | null => {
    const users = storage.getUsers();
    return users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    ) || null;
  },

  // --- Current Session ---
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null) => {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // --- Family Profile ---
  getFamilyProfile: (): FamilyProfile | null => {
    if (typeof window === "undefined") return null;
    const profile = localStorage.getItem(FAMILY_PROFILE_KEY);
    return profile ? JSON.parse(profile) : null;
  },

  saveFamilyProfile: (profile: FamilyProfile) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(FAMILY_PROFILE_KEY, JSON.stringify(profile));
  },

  // --- Monthly Plan ---
  getMonthlyPlan: (): MonthlyPlan[] | null => {
    if (typeof window === "undefined") return null;
    const plan = localStorage.getItem(MONTHLY_PLAN_KEY);
    return plan ? JSON.parse(plan) : null;
  },

  saveMonthlyPlan: (plan: MonthlyPlan[]) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(MONTHLY_PLAN_KEY, JSON.stringify(plan));
  },

  clearAll: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(FAMILY_PROFILE_KEY);
    localStorage.removeItem(MONTHLY_PLAN_KEY);
  },
};