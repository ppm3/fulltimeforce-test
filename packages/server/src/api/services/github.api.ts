import axios, { type AxiosResponse } from 'axios'
import { type GithubParams } from '../config/config.types'

export type GitCommitParams = {
  owner: string,
  repo: string,
  page: string,
  per_page: string
}

export const getGithubCommits = async (params: GitCommitParams, gitHub: GithubParams): Promise<AxiosResponse<unknown>> => {
  try {
    const { baseUrl, reposSegment, commitSegment } = gitHub
    const url: string = `${baseUrl}/${reposSegment}/${params.owner}/${params.repo}/${commitSegment}?page=${params.page}&per_page=${params.per_page}`

    const response: AxiosResponse = await axios.get(url, {
      headers: {
        'X-GitHub-Api-Version': `${gitHub.version}`,
      }
    })
    return response
  } catch (error) {
    const errorMessage: string = (error instanceof Error) ? error.message : String(error)
    throw new Error(errorMessage)
  }
}
