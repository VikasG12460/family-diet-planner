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
exports.ProfileSetup = ProfileSetup;
var react_1 = require("react");
var card_1 = require("../ui/card");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var select_1 = require("../ui/select");
var radio_group_1 = require("../ui/radio-group");
var checkbox_1 = require("../ui/checkbox"); // Import Checkbox
var lucide_react_1 = require("lucide-react");
function ProfileSetup(_a) {
    var user = _a.user, onComplete = _a.onComplete;
    var _b = (0, react_1.useState)(1), step = _b[0], setStep = _b[1];
    // Primary User State
    var _c = (0, react_1.useState)({
        height: '',
        weight: '',
        age: '',
        gender: 'male',
        goal: 'maintain',
        activityLevel: 'moderate',
        dietaryPreference: 'non-vegetarian',
        healthConditions: []
    }), primaryUser = _c[0], setPrimaryUser = _c[1];
    // Location State
    var _d = (0, react_1.useState)({
        country: 'India',
        state: '',
        cityType: 'urban'
    }), location = _d[0], setLocation = _d[1];
    // Family Members State
    var _e = (0, react_1.useState)([]), members = _e[0], setMembers = _e[1];
    var _f = (0, react_1.useState)({
        name: '',
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        goal: 'maintain',
        activityLevel: 'moderate',
        dietaryPreference: 'non-vegetarian',
        healthConditions: []
    }), newMember = _f[0], setNewMember = _f[1];
    // Health Options
    var healthOptions = [
        { id: 'diabetes', label: 'Diabetes' },
        { id: 'hypertension', label: 'Hypertension (BP)' },
        { id: 'heart', label: 'Heart Disease' },
        { id: 'obesity', label: 'Obesity' }
    ];
    var handlePrimaryHealthChange = function (conditionId, checked) {
        setPrimaryUser(function (prev) {
            if (checked) {
                return __assign(__assign({}, prev), { healthConditions: __spreadArray(__spreadArray([], prev.healthConditions, true), [conditionId], false) });
            }
            else {
                return __assign(__assign({}, prev), { healthConditions: prev.healthConditions.filter(function (c) { return c !== conditionId; }) });
            }
        });
    };
    var handleNewMemberHealthChange = function (conditionId, checked) {
        setNewMember(function (prev) {
            var currentConditions = prev.healthConditions || [];
            if (checked) {
                return __assign(__assign({}, prev), { healthConditions: __spreadArray(__spreadArray([], currentConditions, true), [conditionId], false) });
            }
            else {
                return __assign(__assign({}, prev), { healthConditions: currentConditions.filter(function (c) { return c !== conditionId; }) });
            }
        });
    };
    var handleAddMember = function () {
        if (newMember.name && newMember.age && newMember.weight && newMember.height) {
            setMembers(__spreadArray(__spreadArray([], members, true), [{
                    id: "m-".concat(Date.now()),
                    name: newMember.name,
                    age: parseInt(newMember.age),
                    gender: newMember.gender,
                    weight: parseFloat(newMember.weight),
                    height: parseFloat(newMember.height),
                    goal: newMember.goal,
                    activityLevel: newMember.activityLevel,
                    dietaryPreference: newMember.dietaryPreference || 'non-vegetarian',
                    healthConditions: newMember.healthConditions || []
                }], false));
            // Reset form
            setNewMember({
                name: '', age: '', gender: 'male', weight: '', height: '',
                goal: 'maintain', activityLevel: 'moderate',
                dietaryPreference: 'non-vegetarian', healthConditions: []
            });
        }
    };
    var handleSubmit = function () {
        // Add primary user as a member too
        var primaryMember = {
            id: user.id,
            name: user.name,
            age: parseInt(primaryUser.age) || 30,
            gender: primaryUser.gender,
            weight: parseFloat(primaryUser.weight),
            height: parseFloat(primaryUser.height),
            goal: primaryUser.goal,
            activityLevel: primaryUser.activityLevel,
            dietaryPreference: primaryUser.dietaryPreference,
            healthConditions: primaryUser.healthConditions
        };
        var profile = {
            primaryUser: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            members: __spreadArray([primaryMember], members, true),
            location: {
                country: location.country,
                state: location.state || 'Unknown',
                cityType: location.cityType
            }
        };
        onComplete(profile);
    };
    return (<div className="w-full max-w-md mx-auto space-y-6">
      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-2xl text-emerald-600">Setup Your Family</card_1.CardTitle>
          <card_1.CardDescription>Step {step} of 3</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-6">
          {step === 1 && (<div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><lucide_react_1.User className="w-4 h-4"/> Your Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label_1.Label>Age</label_1.Label>
                  <div className="relative">
                    <lucide_react_1.Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
                    <input_1.Input className="pl-9" type="number" placeholder="30" value={primaryUser.age} onChange={function (e) { return setPrimaryUser(__assign(__assign({}, primaryUser), { age: e.target.value })); }}/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label_1.Label>Gender</label_1.Label>
                  <select_1.Select value={primaryUser.gender} onValueChange={function (val) { return setPrimaryUser(__assign(__assign({}, primaryUser), { gender: val })); }}>
                    <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="male">Male</select_1.SelectItem>
                      <select_1.SelectItem value="female">Female</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label_1.Label>Height (cm)</label_1.Label>
                  <div className="relative">
                    <lucide_react_1.Ruler className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
                    <input_1.Input className="pl-9" type="number" placeholder="170" value={primaryUser.height} onChange={function (e) { return setPrimaryUser(__assign(__assign({}, primaryUser), { height: e.target.value })); }}/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label_1.Label>Weight (kg)</label_1.Label>
                  <div className="relative">
                    <lucide_react_1.Weight className="absolute left-3 top-3 w-4 h-4 text-gray-400"/>
                    <input_1.Input className="pl-9" type="number" placeholder="70" value={primaryUser.weight} onChange={function (e) { return setPrimaryUser(__assign(__assign({}, primaryUser), { weight: e.target.value })); }}/>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label_1.Label>Activity Level</label_1.Label>
                <select_1.Select value={primaryUser.activityLevel} onValueChange={function (val) { return setPrimaryUser(__assign(__assign({}, primaryUser), { activityLevel: val })); }}>
                  <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="sedentary">Sedentary (Little exercise)</select_1.SelectItem>
                    <select_1.SelectItem value="moderate">Moderate (Exercise 3-5 days)</select_1.SelectItem>
                    <select_1.SelectItem value="active">Active (Exercise 6-7 days)</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>

              <div className="space-y-2">
                <label_1.Label>Goal</label_1.Label>
                <radio_group_1.RadioGroup value={primaryUser.goal} onValueChange={function (val) { return setPrimaryUser(__assign(__assign({}, primaryUser), { goal: val })); }}>
                  <div className="flex items-center space-x-2">
                    <radio_group_1.RadioGroupItem value="lose" id="lose"/>
                    <label_1.Label htmlFor="lose">Lose Weight</label_1.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <radio_group_1.RadioGroupItem value="maintain" id="maintain"/>
                    <label_1.Label htmlFor="maintain">Maintain Weight</label_1.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <radio_group_1.RadioGroupItem value="gain" id="gain"/>
                    <label_1.Label htmlFor="gain">Gain Muscle</label_1.Label>
                  </div>
                </radio_group_1.RadioGroup>
              </div>

              {/* NEW: Dietary Preference */}
              <div className="space-y-2">
                <label_1.Label>Dietary Preference</label_1.Label>
                <select_1.Select value={primaryUser.dietaryPreference} onValueChange={function (val) { return setPrimaryUser(__assign(__assign({}, primaryUser), { dietaryPreference: val })); }}>
                  <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="non-vegetarian">Non-Vegetarian</select_1.SelectItem>
                    <select_1.SelectItem value="vegetarian">Vegetarian</select_1.SelectItem>
                    <select_1.SelectItem value="vegan">Vegan</select_1.SelectItem>
                    <select_1.SelectItem value="no-seafood">No Seafood</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>

              {/* NEW: Health Conditions */}
              <div className="space-y-2">
                <label_1.Label className="flex items-center gap-2"><lucide_react_1.Heart className="w-4 h-4 text-red-500"/> Health Conditions</label_1.Label>
                <div className="space-y-2 border p-3 rounded-lg bg-gray-50">
                  {healthOptions.map(function (option) { return (<div key={option.id} className="flex items-center space-x-2">
                      <checkbox_1.Checkbox id={"primary-".concat(option.id)} checked={primaryUser.healthConditions.includes(option.id)} onCheckedChange={function (checked) { return handlePrimaryHealthChange(option.id, checked); }}/>
                      <label_1.Label htmlFor={"primary-".concat(option.id)} className="text-sm font-normal cursor-pointer">{option.label}</label_1.Label>
                    </div>); })}
                </div>
              </div>

              <button_1.Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={function () { return setStep(2); }}>Next</button_1.Button>
            </div>)}

          {step === 2 && (<div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><lucide_react_1.MapPin className="w-4 h-4"/> Location</h3>
              
              <div className="space-y-2">
                <label_1.Label>Country</label_1.Label>
                <select_1.Select value={location.country} onValueChange={function (val) { return setLocation(__assign(__assign({}, location), { country: val })); }}>
                  <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                  <select_1.SelectContent>
                    <select_1.SelectItem value="India">India</select_1.SelectItem>
                    <select_1.SelectItem value="USA">USA</select_1.SelectItem>
                    <select_1.SelectItem value="UK">UK</select_1.SelectItem>
                    <select_1.SelectItem value="Australia">Australia</select_1.SelectItem>
                  </select_1.SelectContent>
                </select_1.Select>
              </div>

              <div className="space-y-2">
                <label_1.Label>State/Region</label_1.Label>
                <input_1.Input placeholder="e.g. California" value={location.state} onChange={function (e) { return setLocation(__assign(__assign({}, location), { state: e.target.value })); }}/>
              </div>

              <div className="space-y-2">
                <label_1.Label>City Type</label_1.Label>
                <radio_group_1.RadioGroup value={location.cityType} onValueChange={function (val) { return setLocation(__assign(__assign({}, location), { cityType: val })); }}>
                  <div className="flex items-center space-x-2">
                    <radio_group_1.RadioGroupItem value="urban" id="urban"/>
                    <label_1.Label htmlFor="urban">Urban</label_1.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <radio_group_1.RadioGroupItem value="rural" id="rural"/>
                    <label_1.Label htmlFor="rural">Rural</label_1.Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <radio_group_1.RadioGroupItem value="coastal" id="coastal"/>
                    <label_1.Label htmlFor="coastal">Coastal</label_1.Label>
                  </div>
                </radio_group_1.RadioGroup>
              </div>

              <div className="flex gap-2">
                <button_1.Button variant="outline" className="flex-1" onClick={function () { return setStep(1); }}>Back</button_1.Button>
                <button_1.Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={function () { return setStep(3); }}>Next</button_1.Button>
              </div>
            </div>)}

          {step === 3 && (<div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><lucide_react_1.Users className="w-4 h-4"/> Family Members</h3>
              
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                <div className="grid grid-cols-2 gap-2">
                  <input_1.Input placeholder="Name" value={newMember.name} onChange={function (e) { return setNewMember(__assign(__assign({}, newMember), { name: e.target.value })); }}/>
                  <input_1.Input type="number" placeholder="Age" value={newMember.age} onChange={function (e) { return setNewMember(__assign(__assign({}, newMember), { age: e.target.value })); }}/>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select_1.Select value={newMember.gender} onValueChange={function (val) { return setNewMember(__assign(__assign({}, newMember), { gender: val })); }}>
                    <select_1.SelectTrigger><select_1.SelectValue placeholder="Gender"/></select_1.SelectTrigger>
                    <select_1.SelectContent><select_1.SelectItem value="male">Male</select_1.SelectItem><select_1.SelectItem value="female">Female</select_1.SelectItem></select_1.SelectContent>
                  </select_1.Select>
                  <select_1.Select value={newMember.activityLevel} onValueChange={function (val) { return setNewMember(__assign(__assign({}, newMember), { activityLevel: val })); }}>
                    <select_1.SelectTrigger><select_1.SelectValue placeholder="Activity"/></select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="sedentary">Sedentary</select_1.SelectItem>
                      <select_1.SelectItem value="moderate">Moderate</select_1.SelectItem>
                      <select_1.SelectItem value="active">Active</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select_1.Select value={newMember.goal} onValueChange={function (val) { return setNewMember(__assign(__assign({}, newMember), { goal: val })); }}>
                    <select_1.SelectTrigger><select_1.SelectValue placeholder="Goal"/></select_1.SelectTrigger>
                    <select_1.SelectContent><select_1.SelectItem value="lose">Lose</select_1.SelectItem><select_1.SelectItem value="maintain">Maintain</select_1.SelectItem><select_1.SelectItem value="gain">Gain</select_1.SelectItem></select_1.SelectContent>
                  </select_1.Select>
                  <div className="col-span-2 grid grid-cols-2 gap-2">
                    <input_1.Input type="number" placeholder="Height (cm)" value={newMember.height} onChange={function (e) { return setNewMember(__assign(__assign({}, newMember), { height: e.target.value })); }}/>
                    <input_1.Input type="number" placeholder="Weight (kg)" value={newMember.weight} onChange={function (e) { return setNewMember(__assign(__assign({}, newMember), { weight: e.target.value })); }}/>
                  </div>
                </div>

                {/* NEW: Dietary Preference for Family Member */}
                <div className="space-y-2">
                  <label_1.Label>Dietary Preference</label_1.Label>
                  <select_1.Select value={newMember.dietaryPreference} onValueChange={function (val) { return setNewMember(__assign(__assign({}, newMember), { dietaryPreference: val })); }}>
                    <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                    <select_1.SelectContent>
                      <select_1.SelectItem value="non-vegetarian">Non-Vegetarian</select_1.SelectItem>
                      <select_1.SelectItem value="vegetarian">Vegetarian</select_1.SelectItem>
                      <select_1.SelectItem value="vegan">Vegan</select_1.SelectItem>
                      <select_1.SelectItem value="no-seafood">No Seafood</select_1.SelectItem>
                    </select_1.SelectContent>
                  </select_1.Select>
                </div>

                {/* NEW: Health Conditions for Family Member */}
                <div className="space-y-2">
                  <label_1.Label className="flex items-center gap-2"><lucide_react_1.Heart className="w-4 h-4 text-red-500"/> Health Conditions</label_1.Label>
                  <div className="space-y-2 border p-2 rounded-lg bg-white">
                    {healthOptions.map(function (option) { return (<div key={option.id} className="flex items-center space-x-2">
                        <checkbox_1.Checkbox id={"member-".concat(option.id)} checked={(newMember.healthConditions || []).includes(option.id)} onCheckedChange={function (checked) { return handleNewMemberHealthChange(option.id, checked); }}/>
                        <label_1.Label htmlFor={"member-".concat(option.id)} className="text-xs font-normal cursor-pointer">{option.label}</label_1.Label>
                      </div>); })}
                  </div>
                </div>

                <button_1.Button onClick={handleAddMember} className="w-full" variant="outline"><lucide_react_1.Plus className="w-4 h-4 mr-2"/> Add Member</button_1.Button>
              </div>

              {members.length > 0 && (<div className="space-y-2">
                  {members.map(function (m, i) { return (<div key={i} className="flex items-center justify-between p-2 border rounded bg-white">
                      <div className="text-sm">
                        <span className="font-medium">{m.name}</span> <span className="text-gray-500">({m.age}y)</span>
                        <div className="text-xs text-gray-400">
                          {m.dietaryPreference} {m.healthConditions.length > 0 && "\u2022 ".concat(m.healthConditions.join(', '))}
                        </div>
                      </div>
                      <button_1.Button variant="ghost" size="sm" onClick={function () { return setMembers(members.filter(function (_, idx) { return idx !== i; })); }}>
                        <lucide_react_1.Trash2 className="w-4 h-4 text-red-500"/>
                      </button_1.Button>
                    </div>); })}
                </div>)}

              <div className="flex gap-2 pt-4">
                <button_1.Button variant="outline" className="flex-1" onClick={function () { return setStep(2); }}>Back</button_1.Button>
                <button_1.Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>Generate Plan</button_1.Button>
              </div>
            </div>)}
        </card_1.CardContent>
      </card_1.Card>
    </div>);
}
