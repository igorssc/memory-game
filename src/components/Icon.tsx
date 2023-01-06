import clsx from "clsx";
import { HTMLAttributes, useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  isActive?: boolean;
  icon: string;
  index: number;
}

export const Icon = ({
  isActive = false,
  icon,
  index,
  ...props
}: IconProps) => {
  const { isShowAllIcons, selectedIcons, setSelectedIcons, correctIcons } =
    useContext(GameContext);

  const handleOpenCard = () => {
    if (selectedIcons.length < 2) {
      setSelectedIcons((prev) => [...prev, index]);
    }
  };

  return (
    <>
      <span
        className={clsx(
          "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded flex items-center justify-center cursor-pointer hover:scale-110 relative perspective-10"
        )}
        {...props}
      >
        <div
          className={clsx(
            "w-full h-full backface-hidden absolute top-0 left-0 bg-slate-600 duration-500 rounded-lg shadow-sm shadow-slate-600 transform-style-preserve3d",
            (isShowAllIcons ||
              selectedIcons.includes(index) ||
              correctIcons.includes(index)) &&
              "rotate-y-180"
          )}
          onClick={handleOpenCard}
        ></div>
        <div
          className={clsx(
            "w-full h-full backface-hidden flex items-center justify-center absolute top-0 left-0 bg-slate-400 shadow-slate-600 duration-500 rounded-lg shadow-lg transform-style-preserve3d",
            isShowAllIcons ||
              selectedIcons.includes(index) ||
              correctIcons.includes(index)
              ? ""
              : "-rotate-y-180",
            correctIcons.includes(index) && "bg-green-500 shadow-green-600"
          )}
        >
          <img src={icon} alt="" />
        </div>
      </span>
    </>
  );
};
