import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'

export async function history(app: FastifyInstance) {
  app.get('/check-ins/history', async (request, reply) => {
    const checkInsHistoryQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInsHistoryQuerySchema.parse(request.query)

    const fetchUserCheckInsHistoryService =
      makeFetchUserCheckInsHistoryService()

    const { checkIns } = await fetchUserCheckInsHistoryService.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({
      checkIns,
    })
  })
}
