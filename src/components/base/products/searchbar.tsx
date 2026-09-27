import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { cn } from "@/utils/utils";

interface SearchBarProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  className,
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const [prevValue, setPrevValue] = useState(value);

  // Ajuste de estado durante el render (patrón oficial de React)
  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(value);
  }

  // Debounce: sigue siendo un efecto legítimo (sincroniza con el "exterior": el callback del padre)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <InputGroup className={cn("w-full max-w-md", className)}>
      <InputGroupAddon align="inline-start">
        <InputGroupText>
          <Search className="size-5" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
      />
      {localValue && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" onClick={handleClear}>
            <X />
            <span className="sr-only">Clear search</span>
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}