"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietPlanDisplay = DietPlanDisplay;
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var select_1 = require("../ui/select");
var lucide_react_1 = require("lucide-react");
function DietPlanDisplay(_a) {
    var monthlyPlans = _a.monthlyPlans, selectedDate = _a.selectedDate, onDateChange = _a.onDateChange, onUpdateMeal = _a.onUpdateMeal, onAddCustomMeal = _a.onAddCustomMeal, onUpdateGoal = _a.onUpdateGoal;
    var _b = (0, react_1.useState)(function () {
        return monthlyPlans.length > 0 ? monthlyPlans[0].memberId : '';
    }), selectedMemberId = _b[0], setSelectedMemberId = _b[1];
    var _c = (0, react_1.useState)(false), isCustomMealOpen = _c[0], setIsCustomMealOpen = _c[1];
    var _d = (0, react_1.useState)(''), customMealName = _d[0], setCustomMealName = _d[1];
    var _e = (0, react_1.useState)(''), customMealCalories = _e[0], setCustomMealCalories = _e[1];
    var _f = (0, react_1.useState)('breakfast'), currentMealType = _f[0], setCurrentMealType = _f[1];
    var currentPlan = monthlyPlans.find(function (p) { return p.memberId === selectedMemberId; });
    var dayPlan = currentPlan === null || currentPlan === void 0 ? void 0 : currentPlan.days[selectedDate];
    (0, react_1.useEffect)(function () {
        if (monthlyPlans.length > 0 && !monthlyPlans.find(function (p) { return p.memberId === selectedMemberId; })) {
            setSelectedMemberId(monthlyPlans[0].memberId);
        }
    }, [monthlyPlans, selectedMemberId]);
    var handleDateChange = function (direction) {
        var date = new Date(selectedDate);
        if (direction === 'prev') {
            date.setDate(date.getDate() - 1);
        }
        else {
            date.setDate(date.getDate() + 1);
        }
        onDateChange(date.toISOString().split('T')[0]);
    };
    var handleAddCustomMeal = function () {
        if (customMealName && customMealCalories && dayPlan) {
            onAddCustomMeal(selectedMemberId, selectedDate, currentMealType, {
                id: "custom-".concat(Date.now()),
                name: customMealName,
                calories: parseInt(customMealCalories),
                eaten: true,
                isCustom: true
            });
            setCustomMealName('');
            setCustomMealCalories('');
            setIsCustomMealOpen(false);
        }
    };
    var MealSection = function (_a) {
        var title = _a.title, meals = _a.meals, mealType = _a.mealType, Icon = _a.icon;
        return (<div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-emerald-500"/>
          <h3 className="font-semibold text-gray-700">{title}</h3>
        </div>
        <button_1.Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700" onClick={function () { setCurrentMealType(mealType); setIsCustomMealOpen(true); }}>
          <lucide_react_1.Plus className="w-4 h-4 mr-1"/> Add
        </button_1.Button>
      </div>
      <div className="space-y-2">
        {meals.map(function (meal) { return (<div key={meal.id} className={"flex items-center justify-between p-3 rounded-lg border-2 transition-all ".concat(meal.eaten ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300')}>
            <div className="flex items-center gap-3">
              <button onClick={function () { return dayPlan && onUpdateMeal(selectedMemberId, selectedDate, mealType, meal.id, !meal.eaten); }} className={"w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ".concat(meal.eaten ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300')}>
                {meal.eaten && <lucide_react_1.Check className="w-4 h-4 text-white"/>}
              </button>
              <div>
                <p className={"font-medium ".concat(meal.eaten ? 'text-emerald-700' : 'text-gray-800')}>{meal.name}</p>
                {meal.isCustom && (<span className="inline-flex items-center rounded-full border px-2 py-0 text-xs font-semibold border-gray-200 bg-gray-100 text-gray-600 mt-1">
                    Custom
                  </span>)}
              </div>
            </div>
            <span className={"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ".concat(meal.eaten ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600')}>
              {meal.calories} kcal
            </span>
          </div>); })}
      </div>
    </div>);
    };
    if (!dayPlan) {
        return (<div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No plan found for this date.</p>
      </div>);
    }
    var progressPercentage = Math.min(100, Math.round((dayPlan.consumedCalories / dayPlan.targetCalories) * 100));
    return (<div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <select_1.Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
            <select_1.SelectTrigger className="w-full">
              <select_1.SelectValue placeholder="Select family member"/>
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              {monthlyPlans.map(function (plan) { return (<select_1.SelectItem key={plan.memberId} value={plan.memberId}>
                  {plan.memberName}
                </select_1.SelectItem>); })}
            </select_1.SelectContent>
          </select_1.Select>
        </div>

        <card_1.Card>
          <card_1.CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <card_1.CardTitle className="text-lg flex items-center gap-2">
                <lucide_react_1.Calendar className="w-5 h-5 text-emerald-500"/>
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </card_1.CardTitle>
              <div className="flex gap-1">
                <button_1.Button variant="outline" size="icon" onClick={function () { return handleDateChange('prev'); }}>
                  <lucide_react_1.ChevronLeft className="w-4 h-4"/>
                </button_1.Button>
                <input type="date" value={selectedDate} onChange={function (e) { return onDateChange(e.target.value); }} className="w-32 px-2 py-1 text-sm border rounded-md"/>
                <button_1.Button variant="outline" size="icon" onClick={function () { return handleDateChange('next'); }}>
                  <lucide_react_1.ChevronRight className="w-4 h-4"/>
                </button_1.Button>
              </div>
            </div>
          </card_1.CardHeader>
          <card_1.CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Daily Progress</span>
                <span className="font-semibold text-emerald-600">{dayPlan.consumedCalories} / {dayPlan.targetCalories} kcal</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className={"h-full transition-all duration-500 ".concat(progressPercentage >= 100 ? 'bg-emerald-500' : 'bg-emerald-400')} style={{ width: "".concat(progressPercentage, "%") }}/>
              </div>
              {progressPercentage >= 100 && (<p className="text-sm text-emerald-600 font-medium flex items-center gap-1 mt-1">
                  <lucide_react_1.Target className="w-4 h-4"/> Goal Reached!
                </p>)}
            </div>
          </card_1.CardContent>
        </card_1.Card>
      </div>

      <div className="space-y-6">
        <MealSection title="Breakfast" meals={dayPlan.breakfast} mealType="breakfast" icon={lucide_react_1.Utensils}/>
        <MealSection title="Lunch" meals={dayPlan.lunch} mealType="lunch" icon={lucide_react_1.Utensils}/>
        <MealSection title="Dinner" meals={dayPlan.dinner} mealType="dinner" icon={lucide_react_1.Utensils}/>
      </div>

      {/* Custom Modal */}
      {isCustomMealOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Add Custom Dish</h2>
              <button onClick={function () { return setIsCustomMealOpen(false); }} className="text-gray-500 hover:text-gray-700">
                <lucide_react_1.X className="w-5 h-5"/>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-500">
                Add a dish that isn't in your plan for {currentMealType}.
              </p>
              <div className="space-y-2">
                <label_1.Label htmlFor="dish-name">Dish Name</label_1.Label>
                <input_1.Input id="dish-name" placeholder="e.g., Apple Pie" value={customMealName} onChange={function (e) { return setCustomMealName(e.target.value); }}/>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="calories">Calories</label_1.Label>
                <input_1.Input id="calories" type="number" placeholder="e.g., 250" value={customMealCalories} onChange={function (e) { return setCustomMealCalories(e.target.value); }}/>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50 rounded-b-lg">
              <button_1.Button variant="outline" onClick={function () { return setIsCustomMealOpen(false); }}>Cancel</button_1.Button>
              <button_1.Button onClick={handleAddCustomMeal}>Save Dish</button_1.Button>
            </div>
          </div>
        </div>)}
    </div>);
}
