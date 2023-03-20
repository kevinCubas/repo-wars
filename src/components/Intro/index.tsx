import styles from "./intro.module.css"
import { FC } from "react";
import { IRepo } from "../../@types/repo"

interface IIntroProps {
  repos: IRepo[];
  handleStartGame: () => void
}

export const Intro: FC<IIntroProps> = ({ repos, handleStartGame }) => {
  return (
    <>
      <h1 className={styles.title}>Repo Wars</h1>
      <h2 className={`${styles.headline} gradient text`}>A developer-driven guessing game</h2>
      {!repos.length ? (
        <span className={styles.loading}>Loading game...</span>
      ) : (
        <button
          type="button"
          className={styles.button}
          onClick={handleStartGame}
        >
          Start
        </button>
      )}
    </>
  )
};