import dotenv from 'dotenv'
import { type ConfigParams } from './config.types'

dotenv.config()

export function getConfig (): ConfigParams {
  return {
    service: {
      port: process.env.PORT ?? '3001',
      version: process.env.VERSION ?? '1'
    },
    githubApi: {
      baseUrl: process.env.GITHUB_API_BASE_URL ?? '',
      reposSegment: process.env.GITHUB_URL_SEGMENT_REPOS ?? '',
      commitSegment: process.env.GITHUB_URL_SEGMENT_COMMITS ?? '',
      version: process.env.GITHUB_API_VERSION ?? ''
    }
  }
}
