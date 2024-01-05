export interface GithubParams {
  baseUrl: string
  reposSegment: string
  commitSegment: string
}

export interface ServiceParams {
  port: string
  version: string
}

export interface ConfigParams {
  service: ServiceParams
  githubApi: GithubParams
}
