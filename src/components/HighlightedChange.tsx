import { useEffect, useState } from "react";

interface FieldProps {
  changed: boolean;
  children: React.ReactNode;
}

export default function HighlightedChange({ changed, children }: FieldProps) {
  const [isHighlighted, setIsHighlighted] = useState<boolean | null>(null);

  useEffect(() => {
    if (changed) {
      setIsHighlighted(changed);
      const timer = setTimeout(() => {
        setIsHighlighted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [changed]);

  return (
    <div
      style={
        isHighlighted
          ? {
              backgroundColor: "lightyellow",
            }
          : {}
      }
    >
      {children}
    </div>
  );
}
