import { useSnackbar } from "notistack";
import { useContext, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";
import { Dialog } from "./Dialog";

export const Buttons = () => {
  const { help, level, points } = useContext(GameContext);

  const [isOpenDialogRestart, setIsOpenDialogRestart] = useState(false);
  const [isOpenDialogSkipWord, setIsOpenDialogSkipWord] = useState(false);
  const [isOpenDialogChangeLevel, setIsOpenDialogChangeLevel] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const [toLevel, setToLevel] = useState<1 | 2 | 3>(1);

  const handleLevel = (toLevel: 1 | 2 | 3) => {
    setToLevel(toLevel);
    setIsOpenDialogChangeLevel(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 my-16 md:grid-cols-5 md:gap-7">
        <Button
          onClick={() => {
            setIsOpenDialogRestart(true);
          }}
          isSmall
          scheme="primary"
          className="restart col-span-2 md:col-auto"
        >
          Reiniciar
        </Button>
        <Button
          onClick={() => {
            help();
          }}
          isSmall
          scheme="primary"
          className="help"
        >
          Ajuda 😍
        </Button>
        <Button
          onClick={() => level !== 1 && handleLevel(1)}
          isSmall
          scheme={level === 1 ? "primary" : "secondary"}
        >
          Fácil
        </Button>
        <Button
          onClick={() => level !== 2 && handleLevel(2)}
          isSmall
          scheme={level === 2 ? "primary" : "secondary"}
        >
          Médio
        </Button>
        <Button
          onClick={() => level !== 3 && handleLevel(3)}
          isSmall
          scheme={level === 3 ? "primary" : "secondary"}
        >
          Difícil
        </Button>
      </div>
      <Dialog.ChangeLevel
        open={isOpenDialogChangeLevel}
        setOpen={setIsOpenDialogChangeLevel}
        toLevel={toLevel}
      />
      <Dialog.Restart
        open={isOpenDialogRestart}
        setOpen={setIsOpenDialogRestart}
      />
    </>
  );
};
