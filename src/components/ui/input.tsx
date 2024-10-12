import * as React from "react"

import { cn } from "@/lib/utils"
import { ClassValue } from "clsx"
import clsx from "clsx"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  containerClassName?: ClassValue
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, containerClassName, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;
    return (
      <div className={clsx("w-auto relative", containerClassName)}>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            StartIcon && "pl-8",
            EndIcon && "pr-8"
          )}
          ref={ref}
          {...props}
        />
        {StartIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            {StartIcon}
          </div>
        )}
        {EndIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {EndIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
