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
exports.MemberForm = MemberForm;
var react_1 = require("react");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var select_1 = require("../ui/select");
var HEALTH_OPTIONS = [
    { value: 'None', label: 'None' },
    { value: 'Diabetes', label: 'Diabetes' },
    { value: 'Hypertension', label: 'Hypertension' },
    { value: 'Allergy', label: 'Food Allergy' },
];
function MemberForm(_a) {
    var member = _a.member, onSave = _a.onSave, onCancel = _a.onCancel;
    var _b = (0, react_1.useState)({
        name: '',
        age: '',
        height: '',
        weight: '',
        gender: 'male',
        goal: 'maintain',
        healthConditions: []
    }), formData = _b[0], setFormData = _b[1];
    (0, react_1.useEffect)(function () {
        if (member) {
            setFormData({
                name: member.name || '',
                age: member.age ? member.age.toString() : '',
                height: member.height ? member.height.toString() : '',
                weight: member.weight ? member.weight.toString() : '',
                gender: member.gender || 'male',
                goal: member.goal || 'maintain',
                healthConditions: member.healthConditions || ['None']
            });
        }
    }, [member]);
    var handleHealthToggle = function (condition) {
        if (condition === 'None') {
            setFormData(__assign(__assign({}, formData), { healthConditions: ['None'] }));
            return;
        }
        var current = formData.healthConditions.filter(function (c) { return c !== 'None'; });
        if (current.includes(condition)) {
            setFormData(__assign(__assign({}, formData), { healthConditions: current.filter(function (c) { return c !== condition; }) }));
        }
        else {
            setFormData(__assign(__assign({}, formData), { healthConditions: __spreadArray(__spreadArray([], current, true), [condition], false) }));
        }
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        if (!formData.name || !formData.age || !formData.height || !formData.weight) {
            alert('Please fill in all fields');
            return;
        }
        var conditions = formData.healthConditions.length === 0 ||
            formData.healthConditions.includes('None')
            ? ['None']
            : formData.healthConditions;
        onSave({
            name: formData.name,
            age: parseInt(formData.age),
            height: parseInt(formData.height),
            weight: parseInt(formData.weight),
            gender: formData.gender,
            goal: formData.goal,
            healthConditions: conditions,
            activityLevel: "moderate", // ✅ required field added
            dietaryPreference: "veg" // ✅ required field added
        });
    };
    return (<form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Name */}
      <div className="space-y-2">
        <label_1.Label htmlFor="name">Full Name</label_1.Label>
        <input_1.Input id="name" placeholder="e.g. John Doe" value={formData.name} onChange={function (e) {
            return setFormData(__assign(__assign({}, formData), { name: e.target.value }));
        }}/>
      </div>

      {/* Age + Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label_1.Label htmlFor="age">Age</label_1.Label>
          <input_1.Input id="age" type="number" value={formData.age} onChange={function (e) {
            return setFormData(__assign(__assign({}, formData), { age: e.target.value }));
        }}/>
        </div>

        <div className="space-y-2">
          <label_1.Label>Gender</label_1.Label>
          <select_1.Select value={formData.gender} onValueChange={function (val) {
            return setFormData(__assign(__assign({}, formData), { gender: val }));
        }}>
            <select_1.SelectTrigger>
              <select_1.SelectValue />
            </select_1.SelectTrigger>
            <select_1.SelectContent>
              <select_1.SelectItem value="male">Male</select_1.SelectItem>
              <select_1.SelectItem value="female">Female</select_1.SelectItem>
            </select_1.SelectContent>
          </select_1.Select>
        </div>
      </div>

      {/* Height + Weight */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label_1.Label>Height (cm)</label_1.Label>
          <input_1.Input type="number" value={formData.height} onChange={function (e) {
            return setFormData(__assign(__assign({}, formData), { height: e.target.value }));
        }}/>
        </div>

        <div className="space-y-2">
          <label_1.Label>Weight (kg)</label_1.Label>
          <input_1.Input type="number" value={formData.weight} onChange={function (e) {
            return setFormData(__assign(__assign({}, formData), { weight: e.target.value }));
        }}/>
        </div>
      </div>

      {/* Goal */}
      <div className="space-y-2">
        <label_1.Label>Goal</label_1.Label>
        <select_1.Select value={formData.goal} onValueChange={function (val) {
            return setFormData(__assign(__assign({}, formData), { goal: val }));
        }}>
          <select_1.SelectTrigger>
            <select_1.SelectValue />
          </select_1.SelectTrigger>
          <select_1.SelectContent>
            <select_1.SelectItem value="maintain">Maintain</select_1.SelectItem>
            <select_1.SelectItem value="lose">Lose</select_1.SelectItem>
            <select_1.SelectItem value="gain">Gain</select_1.SelectItem>
          </select_1.SelectContent>
        </select_1.Select>
      </div>

      {/* Health */}
      <div className="space-y-2">
        <label_1.Label>Health Conditions</label_1.Label>
        <div className="grid grid-cols-2 gap-2">
          {HEALTH_OPTIONS.map(function (option) { return (<button key={option.value} type="button" onClick={function () { return handleHealthToggle(option.value); }} className={"p-2 border rounded ".concat(formData.healthConditions.includes(option.value)
                ? 'bg-green-100'
                : '')}>
              {option.label}
            </button>); })}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button_1.Button type="button" onClick={onCancel}>
          Cancel
        </button_1.Button>
        <button_1.Button type="submit">
          Save
        </button_1.Button>
      </div>

    </form>);
}
