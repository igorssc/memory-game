import DialogMui from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dispatch, SetStateAction, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { Button } from "./Button";

interface DialogPropsRestart {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogRestart = ({ open, setOpen }: DialogPropsRestart) => {
  const { restart, checkRecord, setIsIntentionToRestart, level } =
    useContext(GameContext);

  const handleClose = () => setOpen(false);

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Reiniciar a partida irá zerar seus pontos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} scheme="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              const isRecord = checkRecord();
              isRecord && setIsIntentionToRestart(true);
              if (!isRecord) {
                restart();
                localStorage.setItem(
                  "p",
                  JSON.stringify({
                    l: level,
                    p: 0,
                  })
                );
              }
              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Reiniciar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

interface DialogPropsChangeLevel {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toLevel: 1 | 2 | 3;
}

const DialogChangeLevel = ({
  open,
  setOpen,
  toLevel,
}: DialogPropsChangeLevel) => {
  const {
    checkRecord,
    setChangingLevels,
    setLevel,
    restart,
    level,
    setPoints,
  } = useContext(GameContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DialogMui open={open} onClose={handleClose}>
        <DialogTitle>Tem certeza?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Alternar os modos irá zerar seus pontos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} scheme="secondary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              const isRecord = checkRecord();
              isRecord && setChangingLevels(toLevel);
              if (!isRecord) {
                setLevel(toLevel);
                setPoints(0);
                restart();

                localStorage.setItem(
                  "p",
                  JSON.stringify({
                    l: level === toLevel,
                    p: 0,
                  })
                );
              }
              handleClose();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </DialogMui>
    </>
  );
};

export const Dialog = {
  Restart: DialogRestart,
  ChangeLevel: DialogChangeLevel,
};
