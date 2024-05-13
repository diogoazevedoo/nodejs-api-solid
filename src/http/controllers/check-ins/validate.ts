import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function validate(app: FastifyInstance) {
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    async (request, reply) => {
      const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
      })

      const { checkInId } = validateCheckInParamsSchema.parse(request.params)

      const validateCheckInService = makeValidateCheckInService()

      await validateCheckInService.execute({
        checkInId,
      })

      return reply.status(204).send()
    },
  )
}
