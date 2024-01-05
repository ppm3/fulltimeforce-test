import axios, { type AxiosRequestHeaders, type AxiosResponse } from 'axios'
import { getGithubCommits } from '../api/services/github.api'

jest.mock('axios')

describe('getGithubCommits', () => {
  const owner = 'testOwner'
  const repo = 'testRepo'
  const gitHub = {
    baseUrl: 'https://api.github.com',
    reposSegment: 'repos',
    commitSegment: 'commits'
  }

  it('should make a GET request to the correct URL', async () => {
    const expectedUrl = `${gitHub.baseUrl}/${gitHub.reposSegment}/${owner}/${repo}/${gitHub.commitSegment}`
    const headers: AxiosRequestHeaders = new axios.AxiosHeaders()

    const expectedResponse: AxiosResponse<unknown> = {
      data: { commits: [] },
      status: 200,
      statusText: 'OK',
      headers,
      config: {
        headers
      }
    }

    ;(axios.get as jest.Mock).mockResolvedValue(expectedResponse)

    const response = await getGithubCommits(owner, repo, gitHub)

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(axios.get).toHaveBeenCalledWith(expectedUrl)
    expect(response).toEqual(expectedResponse)
  })

  it('should throw an error if the request fails', async () => {
    const errorMessage = 'Request failed'
    const expectedError = new Error(errorMessage)

    ;(axios.get as jest.Mock).mockRejectedValue(expectedError)

    await expect(getGithubCommits(owner, repo, gitHub)).rejects.toThrow(expectedError)
  })

  it('should throw an error if the request fails if instance is not an Error object', async () => {
    const errorMessage = 'Request failed'
    const expectedError = new Error(errorMessage)

    ;(axios.get as jest.Mock).mockRejectedValue(errorMessage)

    await expect(getGithubCommits(owner, repo, gitHub)).rejects.toThrow(expectedError)
  })
})
