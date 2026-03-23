"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectItem = exports.SelectContent = exports.SelectValue = exports.SelectTrigger = exports.Select = void 0;
var Select = function (_a) {
    var onValueChange = _a.onValueChange, children = _a.children, value = _a.value;
    return (<select value={value} onChange={function (e) { return onValueChange(e.target.value); }} className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500">
      {children}
    </select>);
};
exports.Select = Select;
var SelectTrigger = function (_a) {
    var children = _a.children;
    return <>{children}</>;
};
exports.SelectTrigger = SelectTrigger;
var SelectValue = function (_a) {
    var placeholder = _a.placeholder;
    return <option value="" disabled>{placeholder}</option>;
};
exports.SelectValue = SelectValue;
var SelectContent = function (_a) {
    var children = _a.children;
    return <>{children}</>;
};
exports.SelectContent = SelectContent;
var SelectItem = function (_a) {
    var value = _a.value, children = _a.children;
    return <option value={value}>{children}</option>;
};
exports.SelectItem = SelectItem;
