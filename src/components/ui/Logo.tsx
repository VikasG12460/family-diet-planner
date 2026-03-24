import { HeartPulse } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow">
        <HeartPulse className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <h1 className="text-sm font-bold text-emerald-700">Family Diet Planner</h1>
        <p className="text-xs text-gray-500">Healthy meals for everyone</p>
      </div>
    </div>
  );
}