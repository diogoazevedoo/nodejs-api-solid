import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.register(register)
  app.register(authenticate)

  app.register(refresh)

  /** Authenticated */
  app.register(profile)
}
