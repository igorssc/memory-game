import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-1 sm:px-2 md:px-5">{children}</div>
    </>
  );
};
