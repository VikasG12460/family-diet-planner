import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Logo } from './components/ui/Logo';
import { Signup } from './components/Auth/Signup';
import { Login } from './components/Auth/Login';
import { ProfileSetup } from './components/Onboarding/ProfileSetup';
import { DietPlanDisplay } from './components/Diet/DietPlanDisplay';
import { FamilySummary } from './components/Diet/FamilySummary';
import { EditMembers } from './components/Settings/EditMembers';
import { storage } from './utils/storage';
import { generateMonthlyPlan, calculateConsumedCalories, hydrateMonthlyPlans } from './utils/dietGenerator';
import type { User, FamilyProfile, MonthlyPlan, Meal, AppView } from './types/index';
import { LogOut, Home, Users, Settings } from 'lucide-react';

function App() {
  const [view, setView] = useState<AppView>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile | null>(null);
  const [monthlyPlans, setMonthlyPlans] = useState<MonthlyPlan[]>([]);
  const [activeTab, setActiveTab] = useState('individual');
  
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  useEffect(() => {
    const savedUser = storage.getCurrentUser();
    const savedProfile = storage.getFamilyProfile();
    const savedMonthlyPlan = storage.getMonthlyPlan();

    if (savedUser) {
      setCurrentUser(savedUser);
      if (savedProfile) {
        setFamilyProfile(savedProfile);
        if (savedMonthlyPlan) {
          const hydratedPlans = hydrateMonthlyPlans(savedMonthlyPlan);
          setMonthlyPlans(hydratedPlans);
        } else {
          const newPlans = generateMonthlyPlan(savedProfile.members, savedProfile.location);
          setMonthlyPlans(newPlans);
          storage.saveMonthlyPlan(newPlans);
        }
        setView('planner');
      } else {
        setView('onboarding');
      }
    }
  }, []);

  const handleSignup = (user: User) => {
    storage.setCurrentUser(user);
    setCurrentUser(user);
    setView('onboarding');
  };

  const handleLogin = (user: User) => {
    storage.setCurrentUser(user);
    setCurrentUser(user);
    
    const savedProfile = storage.getFamilyProfile();
    if (savedProfile) {
      setFamilyProfile(savedProfile);
      const savedMonthlyPlan = storage.getMonthlyPlan();
      if (savedMonthlyPlan) {
        const hydratedPlans = hydrateMonthlyPlans(savedMonthlyPlan);
        setMonthlyPlans(hydratedPlans);
      } else {
        const newPlans = generateMonthlyPlan(savedProfile.members, savedProfile.location);
        setMonthlyPlans(newPlans);
        storage.saveMonthlyPlan(newPlans);
      }
      setView('planner');
    } else {
      setView('onboarding');
    }
  };

  const handleProfileComplete = (profile: FamilyProfile) => {
    storage.saveFamilyProfile(profile);
    setFamilyProfile(profile);
    
    const newPlans = generateMonthlyPlan(profile.members, profile.location);
    setMonthlyPlans(newPlans);
    storage.saveMonthlyPlan(newPlans);
    
    setView('planner');
  };

  const handleUpdateFamilyProfile = (updatedProfile: FamilyProfile) => {
    storage.saveFamilyProfile(updatedProfile);
    setFamilyProfile(updatedProfile);
    
    // Regenerate plans for all members (new targets, new members, etc.)
    const newPlans = generateMonthlyPlan(updatedProfile.members, updatedProfile.location);
    setMonthlyPlans(newPlans);
    storage.saveMonthlyPlan(newPlans);
    
    setView('planner');
  };

  const handleLogout = () => {
    storage.setCurrentUser(null);
    setCurrentUser(null);
    setFamilyProfile(null);
    setMonthlyPlans([]);
    setView('login');
  };

  const handleUpdateMeal = (memberId: string, date: string, mealType: 'breakfast' | 'lunch' | 'dinner', mealId: string, eaten: boolean) => {
    setMonthlyPlans(prevPlans => {
      return prevPlans.map(plan => {
        if (plan.memberId === memberId && plan.days[date]) {
          const dayPlan = { ...plan.days[date] };
          const updatedMeals = dayPlan[mealType].map(meal =>
            meal.id === mealId ? { ...meal, eaten } : meal
          );
          
          const updatedDayPlan = {
            ...dayPlan,
            [mealType]: updatedMeals,
            consumedCalories: calculateConsumedCalories({
              ...dayPlan,
              [mealType]: updatedMeals
            })
          };
          
          return {
            ...plan,
            days: {
              ...plan.days,
              [date]: updatedDayPlan
            }
          };
        }
        return plan;
      });
    });
  };

  const handleAddCustomMeal = (memberId: string, date: string, mealType: 'breakfast' | 'lunch' | 'dinner', meal: Meal) => {
    setMonthlyPlans(prevPlans => {
      return prevPlans.map(plan => {
        if (plan.memberId === memberId && plan.days[date]) {
          const dayPlan = { ...plan.days[date] };
          const updatedMeals = [...dayPlan[mealType], meal];
          
          const updatedDayPlan = {
            ...dayPlan,
            [mealType]: updatedMeals,
            consumedCalories: calculateConsumedCalories({
              ...dayPlan,
              [mealType]: updatedMeals
            })
          };
          
          return {
            ...plan,
            days: {
              ...plan.days,
              [date]: updatedDayPlan
            }
          };
        }
        return plan;
      });
    });
  };

  const handleUpdateGoal = (memberId: string, newGoal: number) => {
    setMonthlyPlans(prevPlans => {
      return prevPlans.map(plan => {
        if (plan.memberId === memberId) {
          const updatedDays: { [date: string]: any } = {};
          
          for (const [date, dayPlan] of Object.entries(plan.days)) {
            updatedDays[date] = {
              ...dayPlan,
              targetCalories: newGoal
            };
          }
          
          return {
            ...plan,
            days: updatedDays
          };
        }
        return plan;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'planner' && (
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <Logo />
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setView('edit-members')}>
                <Settings className="w-4 h-4 mr-2" />
                Edit Members
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>
      )}

      <main className="p-4">
        {view === 'login' && (
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Login onLogin={handleLogin} onSwitchToSignup={() => setView('signup')} />
          </div>
        )}

        {view === 'signup' && (
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Signup onSignup={handleSignup} onSwitchToLogin={() => setView('login')} />
          </div>
        )}

        {view === 'onboarding' && currentUser && (
          <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <ProfileSetup user={currentUser} onComplete={handleProfileComplete} />
          </div>
        )}

        {view === 'planner' && (
          <div className="w-full">
            <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
              <button
                onClick={() => setActiveTab('individual')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'individual' ? 'bg-white shadow text-emerald-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Home className="w-4 h-4" />
                My Plan
              </button>
              <button
                onClick={() => setActiveTab('family')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'family' ? 'bg-white shadow text-emerald-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4" />
                Family
              </button>
            </div>

            {activeTab === 'individual' && (
              <DietPlanDisplay
                monthlyPlans={monthlyPlans}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                onUpdateMeal={handleUpdateMeal}
                onAddCustomMeal={handleAddCustomMeal}
                onUpdateGoal={handleUpdateGoal}
              />
            )}

            {activeTab === 'family' && (
              <FamilySummary monthlyPlans={monthlyPlans} selectedDate={selectedDate} />
            )}
          </div>
        )}

        {view === 'edit-members' && familyProfile && (
          <EditMembers 
            profile={familyProfile} 
            onSave={handleUpdateFamilyProfile} 
            onCancel={() => setView('planner')} 
          />
        )}
      </main>
    </div>
  );
}

export default App;