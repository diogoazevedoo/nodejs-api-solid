import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.register(create)
  app.register(search)
  app.register(nearby)
}
