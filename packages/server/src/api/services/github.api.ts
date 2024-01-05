import axios, { type AxiosResponse } from 'axios'
import { type GithubParams } from '../config/config.types'

export const getGithubCommits = async (owner: string, repo: string, gitHub: GithubParams): Promise<AxiosResponse<unknown>> => {
  try {
    const { baseUrl, reposSegment, commitSegment } = gitHub
    const url: string = `${baseUrl}/${reposSegment}/${owner}/${repo}/${commitSegment}`

    const response: AxiosResponse = await axios.get(url)
    return response
  } catch (error) {
    const errorMessage: string = (error instanceof Error) ? error.message : String(error)
    throw new Error(errorMessage)
  }
}
