import * as React from "react";

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function Checkbox({ id, checked = false, onCheckedChange }: CheckboxProps) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-emerald-600"
    />
  );
}

export { Checkbox };