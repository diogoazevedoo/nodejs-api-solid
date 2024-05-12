import { verifyJWT } from '@/http/middlewares/verify-jwt'
import type { FastifyInstance } from 'fastify'
import { create } from './create'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.register(create)
}
