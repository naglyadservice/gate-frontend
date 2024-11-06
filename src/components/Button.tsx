import cn from "classnames";

interface IProps {
  type: "filled" | "outlined";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

function Button({ children, onClick, type, className }: IProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center content-center gap-1 px-3 py-2 rounded-md sm:text-lg font-semibold uppercase",
        (type === "outlined" ? "text-[#5977ff] border-2 border-[#5977ff] hover:bg-[#5977ff] hover:text-white" : ""),
        (type === "filled" ? "text-white bg-gradient-to-r from-[#58a0ff] to-[#5966ff] hover:bg-gradient-to-l" : ""),
        (className ? className : "")
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button