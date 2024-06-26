import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearby(app: FastifyInstance) {
  app.get('/gyms/nearby', async (request, reply) => {
    const nearbyGymsQuerySchema = z.object({
      latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyGymsService = makeFetchNearbyGymsService()

    const { gyms } = await fetchNearbyGymsService.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(200).send({
      gyms,
    })
  })
}
