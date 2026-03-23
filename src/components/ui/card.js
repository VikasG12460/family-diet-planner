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
exports.CardContent = exports.CardDescription = exports.CardTitle = exports.CardHeader = exports.Card = void 0;
var React = require("react");
var cn_1 = require("../../utils/cn");
var Card = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={(0, cn_1.cn)("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props}/>);
};
exports.Card = Card;
var CardHeader = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={(0, cn_1.cn)("flex flex-col space-y-1.5 p-6", className)} {...props}/>);
};
exports.CardHeader = CardHeader;
var CardTitle = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<h3 className={(0, cn_1.cn)("text-2xl font-semibold leading-none tracking-tight", className)} {...props}/>);
};
exports.CardTitle = CardTitle;
var CardDescription = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<p className={(0, cn_1.cn)("text-sm text-muted-foreground", className)} {...props}/>);
};
exports.CardDescription = CardDescription;
var CardContent = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (<div className={(0, cn_1.cn)("p-6 pt-0", className)} {...props}/>);
};
exports.CardContent = CardContent;
