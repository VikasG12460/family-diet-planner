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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = Signup;
var react_1 = require("react");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var card_1 = require("../ui/card");
var lucide_react_1 = require("lucide-react");
var storage_1 = require("../../utils/storage");
function Signup(_a) {
    var onSignup = _a.onSignup, onSwitchToLogin = _a.onSwitchToLogin;
    var _b = (0, react_1.useState)({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        var name = formData.name, email = formData.email, password = formData.password, confirmPassword = formData.confirmPassword;
        // 1. Basic Validation
        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }
        // 2. Password Length Validation
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }
        // 3. Password Match Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        // 4. Check if Email Already Exists
        var existingUser = storage_1.storage.getUserByEmail(email);
        if (existingUser) {
            setError('Email already in use. Please sign in or use a different email.');
            setLoading(false);
            return;
        }
        // 5. Create User
        var newUser = {
            id: "user-".concat(Date.now()),
            name: name,
            email: email,
            password: password // In a real app, never store plain text passwords!
        };
        // Save to the "database" (localStorage)
        storage_1.storage.saveUser(newUser);
        // Create session object (without password)
        var sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
        setTimeout(function () {
            setLoading(false);
            onSignup(sessionUser);
        }, 500); // Simulate network delay
    };
    return (<card_1.Card className="w-full max-w-md shadow-lg border-emerald-100">
      <card_1.CardHeader className="space-y-1 text-center">
        <card_1.CardTitle className="text-2xl font-bold text-emerald-700">Create Account</card_1.CardTitle>
        <card_1.CardDescription>Start planning your family's healthy diet today</card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message Display */}
          {error && (<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <span className="font-bold">!</span>
              <span>{error}</span>
            </div>)}

          <div className="space-y-2">
            <label_1.Label htmlFor="name">Full Name</label_1.Label>
            <div className="relative">
              <lucide_react_1.User className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
              <input_1.Input id="name" type="text" placeholder="John Doe" className="pl-10" value={formData.name} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }}/>
            </div>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="email">Email</label_1.Label>
            <div className="relative">
              <lucide_react_1.Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
              <input_1.Input id="email" type="email" placeholder="john@example.com" className="pl-10" value={formData.email} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { email: e.target.value })); }}/>
            </div>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="password">Password</label_1.Label>
            <div className="relative">
              <lucide_react_1.Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
              <input_1.Input id="password" type="password" placeholder="••••••••" className="pl-10" value={formData.password} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { password: e.target.value })); }}/>
            </div>
            <p className="text-xs text-gray-500">Must be at least 6 characters</p>
          </div>

          <div className="space-y-2">
            <label_1.Label htmlFor="confirmPassword">Confirm Password</label_1.Label>
            <div className="relative">
              <lucide_react_1.Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
              <input_1.Input id="confirmPassword" type="password" placeholder="••••••••" className="pl-10" value={formData.confirmPassword} onChange={function (e) { return setFormData(__assign(__assign({}, formData), { confirmPassword: e.target.value })); }}/>
            </div>
          </div>

          <button_1.Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
            {!loading && <lucide_react_1.ArrowRight className="ml-2 h-4 w-4"/>}
          </button_1.Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <button type="button" onClick={onSwitchToLogin} className="text-emerald-600 font-medium hover:underline">
              Sign in
            </button>
          </div>
        </form>
      </card_1.CardContent>
    </card_1.Card>);
}
