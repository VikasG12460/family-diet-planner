"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logo = Logo;
function Logo(_a) {
    var _b = _a.className, className = _b === void 0 ? "" : _b;
    return (<div className={"flex items-center gap-2 ".concat(className)}>
      <div className="relative w-10 h-10 flex items-center justify-center bg-emerald-500 rounded-full shadow-lg">
        {/* Leaf */}
        <svg className="absolute top-1 right-1 w-5 h-5 text-white transform rotate-45" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
        </svg>
        {/* Fork */}
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M8 3v18"/>
          <path d="M12 3v18"/>
          <path d="M16 3v18"/>
          <path d="M8 8h8"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-emerald-600 leading-none">FamilyDiet</span>
        <span className="text-xs text-gray-500 font-medium tracking-wide">PLANNER</span>
      </div>
    </div>);
}
