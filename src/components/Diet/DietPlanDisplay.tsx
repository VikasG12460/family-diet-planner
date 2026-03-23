import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Check, Plus, Utensils, Calendar, Target, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { MonthlyPlan, Meal, DailyMealPlan } from '../../types/index';

interface DietPlanDisplayProps {
  monthlyPlans: MonthlyPlan[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onUpdateMeal: (memberId: string, date: string, mealType: 'breakfast' | 'lunch' | 'dinner', mealId: string, eaten: boolean) => void;
  onAddCustomMeal: (memberId: string, date: string, mealType: 'breakfast' | 'lunch' | 'dinner', meal: Meal) => void;
  onUpdateGoal: (memberId: string, newGoal: number) => void;
}

export function DietPlanDisplay({ 
  monthlyPlans, 
  selectedDate, 
  onDateChange,
  onUpdateMeal, 
  onAddCustomMeal,
  onUpdateGoal 
}: DietPlanDisplayProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(() => {
    return monthlyPlans.length > 0 ? monthlyPlans[0].memberId : '';
  });
  
  const [isCustomMealOpen, setIsCustomMealOpen] = useState(false);
  const [customMealName, setCustomMealName] = useState('');
  const [customMealCalories, setCustomMealCalories] = useState('');
  const [currentMealType, setCurrentMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');

  const currentPlan = monthlyPlans.find(p => p.memberId === selectedMemberId);
  const dayPlan: DailyMealPlan | undefined = currentPlan?.days[selectedDate];

  useEffect(() => {
    if (monthlyPlans.length > 0 && !monthlyPlans.find(p => p.memberId === selectedMemberId)) {
      setSelectedMemberId(monthlyPlans[0].memberId);
    }
  }, [monthlyPlans, selectedMemberId]);

  const handleDateChange = (direction: 'prev' | 'next') => {
    const date = new Date(selectedDate);
    if (direction === 'prev') {
      date.setDate(date.getDate() - 1);
    } else {
      date.setDate(date.getDate() + 1);
    }
    onDateChange(date.toISOString().split('T')[0]);
  };

  const handleAddCustomMeal = () => {
    if (customMealName && customMealCalories && dayPlan) {
      onAddCustomMeal(
        selectedMemberId,
        selectedDate,
        currentMealType,
        {
          id: `custom-${Date.now()}`,
          name: customMealName,
          calories: parseInt(customMealCalories),
          eaten: true,
          isCustom: true
        }
      );
      setCustomMealName('');
      setCustomMealCalories('');
      setIsCustomMealOpen(false);
    }
  };

  const MealSection = ({ title, meals, mealType, icon: Icon }: { title: string; meals: Meal[]; mealType: 'breakfast' | 'lunch' | 'dinner'; icon: any }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-emerald-500" />
          <h3 className="font-semibold text-gray-700">{title}</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-emerald-600 hover:text-emerald-700"
          onClick={() => { setCurrentMealType(mealType); setIsCustomMealOpen(true); }}
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </div>
      <div className="space-y-2">
        {meals.map(meal => (
          <div
            key={meal.id}
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
              meal.eaten ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => dayPlan && onUpdateMeal(selectedMemberId, selectedDate, mealType, meal.id, !meal.eaten)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  meal.eaten ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                }`}
              >
                {meal.eaten && <Check className="w-4 h-4 text-white" />}
              </button>
              <div>
                <p className={`font-medium ${meal.eaten ? 'text-emerald-700' : 'text-gray-800'}`}>{meal.name}</p>
                {meal.isCustom && (
                  <span className="inline-flex items-center rounded-full border px-2 py-0 text-xs font-semibold border-gray-200 bg-gray-100 text-gray-600 mt-1">
                    Custom
                  </span>
                )}
              </div>
            </div>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              meal.eaten ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {meal.calories} kcal
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (!dayPlan) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No plan found for this date.</p>
      </div>
    );
  }

  const progressPercentage = Math.min(100, Math.round((dayPlan.consumedCalories / dayPlan.targetCalories) * 100));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select family member" />
            </SelectTrigger>
            <SelectContent>
              {monthlyPlans.map(plan => (
                <SelectItem key={plan.memberId} value={plan.memberId}>
                  {plan.memberName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </CardTitle>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={() => handleDateChange('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => onDateChange(e.target.value)}
                  className="w-32 px-2 py-1 text-sm border rounded-md"
                />
                <Button variant="outline" size="icon" onClick={() => handleDateChange('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Daily Progress</span>
                <span className="font-semibold text-emerald-600">{dayPlan.consumedCalories} / {dayPlan.targetCalories} kcal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ${
                    progressPercentage >= 100 ? 'bg-emerald-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {progressPercentage >= 100 && (
                <p className="text-sm text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <Target className="w-4 h-4" /> Goal Reached!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <MealSection title="Breakfast" meals={dayPlan.breakfast} mealType="breakfast" icon={Utensils} />
        <MealSection title="Lunch" meals={dayPlan.lunch} mealType="lunch" icon={Utensils} />
        <MealSection title="Dinner" meals={dayPlan.dinner} mealType="dinner" icon={Utensils} />
      </div>

      {/* Custom Modal */}
      {isCustomMealOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Add Custom Dish</h2>
              <button onClick={() => setIsCustomMealOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-500">
                Add a dish that isn't in your plan for {currentMealType}.
              </p>
              <div className="space-y-2">
                <Label htmlFor="dish-name">Dish Name</Label>
                <Input
                  id="dish-name"
                  placeholder="e.g., Apple Pie"
                  value={customMealName}
                  onChange={(e) => setCustomMealName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input
                  id="calories"
                  type="number"
                  placeholder="e.g., 250"
                  value={customMealCalories}
                  onChange={(e) => setCustomMealCalories(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50 rounded-b-lg">
              <Button variant="outline" onClick={() => setIsCustomMealOpen(false)}>Cancel</Button>
              <Button onClick={handleAddCustomMeal}>Save Dish</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}