import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsHistory = new FetchUserCheckInsHistoryService(
    checkInsRepository,
  )

  return fetchUserCheckInsHistory
}
