import { useMutation, useQuery } from "@apollo/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useSound from "use-sound";
import clickSound from "../assets/audios/click.mp3";
import correctSound from "../assets/audios/correct.mp3";
import errorSound from "../assets/audios/error.mp3";
import gameOverSound from "../assets/audios/game-over.mp3";
import helpSound from "../assets/audios/help.mp3";
import winnerSound from "../assets/audios/winner.mp3";
import {
  CREATE_RECORD,
  registerRecordMutationResponse,
} from "../db/createRecord";
import { getRecordsQueryResponse, GET_RECORDS } from "../db/getRecords";
import {
  publishRecordMutationResponse,
  PUBLISH_RECORD,
} from "../db/publishRecord";
import { iconsData } from "../utils/icons";
import { shuffle } from "../utils/shuffle";

interface GameProviderProps {
  children: ReactNode;
}

type GameData = {
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
  gameData: string[];
  numErrors: number;
  level: 1 | 2 | 3;
  setLevel: Dispatch<SetStateAction<1 | 2 | 3>>;
  restart: (isTotal?: boolean) => void;
  help: () => void;
  isRecord: boolean;
  records: undefined | getRecordsQueryResponse["records"];
  registerRecord: (name: string) => void;
  checkRecord: () => boolean;
  checkWinner: () => void;
  changingLevels: false | 1 | 2 | 3;
  setChangingLevels: Dispatch<SetStateAction<false | 1 | 2 | 3>>;
  isIntentionToRestart: boolean;
  setIsIntentionToRestart: Dispatch<SetStateAction<boolean>>;
  isShowAllIcons: boolean;
  selectedIcons: number[];
  setSelectedIcons: Dispatch<SetStateAction<number[]>>;
  correctIcons: number[];
  usedTips: number;
  isWinner: boolean;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  isSound: boolean;
  setIsSound: Dispatch<SetStateAction<boolean>>;
  progress: number;
  init: () => void;
  icons: number;
  setCountWins: Dispatch<SetStateAction<number>>;
};

export const GameContext = createContext({} as GameData);

