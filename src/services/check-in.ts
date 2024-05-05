import type { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInServiceRequest {
  userId: string
  gymId: string
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.create({
      userId,
      gymId,
    })

    return {
      checkIn,
    }
  }
}
