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

export const Game: FC<IGameProps> = ({ repoState, originalList, setShowGame }) => {
  const [repositories, setRepositories] = repoState;
  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [repo1, setRepo1] = useState<IRepo | null>(null)
  const [repo2, setRepo2] = useState<IRepo | null>(null)
  const [correct, setCorrect] = useState<number>(0)
  const [wrong, setWrong] = useState<number>(0)

  const randomSelect = (arr: IRepo[]) => {
    if (arr.length < 2) {
      setRepositories(originalList)
      setIsGameOver(true)
      return
    }

    const generateRandom = () => Math.floor(Math.random() * arr.length)
    const randomIndex1 = generateRandom()
    let randomIndex2 = generateRandom()
    while (randomIndex1 === randomIndex2) {
      randomIndex2 = generateRandom()
    }
    const randomRepo1 = arr[randomIndex1]
    const randomRepo2 = arr[randomIndex2]

    const updatedArray = arr.filter(repo => repo.id !== randomRepo1.id && repo.id !== randomRepo2.id)

    setRepo1(randomRepo1)
    setRepo2(randomRepo2)

    setRepositories(updatedArray)
  }

  useEffect(() => {
    randomSelect(repositories)
  }, [])

  const handleChoice = (r: IRepo) => {
    const chosenRepo = r.id === repo1?.id ? repo1 : repo2
    const winner = repo1?.stargazers_count! > repo2?.stargazers_count! ? repo1 : repo2

    if (chosenRepo?.id === winner?.id) {
      setCorrect((prev) => prev + 1)
    } else {
      setWrong((prev) => prev + 1)
    }
    randomSelect(repositories)
  }

  return (
    <div className={styles.game}>
      {isGameOver ? (
        <div className={styles.score}>
          <h1 className={styles.title}>
            {correct > wrong ? "CONGRATULATIONS! You nailed it!" : "You almost did it! Better luck next time..."}
          </h1>
          <div className={styles.container}>
            <p className={styles.text}>Final Score:</p>
            <div className={`${styles.result} ${styles.correct}`}>
              <p>{correct}</p>
              <FaCheckCircle />
            </div>
            <div className={`${styles.result} ${styles.wrong}`}>
              <p>{wrong}</p>
              <FaTimesCircle />
            </div>
          </div>
        </div>
      ) : (
        repo1 && repo2 && (
          <div className={styles.repos}>
            <h1 className={styles.title}>Choose the repo with most Stars!</h1>
            <div className={styles.container}>
              <RepoCard content={repo1} handler={handleChoice} />
              <div className={styles.dashboard}>
                <div className={`${styles.result} ${styles.correct}`}>
                  <p>{correct}</p>

                  <FaCheckCircle />
                </div>

                <FaExchangeAlt className={styles['icon-versus']} />

                <div className={`${styles.result} ${styles.wrong}`}>
                  <p>{wrong}</p>
                  <FaTimesCircle />
                </div>
              </div>
              <RepoCard content={repo2} handler={handleChoice} />
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
            onClick={() => randomSelect(repositories)}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  )
};