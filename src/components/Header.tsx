import { SpeakerHigh, SpeakerSlash } from "phosphor-react";
import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export const Header = () => {
  const { points, isSound, setIsSound } = useContext(GameContext);

  return (
    <>
      <h1 className="font-low-budget text-3xl leading-[60px] text-center mt-5 sm:text-4xl md:text-7xl md:mt-14">
        Jogo <span className="text-cyan-500">da</span> Memoria
      </h1>
      <div className="my-8 flex justify-between items-center text-xs md:text-base">
        <p>Sua pontuação: {points.toLocaleString("pt-BR")}</p>
        {isSound && (
          <SpeakerHigh
            color="#ffffff"
            size={25}
            weight="bold"
            className="cursor-pointer"
            onClick={() => {
              setIsSound(false);
              localStorage.setItem("s", String(false));
            }}
          />
        )}
        {!isSound && (
          <SpeakerSlash
            color="#b40404"
            size={25}
            weight="bold"
            className="cursor-pointer"
            onClick={() => {
              setIsSound(true);
              localStorage.setItem("s", String(true));
            }}
          />
        )}
      </div>
    </>
  );
};
