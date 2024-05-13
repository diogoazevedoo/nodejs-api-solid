import type { FastifyInstance } from 'fastify'

export async function refresh(app: FastifyInstance) {
  app.patch('/token/refresh', async (request, reply) => {
    await request.jwtVerify({ onlyCookie: true })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: request.user.sub,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send({
        token,
      })
  })
}
