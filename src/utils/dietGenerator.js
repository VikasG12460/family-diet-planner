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
exports.calculateConsumedCalories = calculateConsumedCalories;
exports.generateMonthlyPlan = generateMonthlyPlan;
exports.hydrateMonthlyPlans = hydrateMonthlyPlans;
var DAYS_TO_GENERATE = 365;
/* -------------------- MEAL DATABASE -------------------- */
var MEAL_DATABASE = {
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
function shuffleArray(array) {
    var _a;
    var newArray = __spreadArray([], array, true);
    for (var i = newArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [newArray[j], newArray[i]], newArray[i] = _a[0], newArray[j] = _a[1];
    }
    return newArray;
}
function getMealsForMealType(type, member, location) {
    var baseMeals = MEAL_DATABASE[type];
    // location filter
    if (location.cityType === 'rural') {
        baseMeals = baseMeals.filter(function (m) { return m.tags.includes('fiber') || m.tags.includes('indian'); });
    }
    // health filter
    if (member.healthConditions.includes('Diabetes')) {
        baseMeals = baseMeals.filter(function (m) { return m.calories < 350; });
    }
    if (baseMeals.length === 0) {
        baseMeals = MEAL_DATABASE[type];
    }
    return baseMeals.map(function (meal, index) { return ({
        id: "".concat(type, "-").concat(index),
        name: meal.name,
        calories: meal.calories,
        eaten: false,
        isCustom: false
    }); });
}
/* -------------------- CALORIE CALC -------------------- */
function calculateConsumedCalories(dayPlan) {
    var allMeals = __spreadArray(__spreadArray(__spreadArray([], dayPlan.breakfast, true), dayPlan.lunch, true), dayPlan.dinner, true);
    return allMeals
        .filter(function (m) { return m.eaten; })
        .reduce(function (sum, m) { return sum + m.calories; }, 0);
}
/* -------------------- MAIN GENERATOR -------------------- */
function generateMonthlyPlan(members, location) {
    var plans = [];
    var startDate = new Date();
    var sharedDays = {};
    for (var i = 0; i < DAYS_TO_GENERATE; i++) {
        var currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        var dateKey = currentDate.toISOString().split('T')[0];
        var referenceMember = members[0];
        sharedDays[dateKey] = {
            breakfast: shuffleArray(getMealsForMealType('breakfast', referenceMember, location)).slice(0, 3),
            lunch: shuffleArray(getMealsForMealType('lunch', referenceMember, location)).slice(0, 3),
            dinner: shuffleArray(getMealsForMealType('dinner', referenceMember, location)).slice(0, 3)
        };
    }
    members.forEach(function (member) {
        var days = {};
        var bmr = 10 * member.weight +
            6.25 * member.height -
            5 * member.age;
        bmr += member.gender === 'male' ? 5 : -161;
        var targetCalories = Math.round(bmr * 1.55);
        if (member.goal === 'lose')
            targetCalories -= 500;
        if (member.goal === 'gain')
            targetCalories += 500;
        Object.entries(sharedDays).forEach(function (_a) {
            var dateKey = _a[0], menu = _a[1];
            var cloneMeal = function (meal, type) { return (__assign(__assign({}, meal), { id: "".concat(type, "-").concat(member.id, "-").concat(dateKey, "-").concat(meal.id), eaten: false })); };
            days[dateKey] = {
                memberId: member.id,
                memberName: member.name,
                date: dateKey,
                targetCalories: targetCalories,
                consumedCalories: 0,
                breakfast: menu.breakfast.map(function (m) { return cloneMeal(m, 'breakfast'); }),
                lunch: menu.lunch.map(function (m) { return cloneMeal(m, 'lunch'); }),
                dinner: menu.dinner.map(function (m) { return cloneMeal(m, 'dinner'); })
            };
        });
        plans.push({
            memberId: member.id,
            memberName: member.name,
            days: days
        });
    });
    return plans;
}
/* -------------------- HYDRATE -------------------- */
function hydrateMonthlyPlans(savedPlans) {
    return savedPlans.map(function (plan) { return ({
        memberId: plan.memberId,
        memberName: plan.memberName,
        days: plan.days
    }); });
}
