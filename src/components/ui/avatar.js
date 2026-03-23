"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarFallback = exports.Avatar = void 0;
var Avatar = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (<div className={"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 ".concat(className)}>{children}</div>);
};
exports.Avatar = Avatar;
var AvatarFallback = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (<div className={"flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-medium ".concat(className)}>{children}</div>);
};
exports.AvatarFallback = AvatarFallback;
