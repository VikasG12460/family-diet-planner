"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
var React = require("react");
exports.Checkbox = React.forwardRef(function (_a, ref) {
    var checked = _a.checked, onCheckedChange = _a.onCheckedChange, props = __rest(_a, ["checked", "onCheckedChange"]);
    return (<input ref={ref} type="checkbox" checked={checked} onChange={function (e) { return onCheckedChange === null || onCheckedChange === void 0 ? void 0 : onCheckedChange(e.target.checked); }} {...props}/>);
});
exports.Checkbox.displayName = "Checkbox";
