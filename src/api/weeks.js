import { apiRequest } from './client'

export async function getCurrentWeek() {
  return apiRequest('/api/admin/weeks/current')
}
