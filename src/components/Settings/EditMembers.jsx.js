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
exports.EditMembers = EditMembers;
var react_1 = require("react");
var button_1 = require("../ui/button");
var card_1 = require("../ui/card");
var avatar_1 = require("../ui/avatar");
var lucide_react_1 = require("lucide-react");
var MemberForm_1 = require("./MemberForm");
function EditMembers(_a) {
    var profile = _a.profile, onSave = _a.onSave, onCancel = _a.onCancel;
    var _b = (0, react_1.useState)(profile.members), members = _b[0], setMembers = _b[1];
    var _c = (0, react_1.useState)(null), editingMember = _c[0], setEditingMember = _c[1];
    var _d = (0, react_1.useState)(false), isFormOpen = _d[0], setIsFormOpen = _d[1];
    var handleAddMember = function () {
        setEditingMember(null);
        setIsFormOpen(true);
    };
    var handleEditMember = function (member) {
        setEditingMember(member);
        setIsFormOpen(true);
    };
    var handleDeleteMember = function (memberId) {
        if (confirm('Are you sure you want to remove this member?')) {
            var updatedMembers = members.filter(function (m) { return m.id !== memberId; });
            setMembers(updatedMembers);
        }
    };
    var handleSaveMember = function (memberData) {
        if (editingMember) {
            // Update existing
            var updatedMembers = members.map(function (m) {
                return m.id === editingMember.id ? __assign(__assign({}, memberData), { id: editingMember.id }) : m;
            });
            setMembers(updatedMembers);
        }
        else {
            // Add new
            var newMember = __assign(__assign({}, memberData), { id: "member-".concat(Date.now()) });
            setMembers(__spreadArray(__spreadArray([], members, true), [newMember], false));
        }
        setIsFormOpen(false);
    };
    var handleSaveAll = function () {
        if (members.length === 0) {
            alert('You must have at least one family member.');
            return;
        }
        onSave(__assign(__assign({}, profile), { members: members }));
    };
    return (<div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button_1.Button variant="ghost" size="icon" onClick={onCancel}>
          <lucide_react_1.ArrowLeft className="w-5 h-5"/>
        </button_1.Button>
        <h1 className="text-2xl font-bold text-gray-800">Manage Family</h1>
      </div>

      <card_1.Card>
        <card_1.CardHeader>
          <card_1.CardTitle className="text-lg">Family Members ({members.length})</card_1.CardTitle>
        </card_1.CardHeader>
        <card_1.CardContent className="space-y-4">
          {members.map(function (member) {
            var initials = member.name.split(' ').map(function (n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
            return (<div key={member.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <avatar_1.Avatar className="h-10 w-10 bg-emerald-100 text-emerald-700">
                    <avatar_1.AvatarFallback className="font-semibold text-sm">{initials}</avatar_1.AvatarFallback>
                  </avatar_1.Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      {member.age} yrs • {member.weight}kg • {member.goal}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button_1.Button variant="ghost" size="icon" onClick={function () { return handleEditMember(member); }}>
                    <lucide_react_1.Pencil className="w-4 h-4 text-gray-600"/>
                  </button_1.Button>
                  <button_1.Button variant="ghost" size="icon" onClick={function () { return handleDeleteMember(member.id); }}>
                    <lucide_react_1.Trash2 className="w-4 h-4 text-red-500"/>
                  </button_1.Button>
                </div>
              </div>);
        })}
          
          <button_1.Button variant="outline" className="w-full border-dashed border-2 py-6 text-gray-500 hover:text-emerald-600 hover:border-emerald-400" onClick={handleAddMember}>
            <lucide_react_1.Plus className="w-5 h-5 mr-2"/>
            Add Family Member
          </button_1.Button>
        </card_1.CardContent>
      </card_1.Card>

      <div className="flex gap-3 pt-4">
        <button_1.Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</button_1.Button>
        <button_1.Button className="flex-1" onClick={handleSaveAll}>Save Changes</button_1.Button>
      </div>

      {/* Custom Modal for Member Form */}
      {isFormOpen && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button onClick={function () { return setIsFormOpen(false); }} className="text-gray-500 hover:text-gray-700">
                <lucide_react_1.X className="w-5 h-5"/>
              </button>
            </div>
            <div className="p-4">
              <MemberForm_1.MemberForm member={editingMember} onSave={handleSaveMember} onCancel={function () { return setIsFormOpen(false); }}/>
            </div>
          </div>
        </div>)}
    </div>);
}
