"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
var CURRENT_USER_KEY = "family_diet_current_user";
var FAMILY_PROFILE_KEY = "family_diet_profile";
var MONTHLY_PLAN_KEY = "family_diet_monthly_plan";
var USERS_KEY = "family_diet_users";
exports.storage = {
    // --- User Management ---
    getUsers: function () {
        if (typeof window === "undefined")
            return [];
        var users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : [];
    },
    saveUser: function (user) {
        var users = exports.storage.getUsers();
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    },
    getUserByEmail: function (email) {
        var users = exports.storage.getUsers();
        return users.find(function (u) { return u.email.toLowerCase() === email.toLowerCase(); }) || null;
    },
    // --- Current Session ---
    getCurrentUser: function () {
        if (typeof window === "undefined")
            return null;
        var user = localStorage.getItem(CURRENT_USER_KEY);
        return user ? JSON.parse(user) : null;
    },
    setCurrentUser: function (user) {
        if (typeof window === "undefined")
            return;
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        }
        else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    },
    // --- Family Profile ---
    getFamilyProfile: function () {
        if (typeof window === "undefined")
            return null;
        var profile = localStorage.getItem(FAMILY_PROFILE_KEY);
        return profile ? JSON.parse(profile) : null;
    },
    saveFamilyProfile: function (profile) {
        if (typeof window === "undefined")
            return;
        localStorage.setItem(FAMILY_PROFILE_KEY, JSON.stringify(profile));
    },
    // --- Monthly Plan ---
    getMonthlyPlan: function () {
        if (typeof window === "undefined")
            return null;
        var plan = localStorage.getItem(MONTHLY_PLAN_KEY);
        return plan ? JSON.parse(plan) : null;
    },
    saveMonthlyPlan: function (plan) {
        if (typeof window === "undefined")
            return;
        localStorage.setItem(MONTHLY_PLAN_KEY, JSON.stringify(plan));
    },
    clearAll: function () {
        if (typeof window === "undefined")
            return;
        localStorage.removeItem(CURRENT_USER_KEY);
        localStorage.removeItem(FAMILY_PROFILE_KEY);
        localStorage.removeItem(MONTHLY_PLAN_KEY);
    },
};
