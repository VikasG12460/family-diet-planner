
export const Select = ({ onValueChange, children, value }: any) => {
  return (
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500"
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children }: any) => <>{children}</>;
export const SelectValue = ({ placeholder }: any) => <option value="" disabled>{placeholder}</option>;
export const SelectContent = ({ children }: any) => <>{children}</>;
export const SelectItem = ({ value, children }: any) => <option value={value}>{children}</option>;