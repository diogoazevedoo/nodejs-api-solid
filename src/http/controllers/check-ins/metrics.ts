import type { FastifyInstance } from 'fastify'
import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'

export async function metrics(app: FastifyInstance) {
  app.get('/check-ins/metrics', async (request, reply) => {
    const getUserMetricsService = makeGetUserMetricsService()

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      checkInsCount,
    })
  })
}
