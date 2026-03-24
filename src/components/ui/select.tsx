import * as React from "react";
import { cn } from "../../lib/utils";

type SelectContextType = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const SelectContext = React.createContext<SelectContextType>({});

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({ value, onValueChange, children }: SelectProps) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="w-full">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);
  return (
    <span className={cn(!value && "text-gray-400")}>
      {value || placeholder || "Select an option"}
    </span>
  );
}

function SelectContent({ children }: { children: React.ReactNode }) {
  const { value, onValueChange } = React.useContext(SelectContext);

  const items = React.Children.toArray(children).filter(Boolean) as React.ReactElement[];

  return (
    <select
      value={value || ""}
      onChange={(e) => onValueChange?.(e.target.value)}
      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      <option value="" disabled hidden>
        Select an option
      </option>
      {items.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { key: index })
          : null
      )}
    </select>
  );
}

function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return <option value={value}>{children}</option>;
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };