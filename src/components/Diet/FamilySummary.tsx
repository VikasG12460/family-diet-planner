import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Users, Target, Flame } from 'lucide-react';
import type { MonthlyPlan, Meal, DailyMealPlan } from '../../types/index';
interface FamilySummaryProps {
  monthlyPlans: MonthlyPlan[];
  selectedDate: string;
}

export function FamilySummary({ monthlyPlans, selectedDate }: FamilySummaryProps) {
  const todaysData = monthlyPlans.map(plan => {
    const dayPlan = plan.days[selectedDate];
    return {
      memberId: plan.memberId,
      memberName: plan.memberName,
      dayPlan: dayPlan
    };
  }).filter(item => item.dayPlan !== undefined);

  const totalFamilyTarget = todaysData.reduce((sum, item) => sum + (item.dayPlan?.targetCalories || 0), 0);
  const totalFamilyConsumed = todaysData.reduce((sum, item) => sum + (item.dayPlan?.consumedCalories || 0), 0);
  const familyProgress = totalFamilyTarget > 0 ? Math.round((totalFamilyConsumed / totalFamilyTarget) * 100) : 0;

  // Custom Progress Component
  const ProgressBar = ({ value, className }: { value: number; className?: string }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ${className}`}>
      <div 
        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" 
        style={{ width: `${Math.min(100, value)}%` }} 
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Family Overview</h2>
        <p className="text-gray-500">
          {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <Card className="border-emerald-200 bg-emerald-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-emerald-700">
            <Users className="w-5 h-5" />
            Total Family Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Consumed</span>
              <span className="font-bold text-emerald-700 text-lg">
                {totalFamilyConsumed} / {totalFamilyTarget} kcal
              </span>
            </div>
            <ProgressBar value={familyProgress} className="h-3" />
            <div className="flex gap-4 text-center pt-2">
              <div className="flex-1">
                <p className="text-xs text-gray-500">Members</p>
                <p className="font-semibold text-gray-700">{todaysData.length}</p>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Avg. Progress</p>
                <p className="font-semibold text-emerald-600">{todaysData.length > 0 ? Math.round(familyProgress / todaysData.length) : 0}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Member Status
        </h3>
        <div className="grid gap-4">
          {todaysData.map((item) => {
            const progress = Math.min(100, Math.round((item.dayPlan!.consumedCalories / item.dayPlan!.targetCalories) * 100));
            const initials = item.memberName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            
            return (
              <Card key={item.memberId} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 bg-emerald-100 text-emerald-700">
                      <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">{item.memberName}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Flame className="w-3 h-3" />
                          {item.dayPlan!.consumedCalories}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{progress}% of goal</span>
                          <span>{item.dayPlan!.targetCalories} kcal</span>
                        </div>
                        <ProgressBar value={progress} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}