import { useContext } from "react";
import { Backdrop } from "./components/Backdrop";
import { Buttons } from "./components/Buttons";
import { Container } from "./components/Container";
import { Game } from "./components/Game";
import { Header } from "./components/Header";
import { Icons } from "./components/Icons";
import { Records } from "./components/Records";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const { changingLevels, isRecord, isIntentionToRestart, isWinner } =
    useContext(GameContext);

  return (
    <>
      {isWinner && <Backdrop />}
      {changingLevels && isRecord && <Backdrop />}
      {isIntentionToRestart && isRecord && <Backdrop />}
      <Container>
        <Header />
        <Game />
        <Icons />
        <Buttons />
        <Records />
      </Container>
    </>
  );
}