export function GameProvider({ children }: GameProviderProps) {
  const [isShowAllIcons, setIsShowAllIcons] = useState(false);
  const [isSound, setIsSound] = useState(true);
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);
  const [correctIcons, setCorrectIcons] = useState<number[]>([]);
  const [usedTips, setUsedTips] = useState(0);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(100);
  const [gameData, setGameData] = useState<string[]>([]);
  const [numErrors, setNumErrors] = useState(0);
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isRecord, setIsRecord] = useState(false);
  const [records, setRecords] = useState<
    undefined | getRecordsQueryResponse["records"]
  >(undefined);
  const [changingLevels, setChangingLevels] = useState<false | 1 | 2 | 3>(
    false
  );
  const [icons, setIcons] = useState(0);
  const [countWins, setCountWins] = useState(0);

  const [playSoundError] = useSound(errorSound);
  const [playSoundClick] = useSound(clickSound);
  const [playSoundWinner] = useSound(winnerSound);
  const [playSoundCorrect] = useSound(correctSound);
  const [playSoundHelp] = useSound(helpSound);
  const [playSoundGameOver] = useSound(gameOverSound);

  const [isIntentionToRestart, setIsIntentionToRestart] = useState(false);

  const [registerRecordMutateFunction] =
    useMutation<registerRecordMutationResponse>(CREATE_RECORD);

  const [publishRecordMutateFunction] =
    useMutation<publishRecordMutationResponse>(PUBLISH_RECORD);

  const { data: dataGetRecords, refetch: refetchGetRecords } =
    useQuery<getRecordsQueryResponse>(GET_RECORDS, {
      variables: {
        level,
      },
    });

  useEffect(() => {
    try {
      const data = localStorage.getItem("p");
      if (data) {
        const pointsSave = JSON.parse(data);

        if (+pointsSave.p > 0 && +pointsSave.w > 0) {
          if (
            +pointsSave.l === 1 ||
            +pointsSave.l === 2 ||
            +pointsSave.l === 3
          ) {
            setLevel(+pointsSave.l as 1 | 2);
            setPoints(+pointsSave.p);
            setCountWins(+pointsSave.w);
          }
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const data = localStorage.getItem("s");

      if (data) {
        setIsSound(data === "false" ? false : true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    refetchGetRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchGetRecords();
    selectRandomIcons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    setRecords(dataGetRecords?.records);
  }, [dataGetRecords]);

  const selectRandomIcons = () => {
    const availableThemes = Object.keys(iconsData);

    const themeSelected = availableThemes[
      Math.floor(Math.random() * availableThemes.length)
    ] as keyof typeof iconsData;

    const avaiableSchemas = Object.keys(iconsData[themeSelected]);

    const schemaSelected =
      avaiableSchemas[Math.floor(Math.random() * avaiableSchemas.length)];

    let iconsPerLevel = {
      1: 12,
      2: 18,
      3: 24,
    };

    let quantityOfIcons =
      countWins > 4 && countWins < 9
        ? iconsPerLevel[level] + 4
        : iconsPerLevel[level];

    quantityOfIcons = countWins > 9 ? quantityOfIcons + 4 : quantityOfIcons;

    setIcons(quantityOfIcons);

    const avaiableIcons = iconsData[themeSelected][+schemaSelected];

    let iconsSelected = [] as string[];

    while (iconsSelected.length < quantityOfIcons / 2) {
      const temporarilySelectedIcon =
        avaiableIcons[Math.floor(Math.random() * avaiableIcons.length)];

      if (
        !iconsSelected.includes(temporarilySelectedIcon) ||
        avaiableIcons.length < quantityOfIcons / 2
      ) {
        iconsSelected.push(temporarilySelectedIcon);
      }
    }

    iconsSelected = [...iconsSelected, ...iconsSelected];

    iconsSelected = shuffle(iconsSelected);

    setGameData(iconsSelected);
  };

  useEffect(() => {
    selectRandomIcons();
  }, []);

  const init = () => {
    setIsPlaying(true);

    if (gameData.length > 0) {
      setTimeout(() => {
        setIsShowAllIcons(true);

        setTimeout(() => {
          setIsShowAllIcons(false);
        }, 5000);
      }, 600);
    }
  };

  useEffect(() => {
    if (selectedIcons.length > 1) {
      if (gameData[selectedIcons[0]] === gameData[selectedIcons[1]]) {
        setTimeout(() => {
          isSound && playSoundCorrect();
          setPoints((prev) => prev + 5);
          setCorrectIcons((prev) => [
            ...prev,
            selectedIcons[0],
            selectedIcons[1],
          ]);
          setSelectedIcons([]);
          setProgress((prev) => (prev + 2 > 100 ? 100 : prev + 2));
        }, 200);
      } else {
        isSound && playSoundError();
        setNumErrors((prev) => prev + 1);
        setProgress((prev) => (prev - 5 < 0 ? 0 : prev - 5));
        setTimeout(() => {
          setSelectedIcons([]);
        }, 800);
      }
    } else {
      isSound && playSoundClick();
    }
  }, [selectedIcons]);

  useEffect(() => {
    checkWinner();
  }, [correctIcons]);

  const checkWinner = () => {
    if (gameData.length > 0 && correctIcons.length === gameData.length) {
      let bonusPoints = 50;

      bonusPoints =
        countWins > 4 && countWins < 9 ? bonusPoints + 20 : bonusPoints;

      bonusPoints = countWins > 9 ? bonusPoints + 30 : bonusPoints;

      bonusPoints = bonusPoints - numErrors * 2 - usedTips * 5;

      bonusPoints < 10 && (bonusPoints = 10);

      setPoints((prev) => prev + bonusPoints);

      setIsWinner(true);

      isSound && playSoundWinner();

      setCountWins((prev) => prev + 1);

      localStorage.setItem(
        "p",
        JSON.stringify({ l: level, p: points + bonusPoints, w: countWins + 1 })
      );
    }
  };

  useEffect(() => {
    if (progress < 1) {
      localStorage.setItem(
        "p",
        JSON.stringify({
          l: level,
          p: 0,
          w: 0,
        })
      );
      checkRecord();
      isSound && playSoundGameOver();
    }
  }, [progress]);

  const checkRecord = () => {
    let isRecord = false;

    if (records && records.length < 10 && points > 0) {
      isRecord = true;
    }

    if (!isRecord) {
      records?.forEach((record) => {
        record.score < points && (isRecord = true);
      });
    }

    setIsRecord(isRecord);

    return isRecord;
  };

  const registerRecord = async (name: string) => {
    try {
      await registerRecordMutateFunction({
        variables: { name, score: points, level },
      }).then(async ({ data }) => {
        await publishRecordMutateFunction({
          variables: {
            id: (data as registerRecordMutationResponse).createRecord.id,
          },
        }).then(() => {
          refetchGetRecords();
        });
      });
    } catch {}
  };

  const help = () => {
    setIsShowAllIcons(true);

    setTimeout(() => {
      setIsShowAllIcons(false);
      setSelectedIcons([]);
    }, 3000);

    setUsedTips((prev) => prev + 1);

    setProgress((prev) => (prev - 10 < 0 ? 0 : prev - 10));

    isSound && playSoundHelp();
  };

  const restart = (isTotal = false) => {
    if (isTotal) {
      setCountWins(0);
      setPoints(0);
    } else {
      selectRandomIcons();
    }

    setIsShowAllIcons(false);
    setCorrectIcons([]);
    setSelectedIcons([]);
    setIsIntentionToRestart(false);
    setNumErrors(0);
    setIsPlaying(false);
    setIsWinner(false);
    setProgress(100);
  };

  useEffect(() => {
    selectRandomIcons();
  }, [countWins]);

  return (
    <GameContext.Provider
      value={{
        points,
        setPoints,
        gameData,
        numErrors,
        level,
        setLevel,
        restart,
        help,
        isRecord,
        records,
        registerRecord,
        checkRecord,
        changingLevels,
        setChangingLevels,
        isIntentionToRestart,
        setIsIntentionToRestart,
        isShowAllIcons,
        selectedIcons,
        setSelectedIcons,
        correctIcons,
        usedTips,
        isWinner,
        isPlaying,
        setIsPlaying,
        checkWinner,
        isSound,
        setIsSound,
        progress,
        init,
        icons,
        setCountWins,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
