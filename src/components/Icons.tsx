import clsx from "clsx";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Icon } from "./Icon";

export const Icons = () => {
  const { gameData, level } = useContext(GameContext);

  try {
    return (
      <>
        <div className="flex justify-center">
          <div
            className={clsx(
              "gap-5 justify-center items-center md:gap-8 flex flex-wrap md:grid",
              level === 1 && "grid-cols-4",
              level === 2 && "grid-cols-4 md:grid-cols-6",
              level === 3 && "grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            )}
          >
            {gameData.map((icon, index) => (
              <Icon
                key={index}
                isActive={true}
                onClick={() => {}}
                icon={icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </>
    );
  } catch {
    return <></>;
  }
};
