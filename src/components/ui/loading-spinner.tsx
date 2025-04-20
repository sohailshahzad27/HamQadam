// src/components/ui/loading-spinner.tsx
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  fullPage?: boolean;
  className?: string;
}

export function LoadingSpinner({ 
  fullPage = false, 
  className = "" 
}: LoadingSpinnerProps) {
  return (
    <div className={cn(
      "flex items-center justify-center",
      fullPage ? "h-screen w-screen" : "h-full w-full",
      className
    )}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
    </div>
  );
}