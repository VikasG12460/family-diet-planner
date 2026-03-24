import * as React from "react";

type RadioGroupContextType = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const RadioGroupContext = React.createContext<RadioGroupContextType>({});

function RadioGroup({
  value,
  onValueChange,
  children,
  className,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({
  value,
  id,
}: {
  value: string;
  id?: string;
}) {
  const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext);

  return (
    <input
      type="radio"
      id={id}
      name="radio-group"
      checked={selectedValue === value}
      onChange={() => onValueChange?.(value)}
      className="h-4 w-4 text-emerald-600 border-gray-300"
    />
  );
}

export { RadioGroup, RadioGroupItem };