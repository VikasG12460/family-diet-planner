"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var button_1 = require("./components/ui/button");
var Logo_1 = require("./components/ui/Logo");
var Signup_1 = require("./components/Auth/Signup");
var Login_1 = require("./components/Auth/Login");
var ProfileSetup_1 = require("./components/Onboarding/ProfileSetup");
var DietPlanDisplay_1 = require("./components/Diet/DietPlanDisplay");
var FamilySummary_1 = require("./components/Diet/FamilySummary");
var EditMembers_1 = require("./components/Settings/EditMembers");
var storage_1 = require("./utils/storage");
var dietGenerator_1 = require("./utils/dietGenerator");
var lucide_react_1 = require("lucide-react");
function App() {
    var _a = (0, react_1.useState)('login'), view = _a[0], setView = _a[1];
    var _b = (0, react_1.useState)(null), currentUser = _b[0], setCurrentUser = _b[1];
    var _c = (0, react_1.useState)(null), familyProfile = _c[0], setFamilyProfile = _c[1];
    var _d = (0, react_1.useState)([]), monthlyPlans = _d[0], setMonthlyPlans = _d[1];
    var _e = (0, react_1.useState)('individual'), activeTab = _e[0], setActiveTab = _e[1];
    var _f = (0, react_1.useState)(function () {
        return new Date().toISOString().split('T')[0];
    }), selectedDate = _f[0], setSelectedDate = _f[1];
    (0, react_1.useEffect)(function () {
        var savedUser = storage_1.storage.getCurrentUser();
        var savedProfile = storage_1.storage.getFamilyProfile();
        var savedMonthlyPlan = storage_1.storage.getMonthlyPlan();
        if (savedUser) {
            setCurrentUser(savedUser);
            if (savedProfile) {
                setFamilyProfile(savedProfile);
                if (savedMonthlyPlan) {
                    var hydratedPlans = (0, dietGenerator_1.hydrateMonthlyPlans)(savedMonthlyPlan);
                    setMonthlyPlans(hydratedPlans);
                }
                else {
                    var newPlans = (0, dietGenerator_1.generateMonthlyPlan)(savedProfile.members, savedProfile.location);
                    setMonthlyPlans(newPlans);
                    storage_1.storage.saveMonthlyPlan(newPlans);
                }
                setView('planner');
            }
            else {
                setView('onboarding');
            }
        }
    }, []);
    var handleSignup = function (user) {
        storage_1.storage.setCurrentUser(user);
        setCurrentUser(user);
        setView('onboarding');
    };
    var handleLogin = function (user) {
        storage_1.storage.setCurrentUser(user);
        setCurrentUser(user);
        var savedProfile = storage_1.storage.getFamilyProfile();
        if (savedProfile) {
            setFamilyProfile(savedProfile);
            var savedMonthlyPlan = storage_1.storage.getMonthlyPlan();
            if (savedMonthlyPlan) {
                var hydratedPlans = (0, dietGenerator_1.hydrateMonthlyPlans)(savedMonthlyPlan);
                setMonthlyPlans(hydratedPlans);
            }
            else {
                var newPlans = (0, dietGenerator_1.generateMonthlyPlan)(savedProfile.members, savedProfile.location);
                setMonthlyPlans(newPlans);
                storage_1.storage.saveMonthlyPlan(newPlans);
            }
            setView('planner');
        }
        else {
            setView('onboarding');
        }
    };
    var handleProfileComplete = function (profile) {
        storage_1.storage.saveFamilyProfile(profile);
        setFamilyProfile(profile);
        var newPlans = (0, dietGenerator_1.generateMonthlyPlan)(profile.members, profile.location);
        setMonthlyPlans(newPlans);
        storage_1.storage.saveMonthlyPlan(newPlans);
        setView('planner');
    };
    var handleUpdateFamilyProfile = function (updatedProfile) {
        storage_1.storage.saveFamilyProfile(updatedProfile);
        setFamilyProfile(updatedProfile);
        // Regenerate plans for all members (new targets, new members, etc.)
        var newPlans = (0, dietGenerator_1.generateMonthlyPlan)(updatedProfile.members, updatedProfile.location);
        setMonthlyPlans(newPlans);
        storage_1.storage.saveMonthlyPlan(newPlans);
        setView('planner');
    };
    var handleLogout = function () {
        storage_1.storage.setCurrentUser(null);
        setCurrentUser(null);
        setFamilyProfile(null);
        setMonthlyPlans([]);
        setView('login');
    };
    var handleUpdateMeal = function (memberId, date, mealType, mealId, eaten) {
        setMonthlyPlans(function (prevPlans) {
            return prevPlans.map(function (plan) {
                var _a, _b, _c;
                if (plan.memberId === memberId && plan.days[date]) {
                    var dayPlan = __assign({}, plan.days[date]);
                    var updatedMeals = dayPlan[mealType].map(function (meal) {
                        return meal.id === mealId ? __assign(__assign({}, meal), { eaten: eaten }) : meal;
                    });
                    var updatedDayPlan = __assign(__assign({}, dayPlan), (_a = {}, _a[mealType] = updatedMeals, _a.consumedCalories = (0, dietGenerator_1.calculateConsumedCalories)(__assign(__assign({}, dayPlan), (_b = {}, _b[mealType] = updatedMeals, _b))), _a));
                    return __assign(__assign({}, plan), { days: __assign(__assign({}, plan.days), (_c = {}, _c[date] = updatedDayPlan, _c)) });
                }
                return plan;
            });
        });
    };
    var handleAddCustomMeal = function (memberId, date, mealType, meal) {
        setMonthlyPlans(function (prevPlans) {
            return prevPlans.map(function (plan) {
                var _a, _b, _c;
                if (plan.memberId === memberId && plan.days[date]) {
                    var dayPlan = __assign({}, plan.days[date]);
                    var updatedMeals = __spreadArray(__spreadArray([], dayPlan[mealType], true), [meal], false);
                    var updatedDayPlan = __assign(__assign({}, dayPlan), (_a = {}, _a[mealType] = updatedMeals, _a.consumedCalories = (0, dietGenerator_1.calculateConsumedCalories)(__assign(__assign({}, dayPlan), (_b = {}, _b[mealType] = updatedMeals, _b))), _a));
                    return __assign(__assign({}, plan), { days: __assign(__assign({}, plan.days), (_c = {}, _c[date] = updatedDayPlan, _c)) });
                }
                return plan;
            });
        });
    };
    var handleUpdateGoal = function (memberId, newGoal) {
        setMonthlyPlans(function (prevPlans) {
            return prevPlans.map(function (plan) {
                if (plan.memberId === memberId) {
                    var updatedDays = {};
                    for (var _i = 0, _a = Object.entries(plan.days); _i < _a.length; _i++) {
                        var _b = _a[_i], date = _b[0], dayPlan = _b[1];
                        updatedDays[date] = __assign(__assign({}, dayPlan), { targetCalories: newGoal });
                    }
                    return __assign(__assign({}, plan), { days: updatedDays });
                }
                return plan;
            });
        });
    };
    return (<div className="min-h-screen bg-gray-50">
      {view === 'planner' && (<header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
            <Logo_1.Logo />
            <div className="flex gap-2">
              <button_1.Button variant="ghost" size="sm" onClick={function () { return setView('edit-members'); }}>
                <lucide_react_1.Settings className="w-4 h-4 mr-2"/>
                Edit Members
              </button_1.Button>
              <button_1.Button variant="ghost" size="sm" onClick={handleLogout}>
                <lucide_react_1.LogOut className="w-4 h-4"/>
              </button_1.Button>
            </div>
          </div>
        </header>)}

      <main className="p-4">
        {view === 'login' && (<div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Login_1.Login onLogin={handleLogin} onSwitchToSignup={function () { return setView('signup'); }}/>
          </div>)}

        {view === 'signup' && (<div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <Signup_1.Signup onSignup={handleSignup} onSwitchToLogin={function () { return setView('login'); }}/>
          </div>)}

        {view === 'onboarding' && currentUser && (<div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
            <ProfileSetup_1.ProfileSetup user={currentUser} onComplete={handleProfileComplete}/>
          </div>)}

        {view === 'planner' && (<div className="w-full">
            <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
              <button onClick={function () { return setActiveTab('individual'); }} className={"flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ".concat(activeTab === 'individual' ? 'bg-white shadow text-emerald-700' : 'text-gray-600 hover:text-gray-900')}>
                <lucide_react_1.Home className="w-4 h-4"/>
                My Plan
              </button>
              <button onClick={function () { return setActiveTab('family'); }} className={"flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all ".concat(activeTab === 'family' ? 'bg-white shadow text-emerald-700' : 'text-gray-600 hover:text-gray-900')}>
                <lucide_react_1.Users className="w-4 h-4"/>
                Family
              </button>
            </div>

            {activeTab === 'individual' && (<DietPlanDisplay_1.DietPlanDisplay monthlyPlans={monthlyPlans} selectedDate={selectedDate} onDateChange={setSelectedDate} onUpdateMeal={handleUpdateMeal} onAddCustomMeal={handleAddCustomMeal} onUpdateGoal={handleUpdateGoal}/>)}

            {activeTab === 'family' && (<FamilySummary_1.FamilySummary monthlyPlans={monthlyPlans} selectedDate={selectedDate}/>)}
          </div>)}

        {view === 'edit-members' && familyProfile && (<EditMembers_1.EditMembers profile={familyProfile} onSave={handleUpdateFamilyProfile} onCancel={function () { return setView('planner'); }}/>)}
      </main>
    </div>);
}
exports.default = App;
