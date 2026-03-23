export const Avatar = ({ children, className = "" }: any) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 ${className}`}>{children}</div>
);
export const AvatarFallback = ({ children, className = "" }: any) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-medium ${className}`}>{children}</div>
);