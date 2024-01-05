import { HttpStatusCode } from 'axios'
import express, { type Router, type Response } from 'express'
import { type ServiceParams } from '@/api/config/config.types'
import { commitHandler } from '../controllers/git.commits.v1'
import asyncHandler from 'express-async-handler'

export const RouterDefinition = (config: ServiceParams): Router => {
  const router: Router = express.Router()
  router.get('/ping', (_, res: Response) => {
    res.send('PONG!')
  })

  router.get('/healthcheck', (_, res: Response) => {
    res.status(HttpStatusCode.Ok).json({ uptime: process.uptime() })
  })

  // v1
  router.get('/api/commits/:owner/:repo', asyncHandler(commitHandler))
  router.use(`/v${config.version}`, router)

  // Add 404 status if nothing matches with the definitions
  router.use((_, res: Response) => {
    res.status(HttpStatusCode.NotFound).json({ error: 'Not Found' })
  })

  return router
}
