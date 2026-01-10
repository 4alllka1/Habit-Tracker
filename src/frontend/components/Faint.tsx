import React, { Children } from "react";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Props extends React.HTMLAttributes<HTMLElement> {}

function Faint({ className, children, ...props }: Props) {
  return (
    <p
      className={cn("text-neutral-500 font-[400] text-xl max-w-2xl", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export default Faint;
