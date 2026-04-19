import { apiRequest } from './client'

export async function getMyDashboard() {
  return apiRequest('/api/users/me/dashboard')
}
