import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IRepo } from "../@types/repo";
import { githubClient } from "../api"
const randomSince = Math.floor(Math.random() * 1000000);

type UseReposReturnType = [
  repositories: IRepo[],
  setRepositories: Dispatch<SetStateAction<IRepo[]>>,
  allRepos: IRepo[]
]

export const useRepos = (amount: number): UseReposReturnType => {
  const [allRepos, setAllRepos] = useState<IRepo[]>([])
  const [repositories, setRepositories] = useState<IRepo[]>([])

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
        setRepositories(response.data.items as IRepo[]);
      });
  }, [])

  return [repositories, setRepositories, allRepos]
}