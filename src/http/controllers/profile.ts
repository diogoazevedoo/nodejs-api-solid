import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'
import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function profile(app: FastifyInstance) {
  app.get('/me', { onRequest: [verifyJWT] }, async (request, reply) => {
    const getUserProfile = makeGetUserProfileService()

    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      user: {
        ...user,
        passwordHash: undefined,
      },
    })
  })
}
