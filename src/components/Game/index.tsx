import styles from "./game.module.css";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { IRepo } from "../../@types/repo";
import { RepoCard } from "../RepoCard";
import { FaCheckCircle, FaExchangeAlt, FaTimesCircle } from "react-icons/fa";

interface IGameProps {
  repoState: [IRepo[], Dispatch<SetStateAction<IRepo[]>>];
  originalList: IRepo[];
  setShowGame: Dispatch<SetStateAction<boolean>>
}

export const Game: FC<IGameProps> = ({repoState, originalList, setShowGame}) => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [repo1, setRepo1] = useState<IRepo | null>(null)
  const [repo2, setRepo2] = useState<IRepo | null>(null)

  useEffect(() => {
    setRepo1(originalList[0])
    setRepo2(originalList[1])
  }, [])

  const handleChoice = (r: IRepo) => {
    
  }

  return (
    <div className={styles.game}>
      {isGameOver ? (
        <div className={styles.score}></div>
      ) : (
        repo1 && repo2 && (
          <div className={styles.repos}>
            <h1 className={styles.title}>Choose the repo with most Stars!</h1>
            <div className={styles.container}>
              <RepoCard content={repo1} handler={handleChoice} />
              <div className={styles.dashboard}>
                <FaExchangeAlt className={styles['icon-versus']}/>
              </div>
              <RepoCard content={repo2} handler={handleChoice}/>
            </div>
          </div>
        )
      )}
      <div className={styles.buttons}>
        <button
          type='submit'
          className={`${styles.button}`}
          onClick={() => setShowGame(false)}
        >
          {isGameOver ? "Play Again" : "Back"}
        </button>
        {!isGameOver && (
          <button
            type='submit'
            className={styles.button}
            // TODO: change this button to refresh the current repositories
            onClick={() => console.log("hello")}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  )
};