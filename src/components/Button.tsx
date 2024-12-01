import cn from "classnames";
import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  myColorScheme: "filled" | "outlined";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

function Button({ children, myColorScheme, className, ...rest }: IProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md text-sm font-semibold uppercase",
        (myColorScheme === "outlined" ? "text-[#5977ff] border-2 border-[#5977ff] hover:bg-[#5977ff] hover:text-white" : ""),
        (myColorScheme === "filled" ? "text-white bg-gradient-to-r from-[#58a0ff] to-[#5966ff] hover:bg-gradient-to-l" : ""),
        (className ? className : "")
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button