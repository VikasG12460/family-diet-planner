"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilySummary = FamilySummary;
var card_1 = require("../ui/card");
var avatar_1 = require("../ui/avatar");
var lucide_react_1 = require("lucide-react");
function FamilySummary(_a) {
    var monthlyPlans = _a.monthlyPlans, selectedDate = _a.selectedDate;
    var todaysData = monthlyPlans.map(function (plan) {
        var dayPlan = plan.days[selectedDate];
        return {
            memberId: plan.memberId,
            memberName: plan.memberName,
            dayPlan: dayPlan
        };
    }).filter(function (item) { return item.dayPlan !== undefined; });
    var totalFamilyTarget = todaysData.reduce(function (sum, item) { var _a; return sum + (((_a = item.dayPlan) === null || _a === void 0 ? void 0 : _a.targetCalories) || 0); }, 0);
    var totalFamilyConsumed = todaysData.reduce(function (sum, item) { var _a; return sum + (((_a = item.dayPlan) === null || _a === void 0 ? void 0 : _a.consumedCalories) || 0); }, 0);
    var familyProgress = totalFamilyTarget > 0 ? Math.round((totalFamilyConsumed / totalFamilyTarget) * 100) : 0;
    // Custom Progress Component
    var ProgressBar = function (_a) {
        var value = _a.value, className = _a.className;
        return (<div className={"w-full bg-gray-200 rounded-full h-2.5 overflow-hidden ".concat(className)}>
      <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: "".concat(Math.min(100, value), "%") }}/>
    </div>);
    };
    return (<div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Family Overview</h2>
        <p className="text-gray-500">
          {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <card_1.Card className="border-emerald-200 bg-emerald-50/50">
        <card_1.CardHeader className="pb-3">
          <card_1.CardTitle className="text-lg flex items-center gap-2 text-emerald-700">
            <lucide_react_1.Users className="w-5 h-5"/>
            Total Family Progress
          </card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Consumed</span>
              <span className="font-bold text-emerald-700 text-lg">
                {totalFamilyConsumed} / {totalFamilyTarget} kcal
              </span>
            </div>
            <ProgressBar value={familyProgress} className="h-3"/>
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
        </card_1.CardContent>
      </card_1.Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <lucide_react_1.Target className="w-4 h-4"/>
          Member Status
        </h3>
        <div className="grid gap-4">
          {todaysData.map(function (item) {
            var progress = Math.min(100, Math.round((item.dayPlan.consumedCalories / item.dayPlan.targetCalories) * 100));
            var initials = item.memberName.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
            return (<card_1.Card key={item.memberId} className="overflow-hidden">
                <card_1.CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <avatar_1.Avatar className="h-12 w-12 bg-emerald-100 text-emerald-700">
                      <avatar_1.AvatarFallback className="font-semibold">{initials}</avatar_1.AvatarFallback>
                    </avatar_1.Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">{item.memberName}</h4>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <lucide_react_1.Flame className="w-3 h-3"/>
                          {item.dayPlan.consumedCalories}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{progress}% of goal</span>
                          <span>{item.dayPlan.targetCalories} kcal</span>
                        </div>
                        <ProgressBar value={progress}/>
                      </div>
                    </div>
                  </div>
                </card_1.CardContent>
              </card_1.Card>);
        })}
        </div>
      </div>
    </div>);
}
