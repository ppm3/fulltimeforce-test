import cors from 'cors'
import { HttpStatusCode } from 'axios'
import { getConfig } from './api/config/config'
import { RouterDefinition } from './server/router/router'
import type { ConfigParams, ServiceParams } from './api/config/config.types'
import express, { type Express, type Request, type Response, type NextFunction } from 'express'

const app: Express = express()

app.use(cors())

const configParams: ConfigParams = getConfig()
const serverParams: ServiceParams = configParams.service
const PORT: string | number = serverParams.port

app.use(RouterDefinition(serverParams))

// add 500 if error is thrown
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatusCode.InternalServerError).json({ error: 'Internal Server Error' })
  next(err)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
