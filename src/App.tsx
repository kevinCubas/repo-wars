import { useState } from "react";
import "./app.module.css";

function App() {
  const [showGame, setShowGame] = useState<boolean>(false);
  const [repos, setRepos] = useState([1])

  const handleStartGame = () => {
    setShowGame(true)
  };

  return (
    <main>
      {!showGame ? (
        <>
          <h1>Welcome to Repo-Wars</h1>
          <h2>A developer-driven guessing game</h2>
          {!repos.length ? (
            <span>Loading game...</span>
          ) : (
            <button
              type="button"
              onClick={handleStartGame}
            >
              Start
            </button>
          )}
        </>
      ) : (
        <h2>Jogo</h2>
      )} 
    </main>
  )
}

export default App
