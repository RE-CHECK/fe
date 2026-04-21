import { apiRequest } from './client'

const BASE_URL = 'https://api.reajoucheck.site'

export async function getUserStats() {
  return apiRequest('/api/admin/users/stats')
}

async function downloadCsv(path, filename) {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: 'include',
  })
  if (!res.ok) throw new Error('CSV 다운로드에 실패했습니다.')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadUsersCsv() {
  return downloadCsv('/api/admin/users/csv', 'users.csv')
}

export function downloadReceiptsCsv() {
  return downloadCsv('/api/admin/receipts/csv', 'receipts.csv')
}
