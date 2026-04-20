import { apiRequest } from './client'

export async function getCurrentWeek() {
  return apiRequest('/api/admin/weeks/current')
}

export async function activateWeek(weekNumber) {
  return apiRequest(`/api/admin/weeks/${weekNumber}/activate`, { method: 'PATCH' })
}

export async function deactivateWeek() {
  return apiRequest('/api/admin/weeks/deactivate', { method: 'PATCH' })
}
