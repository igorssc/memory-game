import clsx from "clsx";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export const Progress = () => {
  const { progress } = useContext(GameContext);

  return (
    <>
      <div className="h-5 bg-zinc-500 mb-16 rounded-2xl relative overflow-hidden">
        <span
          className={clsx(
            "h-full bg-red-500 absolute top-0 left-0 transition-[width] duration-700",
            progress > 25 && "bg-orange-500",
            progress > 40 && "!bg-cyan-500"
          )}
          style={{ width: `${progress}%` }}
        ></span>
      </div>
    </>
  );
};
