import { HttpStatusCode } from 'axios'
import { getConfig } from '../../api/config/config'
import { type Request, type Response } from 'express'
import { getGithubCommits } from '../../api/services/github.api'

export async function commitHandler (req: Request, res: Response): Promise<void> {
  try {
    const { owner, repo } = req.params
    const gitHub = getConfig().githubApi
    const response = await getGithubCommits(owner, repo, gitHub)
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
