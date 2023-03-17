import { Octokit } from "@octokit/core";

const token = import.meta.env.GITHUB_TOKEN

export const octokit: Octokit = new Octokit({
  auth: token
})