import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "basic";
}

const Button = ({ variant, className, children, ...props }: Props) => {
  return (
    <button
      className={`${variant === "primary" && "bg-[#27374D] text-white"} ${
        variant === "basic" && "bg-[#f7f7f7]"
      } rounded-md px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
