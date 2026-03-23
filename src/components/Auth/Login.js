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
exports.Login = Login;
var react_1 = require("react");
var button_1 = require("../ui/button");
var input_1 = require("../ui/input");
var label_1 = require("../ui/label");
var card_1 = require("../ui/card");
var lucide_react_1 = require("lucide-react");
var storage_1 = require("../../utils/storage");
function Login(_a) {
    var onLogin = _a.onLogin, onSwitchToSignup = _a.onSwitchToSignup;
    var _b = (0, react_1.useState)({
        email: '',
        password: ''
    }), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        var email = formData.email, password = formData.password;
        // 1. Basic Validation
        if (!email || !password) {
            setError('Please enter both email and password');
            setLoading(false);
            return;
        }
        // 2. Check if user exists
        var user = storage_1.storage.getUserByEmail(email);
        if (!user) {
            setError('No account found with this email address');
            setLoading(false);
            return;
        }
        // 3. Check password
        if (user.password !== password) {
            setError('Incorrect password');
            setLoading(false);
            return;
        }
        // 4. Successful Login
        var sessionUser = { id: user.id, name: user.name, email: user.email };
        setTimeout(function () {
            setLoading(false);
            onLogin(sessionUser);
        }, 500); // Simulate network delay
    };
    return (<card_1.Card className="w-full max-w-md shadow-lg border-emerald-100">
      <card_1.CardHeader className="space-y-1 text-center">
        <card_1.CardTitle className="text-2xl font-bold text-emerald-700">Welcome Back</card_1.CardTitle>
        <card_1.CardDescription>Sign in to access your family diet plan</card_1.CardDescription>
      </card_1.CardHeader>
      <card_1.CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Message Display */}
          {error && (<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
              <span className="font-bold">!</span>
              <span>{error}</span>
            </div>)}

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
          </div>

          <button_1.Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
            {!loading && <lucide_react_1.LogIn className="ml-2 h-4 w-4"/>}
          </button_1.Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <button type="button" onClick={onSwitchToSignup} className="text-emerald-600 font-medium hover:underline">
              Sign up
            </button>
          </div>
        </form>
      </card_1.CardContent>
    </card_1.Card>);
}
