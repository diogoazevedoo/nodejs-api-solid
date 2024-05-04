import fastify from 'fastify'
import { register } from './http/controllers/register'
import { ZodError } from 'zod'
import { env } from './env'

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

app.register(register)
