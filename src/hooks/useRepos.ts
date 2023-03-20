import { useEffect, useState } from "react"
import { githubClient } from "../api"
const randomSince = Math.floor(Math.random() * 1000000);

export const useRepos = (amount: number) => {
  const [allRepos, setAllRepos] = useState<any>([])
  const [repositories, setRepositories] = useState<any>([])

  useEffect(() => {
    githubClient
      .request("GET /search/repositories", {
        q: `is:public stars:>1000 fork:false`,
        sort: "stars",
        order: "desc",
        per_page: amount,
        since: randomSince,
        page: 1,
      })
      .then((response) => {
        setRepositories(response.data.items);
      });
  }, [])

  return [repositories, setRepositories, allRepos]
}