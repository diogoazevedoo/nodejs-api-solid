import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { makeCreateGymService } from '@/services/factories/make-create-gym-service'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function create(app: FastifyInstance) {
  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    async (request, reply) => {
      const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
      })

      const { title, description, phone, latitude, longitude } =
        createGymBodySchema.parse(request.body)

      const createGymService = makeCreateGymService()

      await createGymService.execute({
        title,
        description,
        phone,
        latitude,
        longitude,
      })

      return reply.status(201).send()
    },
  )
}
