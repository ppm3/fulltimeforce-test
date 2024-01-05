import { HttpStatusCode } from 'axios'
import { getConfig } from '../../api/config/config'
import { type Request, type Response } from 'express'
import { GitCommitParams, getGithubCommits } from '../../api/services/github.api'

export async function commitHandler (req: Request, res: Response): Promise<void> {
  try {
    const { owner, repo } = req.params
    let { page, per_page } = req.query

    if (!page) {
      page = '1'
    }
    if (!per_page) {
      per_page = '30'
    }

    const gitHub = getConfig().githubApi

    const params: GitCommitParams = {
      owner,
      repo,
      page: page.toString(),
      per_page: per_page.toString()
    }
    

    const response = await getGithubCommits(params, gitHub)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const commits = (response.data as unknown[]).map((commit: any) => ({
      commit: commit.commit,
      url: commit.url
    }))
    res.status(HttpStatusCode.Ok).json(commits)
  } catch (error) {
    const errorMessage: string = (error instanceof Error) ? error.message : String(error)
    res.status(HttpStatusCode.InternalServerError).json(errorMessage)
  }
}
