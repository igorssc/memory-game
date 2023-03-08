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
          "w-12 h-12 xs2:w-16 xs2:h-16 xs1:w-20 xs1:h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded flex items-center justify-center cursor-pointer hover:scale-110 relative perspective-10"
        )}
        {...props}
      >
        <div
          className={clsx(
            "w-full h-full backface-hidden absolute top-0 left-0 bg-zinc-600 duration-500 rounded-lg transform-style-preserve3d",
            (isShowAllIcons ||
              selectedIcons.includes(index) ||
              correctIcons.includes(index)) &&
              "rotate-y-180"
          )}
          onClick={handleOpenCard}
        ></div>
        <div
          className={clsx(
            "w-full h-full backface-hidden flex items-center justify-center absolute top-0 left-0 bg-cyan-100 duration-500 rounded-lg transform-style-preserve3d",
            isShowAllIcons ||
              selectedIcons.includes(index) ||
              correctIcons.includes(index)
              ? ""
              : "-rotate-y-180",
            correctIcons.includes(index) && "!bg-green-300"
          )}
        >
          <img src={icon} alt="" />
        </div>
      </span>
    </>
  );
};
