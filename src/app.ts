import fastify from 'fastify'
import { register } from './http/controllers/register'
import { ZodError } from 'zod'
import { env } from './env'
import { authenticate } from './http/controllers/authenticate'
import fastifyJwt from '@fastify/jwt'
import { profile } from './http/controllers/profile'

export const app = fastify()

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Should log to an external tool like DataDog
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(register)
app.register(authenticate)
app.register(profile)
