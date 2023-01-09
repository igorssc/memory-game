import useEvent from "@react-hook/event";
import { useSnackbar } from "notistack";
import { ChangeEvent, useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import { Fireworks } from "./Fireworks";

export const Backdrop = () => {
  const {
    restart,
    isRecord,
    changingLevels,
    isIntentionToRestart,
    isWinner,
    progress,
    setCountWins,
    setPoints,
  } = useContext(GameContext);

  useEvent(
    document.querySelector("body"),
    "keydown",
    (event) => (event.key === "Escape" || event.key === "Enter") && restart()
  );

  return (
    <>
      <div className="fixed flex flex-col place-items-center justify-center top-0 left-0 z-50 w-full h-full before:content-[''] before:w-full before:h-full before:bg-black before:absolute before:opacity-90 before:-z-10">
        {isWinner && (
          <div className="flex flex-col place-items-center justify-center w-[calc(100%-30px)] md:w-full mx-auto">
            <h1 className="font-low-budget text-cyan-500 text-center text-6xl md:text-8xl">
              Vitória
            </h1>
            <h2 className="text-center my-16 text-xl leading-8 whitespace-normal break-words md:text-2xl md:leading-10">
              Você concluiu o desafio, parabéns!
            </h2>
            <Button onClick={() => restart()}>Continuar</Button>
            <Fireworks />
          </div>
        )}
        {progress < 1 && (
          <div className="flex flex-col place-items-center justify-center w-[calc(100%-30px)] md:w-full mx-auto">
            <h1 className="font-low-budget text-cyan-500 text-center text-6xl md:text-8xl">
              Você perdeu
            </h1>
            <h2 className="text-center my-16 text-xl leading-8 whitespace-normal break-words md:text-2xl md:leading-10">
              Você não concluiu o desafio :&#40;
            </h2>
            {!isRecord && (
              <Button
                onClick={() => {
                  restart(true);
                }}
              >
                Jogar novamente
              </Button>
            )}
            {isRecord && <RecordComponent />}
          </div>
        )}
        {(changingLevels || isIntentionToRestart) && isRecord && (
          <div className="flex flex-col place-items-center justify-center w-[calc(100%-30px)] md:w-full mx-auto">
            <RecordComponent />
          </div>
        )}
      </div>
    </>
  );
};

const RecordComponent = () => {
  const {
    points,
    registerRecord,
    changingLevels,
    setChangingLevels,
    setLevel,
    restart,
    setPoints,
    progress,
    setCountWins,
  } = useContext(GameContext);

  const [isButtonActive, setIsButtonActive] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const CurrentName = event.target.value;

    if (CurrentName.length > 15) return;

    setName(CurrentName);
  };

  const handleNewRecord = () => {
    if (!name || name.trim().length < 3) {
      enqueueSnackbar("Por favor, preencha seu nome", { variant: "warning" });
      return;
    }

    setIsButtonActive(false);

    if (changingLevels) {
      setLevel(changingLevels);
      setChangingLevels(false);
    }

    localStorage.setItem(
      "p",
      JSON.stringify({ l: changingLevels, p: 0, w: 0 })
    );
    restart(true);

    registerRecord(
      name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()
    );
  };

  return (
    <>
      <div className="w-full text-center block">
        {progress < 1 ? (
          <h1 className="text-cyan-500 text-2xl sm:text-3xl leading-8 whitespace-normal break-words md:text-xl font-bold uppercase md:leading-normal">
            ...mas entrou pros recordes
          </h1>
        ) : (
          <h1 className="text-cyan-500 text-2xl sm:text-3xl leading-8 whitespace-normal break-words md:text-5xl font-bold uppercase md:leading-normal">
            Você entrou pros recordes
          </h1>
        )}
        <h4 className="whitespace-normal break-word text-base sm:text-xl my-16 md:text-2xl">
          Sua pontuação: {points}
        </h4>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={handleName}
          className="w-[calc(100%-10px)] md:max-w-md h-10 py-1 px-3 mb-16 border-none text-base rounded text-zinc-900"
        />

        <Button onClick={handleNewRecord} disabled={!isButtonActive}>
          Continuar
        </Button>
      </div>
    </>
  );
};
