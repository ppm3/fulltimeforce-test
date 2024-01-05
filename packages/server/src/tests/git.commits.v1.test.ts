import { HttpStatusCode } from 'axios'
import { type Request, type Response } from 'express'
import { type GitCommitParams, getGithubCommits } from '../api/services/github.api'
import { commitHandler } from '../server/controllers/git.commits.v1'

jest.mock('../api/services/github.api')

describe('commitHandler', () => {
  const req: Request = {
    params: {
      owner: 'testOwner',
      repo: 'testRepo'
    },
    query: {
      page: '1',
      per_page: '10'
    }
  } as unknown as Request

  const res: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response

  const gitHub = {
    baseUrl: 'https://api.github.com',
    reposSegment: 'repos',
    commitSegment: 'commits',
    version: '2022-11-28'
  }

  const params: GitCommitParams = {
    owner: 'testOwner',
    repo: 'testRepo',
    page: '1',
    per_page: '10'
  }

  it('should call getGithubCommits and return the response data', async () => {
    const expectedResponse = {
      data: [ { commit: {}, url: '' } ]
    }

    ;(getGithubCommits as jest.Mock).mockResolvedValue(expectedResponse)

    await commitHandler(req, res)

    const { status: statusCode, json: jsonResponse } = res

    expect(getGithubCommits).toHaveBeenCalledWith(params, gitHub)
    expect(statusCode).toHaveBeenCalledWith(HttpStatusCode.Ok)
    expect(jsonResponse).toHaveBeenCalledWith(expectedResponse.data)
  })
  
  it('should handle errors and return the error message', async () => {
    const errorMessage = 'Request failed'
    const expectedError = new Error(errorMessage)

    ;(getGithubCommits as jest.Mock).mockRejectedValue(expectedError)

    await commitHandler(req, res)
    const { status: statusCode, json: jsonResponse } = res

    expect(getGithubCommits).toHaveBeenCalledWith(params, gitHub)
    expect(statusCode).toHaveBeenCalledWith(HttpStatusCode.InternalServerError)
    expect(jsonResponse).toHaveBeenCalledWith(errorMessage)
  })

  it('should throw an error if the request fails if instance is not an Error object', async () => {
    const errorMessage = 'Request failed'

    ;(getGithubCommits as jest.Mock).mockRejectedValue(errorMessage)

    await commitHandler(req, res)
    const { status: statusCode, json: jsonResponse } = res

    expect(getGithubCommits).toHaveBeenCalledWith(params, gitHub)
    expect(statusCode).toHaveBeenCalledWith(HttpStatusCode.InternalServerError)
    expect(jsonResponse).toHaveBeenCalledWith(errorMessage)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

})


describe('commitHandler witouth query_params', () => {
  const req: Request = {
    params: {
      owner: 'testOwner',
      repo: 'testRepo'
    },
    query: {},
  } as unknown as Request

  const res: Response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  } as unknown as Response

  const gitHub = {
    baseUrl: 'https://api.github.com',
    reposSegment: 'repos',
    commitSegment: 'commits',
    version: '2022-11-28'
  }

  const params: GitCommitParams = {
    owner: 'testOwner',
    repo: 'testRepo',
    page: '1',
    per_page: '30'
  }

  it('', async () => {
    const expectedResponse = {
      data: [ { commit: {}, url: '' } ]
    }

    ;(getGithubCommits as jest.Mock).mockResolvedValue(expectedResponse)

    await commitHandler(req, res)

    const { status: statusCode, json: jsonResponse } = res

    expect(getGithubCommits).toHaveBeenCalledWith(params, gitHub)
    expect(statusCode).toHaveBeenCalledWith(HttpStatusCode.Ok)
    expect(jsonResponse).toHaveBeenCalledWith(expectedResponse.data)
  })
  
})