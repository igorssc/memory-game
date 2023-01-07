import { useContext } from "react";
import { Backdrop } from "./components/Backdrop";
import { Buttons } from "./components/Buttons";
import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Icons } from "./components/Icons";
import { Progress } from "./components/Progress";
import { Records } from "./components/Records";
import { GameContext } from "./contexts/GameContext";

export function App() {
  const { changingLevels, isRecord, isIntentionToRestart, isWinner, progress } =
    useContext(GameContext);

  return (
    <>
      {isWinner && <Backdrop />}
      {changingLevels && isRecord && <Backdrop />}
      {isIntentionToRestart && isRecord && <Backdrop />}
      {progress < 1 && <Backdrop />}
      <Container>
        <Header />
        <Progress />
        <Icons />
        <Buttons />
        <Records />
      </Container>
    </>
  );
}
