"use strict";
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
exports.AddMemberDialog = AddMemberDialog;
var react_1 = require("react");
var dialog_1 = require("../ui/dialog");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var select_1 = require("../ui/select");
var radio_group_1 = require("../ui/radio-group");
var checkbox_1 = require("../ui/checkbox"); // Assuming Checkbox exists or using div
var lucide_react_1 = require("lucide-react");
function AddMemberDialog(_a) {
    var onAddMember = _a.onAddMember;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    var _c = (0, react_1.useState)(''), name = _c[0], setName = _c[1];
    var _d = (0, react_1.useState)(''), age = _d[0], setAge = _d[1];
    var _e = (0, react_1.useState)('male'), gender = _e[0], setGender = _e[1];
    var _f = (0, react_1.useState)('moderate'), activityLevel = _f[0], setActivityLevel = _f[1];
    var _g = (0, react_1.useState)('maintain'), goal = _g[0], setGoal = _g[1];
    // New State
    var _h = (0, react_1.useState)('non-vegetarian'), dietaryPreference = _h[0], setDietaryPreference = _h[1];
    var _j = (0, react_1.useState)([]), healthConditions = _j[0], setHealthConditions = _j[1];
    var healthOptions = [
        { id: 'diabetes', label: 'Diabetes / High Sugar' },
        { id: 'hypertension', label: 'Hypertension / High BP' },
        { id: 'heart', label: 'Heart Disease' },
        { id: 'obesity', label: 'Obesity' },
        { id: 'none', label: 'None' }
    ];
    var handleHealthConditionChange = function (conditionId, checked) {
        if (conditionId === 'none') {
            setHealthConditions(checked ? [] : healthConditions);
        }
        else {
            if (checked) {
                setHealthConditions(__spreadArray(__spreadArray([], healthConditions.filter(function (c) { return c !== 'none'; }), true), [conditionId], false));
            }
            else {
                setHealthConditions(healthConditions.filter(function (c) { return c !== conditionId; }));
            }
        }
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!name || !age)
            return;
        var newMember = {
            id: Date.now().toString(),
            name: name,
            age: parseInt(age),
            gender: gender,
            activityLevel: activityLevel,
            goal: goal,
            healthConditions: healthConditions,
            dietaryPreference: dietaryPreference,
            likes: '',
            dislikes: ''
        };
        onAddMember(newMember);
        setOpen(false);
        setName('');
        setAge('');
        setGender('male');
        setActivityLevel('moderate');
        setGoal('maintain');
        setDietaryPreference('non-vegetarian');
        setHealthConditions([]);
    };
    return (<dialog_1.Dialog open={open} onOpenChange={setOpen}>
      <dialog_1.DialogTrigger asChild>
        <button_1.Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          <lucide_react_1.Plus className="w-4 h-4 mr-2"/>
          Add Family Member
        </button_1.Button>
      </dialog_1.DialogTrigger>
      <dialog_1.DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>Add New Family Member</dialog_1.DialogTitle>
          <dialog_1.DialogDescription>
            Enter details to generate a personalized diet plan.
          </dialog_1.DialogDescription>
        </dialog_1.DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label_1.Label htmlFor="name">Full Name</label_1.Label>
            <input_1.Input id="name" placeholder="e.g. John Doe" value={name} onChange={function (e) { return setName(e.target.value); }} required/>
          </div>
          
          <div className="space-y-2">
            <label_1.Label htmlFor="age">Age</label_1.Label>
            <input_1.Input id="age" type="number" placeholder="e.g. 25" value={age} onChange={function (e) { return setAge(e.target.value); }} required/>
          </div>

          <div className="space-y-2">
            <label_1.Label>Gender</label_1.Label>
            <radio_group_1.RadioGroup value={gender} onValueChange={function (v) { return setGender(v); }}>
              <div className="flex items-center space-x-2">
                <radio_group_1.RadioGroupItem value="male" id="male"/>
                <label_1.Label htmlFor="male">Male</label_1.Label>
              </div>
              <div className="flex items-center space-x-2">
                <radio_group_1.RadioGroupItem value="female" id="female"/>
                <label_1.Label htmlFor="female">Female</label_1.Label>
              </div>
            </radio_group_1.RadioGroup>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="diet">Dietary Preference</label_1.Label>
            <select_1.Select value={dietaryPreference} onValueChange={function (v) { return setDietaryPreference(v); }}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="non-vegetarian">Non-Vegetarian</select_1.SelectItem>
                <select_1.SelectItem value="vegetarian">Vegetarian</select_1.SelectItem>
                <select_1.SelectItem value="vegan">Vegan</select_1.SelectItem>
                <select_1.SelectItem value="no-seafood">No Seafood</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          <div className="space-y-2">
            <label_1.Label>Health Conditions</label_1.Label>
            <div className="space-y-2 border p-3 rounded-lg">
              {healthOptions.map(function (option) { return (<div key={option.id} className="flex items-center space-x-2">
                  <checkbox_1.Checkbox id={option.id} checked={option.id === 'none' ? healthConditions.length === 0 : healthConditions.includes(option.id)} onCheckedChange={function (checked) { return handleHealthConditionChange(option.id, checked); }}/>
                  <label_1.Label htmlFor={option.id} className="text-sm font-normal">{option.label}</label_1.Label>
                </div>); })}
            </div>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="activity">Activity Level</label_1.Label>
            <select_1.Select value={activityLevel} onValueChange={function (v) { return setActivityLevel(v); }}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="sedentary">Sedentary</select_1.SelectItem>
                <select_1.SelectItem value="moderate">Moderate</select_1.SelectItem>
                <select_1.SelectItem value="active">Active</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="goal">Goal</label_1.Label>
            <select_1.Select value={goal} onValueChange={function (v) { return setGoal(v); }}>
              <select_1.SelectTrigger>
                <select_1.SelectValue />
              </select_1.SelectTrigger>
              <select_1.SelectContent>
                <select_1.SelectItem value="maintain">Maintain Weight</select_1.SelectItem>
                <select_1.SelectItem value="lose">Lose Weight</select_1.SelectItem>
                <select_1.SelectItem value="gain">Gain Weight</select_1.SelectItem>
              </select_1.SelectContent>
            </select_1.Select>
          </div>

          <div className="flex justify-end pt-4">
            <button_1.Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Add Member
            </button_1.Button>
          </div>
        </form>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
