import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "primary" | "secondary" | "tertiary";
  isSmall?: boolean;
  isDisabled?: boolean;
  className?: string;
}

export const Button = ({
  scheme = "primary",
  isSmall = false,
  isDisabled = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        {...props}
        className={clsx(
          "w-full py-4 rounded cursor-pointer text-lg flex items-center justify-center flex-nowrap m-auto border-none md:max-w-md",
          scheme === "primary" && "text-zinc-900 bg-cyan-500",
          scheme === "secondary" && "text-white bg-gray-500",
          isDisabled && "brightness-50 hover:brightness-50",
          !isDisabled && "hover:brightness-90",
          !isSmall && "md:py-6",
          className
        )}
      />
    </>
  );
};
