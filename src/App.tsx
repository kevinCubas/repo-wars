import "./app.css";
import { useState } from "react";
import { useRepos } from "./hooks";
import { Game } from "./components/Game";
import { Intro } from "./components/Intro";

function App() {
  const [showGame, setShowGame] = useState<boolean>(false);
  const [ repos, setRepos, allRepos ] = useRepos(100)

  const handleStartGame = () => {
    setShowGame(true)
  };

  return (
    <main>
      {!showGame ? (
        <Intro repos={repos} handleStartGame={handleStartGame} />
      ) : (
        <Game 
          repoState={[repos, setRepos]}
          originalList={allRepos}
          setShowGame={setShowGame}
        />
      )
      }
    </main>
  )
}

export default App
