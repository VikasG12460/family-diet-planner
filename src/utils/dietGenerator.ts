import type {
  FamilyMember,
  Location,
  MonthlyPlan,
  DailyMealPlan,
  Meal
} from '../types/index';

const DAYS_TO_GENERATE = 365;

/* -------------------- MEAL DATABASE -------------------- */

const MEAL_DATABASE = {
  breakfast: [
    { name: "Idli with Sambar", calories: 250, tags: ["indian", "light"] },
    { name: "Poha", calories: 280, tags: ["indian"] },
    { name: "Oats", calories: 220, tags: ["healthy", "fiber"] },
    { name: "Dosa", calories: 300, tags: ["indian"] },
    { name: "Boiled Eggs", calories: 200, tags: ["protein"] }
  ],
  lunch: [
    { name: "Dal Rice", calories: 450, tags: ["indian", "fiber"] },
    { name: "Rajma Chawal", calories: 480, tags: ["indian"] },
    { name: "Paneer Roti", calories: 500, tags: ["protein"] },
    { name: "Veg Khichdi", calories: 400, tags: ["light"] },
    { name: "Curd Rice", calories: 300, tags: ["cooling"] }
  ],
  dinner: [
    { name: "Roti Sabzi", calories: 350, tags: ["indian"] },
    { name: "Moong Khichdi", calories: 320, tags: ["digestive"] },
    { name: "Vegetable Soup", calories: 200, tags: ["light"] },
    { name: "Paneer Tikka", calories: 400, tags: ["protein"] },
    { name: "Mixed Veg Curry", calories: 300, tags: ["vegan"] }
  ]
};

/* -------------------- HELPERS -------------------- */

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function getMealsForMealType(
  type: 'breakfast' | 'lunch' | 'dinner',
  member: FamilyMember,
  location: Location
): Meal[] {

  let baseMeals = MEAL_DATABASE[type];

  // location filter
  if (location.cityType === 'rural') {
    baseMeals = baseMeals.filter(
      m => m.tags.includes('fiber') || m.tags.includes('indian')
    );
  }

  // health filter
  if (member.healthConditions.includes('Diabetes')) {
    baseMeals = baseMeals.filter(m => m.calories < 350);
  }

  if (baseMeals.length === 0) {
    baseMeals = MEAL_DATABASE[type];
  }

  return baseMeals.map((meal, index) => ({
    id: `${type}-${index}`,
    name: meal.name,
    calories: meal.calories,
    eaten: false,
    isCustom: false
  }));
}

/* -------------------- CALORIE CALC -------------------- */

export function calculateConsumedCalories(
  dayPlan: DailyMealPlan
): number {

  const allMeals = [
    ...dayPlan.breakfast,
    ...dayPlan.lunch,
    ...dayPlan.dinner
  ];

  return allMeals
    .filter(m => m.eaten)
    .reduce((sum, m) => sum + m.calories, 0);
}

/* -------------------- MAIN GENERATOR -------------------- */

export function generateMonthlyPlan(
  members: FamilyMember[],
  location: Location
): MonthlyPlan[] {

  const plans: MonthlyPlan[] = [];
  const startDate = new Date();

  const sharedDays: Record<
    string,
    { breakfast: Meal[]; lunch: Meal[]; dinner: Meal[] }
  > = {};

  for (let i = 0; i < DAYS_TO_GENERATE; i++) {

    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dateKey = currentDate.toISOString().split('T')[0];

    const referenceMember = members[0];

    sharedDays[dateKey] = {
      breakfast: shuffleArray(
        getMealsForMealType('breakfast', referenceMember, location)
      ).slice(0, 3),

      lunch: shuffleArray(
        getMealsForMealType('lunch', referenceMember, location)
      ).slice(0, 3),

      dinner: shuffleArray(
        getMealsForMealType('dinner', referenceMember, location)
      ).slice(0, 3)
    };
  }

  members.forEach(member => {

    const days: Record<string, DailyMealPlan> = {};

    let bmr =
      10 * member.weight +
      6.25 * member.height -
      5 * member.age;

    bmr += member.gender === 'male' ? 5 : -161;

    let targetCalories = Math.round(bmr * 1.55);

    if (member.goal === 'lose') targetCalories -= 500;
    if (member.goal === 'gain') targetCalories += 500;

    Object.entries(sharedDays).forEach(([dateKey, menu]) => {

      const cloneMeal = (meal: Meal, type: string): Meal => ({
        ...meal,
        id: `${type}-${member.id}-${dateKey}-${meal.id}`,
        eaten: false
      });

      days[dateKey] = {
        memberId: member.id,
        memberName: member.name,
        date: dateKey,
        targetCalories,
        consumedCalories: 0,
        breakfast: menu.breakfast.map(m => cloneMeal(m, 'breakfast')),
        lunch: menu.lunch.map(m => cloneMeal(m, 'lunch')),
        dinner: menu.dinner.map(m => cloneMeal(m, 'dinner'))
      };
    });

    plans.push({
      memberId: member.id,
      memberName: member.name,
      days
    });
  });

  return plans;
}

/* -------------------- HYDRATE -------------------- */

export function hydrateMonthlyPlans(savedPlans: any[]): MonthlyPlan[] {
  return savedPlans.map(plan => ({
    memberId: plan.memberId,
    memberName: plan.memberName,
    days: plan.days
  }));
}