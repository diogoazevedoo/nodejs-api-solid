import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  app.register(register)
  app.register(authenticate)

  /** Authenticated */
  app.register(profile)
}
