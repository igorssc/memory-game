import clsx from "clsx";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import { Icon } from "./Icon";

export const Icons = () => {
  const { gameData, level, init, isPlaying, icons } = useContext(GameContext);

  try {
    return (
      <>
        <div
          className={clsx(
            "flex justify-center relative mx-auto max-w-7xl",
            icons < 20 && "max-w-5xl",
            icons < 17 && "max-w-4xl"
          )}
        >
          {!isPlaying && (
            <>
              <div className="w-full h-[calc(100%+6px)] -top-[3px] absolute bg-[rgba(36,36,36,0.04)] backdrop-blur-sm md:backdrop-blur-md z-10"></div>
              <div className="w-full h-full absolute top-0 left-0 z-20 flex justify-center items-center px-5">
                <Button
                  onClick={() => {
                    init();
                  }}
                >
                  Iniciar
                </Button>
              </div>
            </>
          )}
          <div
            className={clsx(
              "justify-center items-center gap-2 md:gap-4 flex flex-wrap"
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
