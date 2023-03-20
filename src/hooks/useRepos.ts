import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IRepo } from "../@types/repo";
import { githubClient } from "../api"

const randomSince = Math.floor(Math.random() * 1000000);

const fetchRepos = async (
  amount: number,
  setters: Dispatch<SetStateAction<any[]>>[],
) => {
  const res = await githubClient.request("GET /search/repositories", {
    q: `is:public stars:>1000 fork:false`,
    sort: "stars",
    order: "desc",
    per_page: amount,
    since: randomSince,
    page: 1,
  })
  setters.forEach((setter) => setter(res.data.items))
}

type UseReposReturnType = [
  repositories: IRepo[],
  setRepositories: Dispatch<SetStateAction<IRepo[]>>,
  allRepos: IRepo[]
]

export const useRepos = (amount: number): UseReposReturnType => {
  const [allRepos, setAllRepos] = useState<IRepo[]>([])
  const [repositories, setRepositories] = useState<IRepo[]>([])

  useEffect(() => {
    fetchRepos(amount, [setAllRepos, setRepositories])
  }, [])

  return [repositories, setRepositories, allRepos]
}