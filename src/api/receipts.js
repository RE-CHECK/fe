import { apiRequest } from './client'

// OCR 분석만 수행 — S3 업로드/DB 저장 없음
export async function analyzeReceipt(imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)

  return apiRequest('/api/receipts/analyze', {
    method: 'POST',
    body: formData,
  })
}

export async function getTotalParticipation() {
  return apiRequest('/api/receipts/total-participation')
}

export async function getTotalAllPayment() {
  return apiRequest('/api/receipts/total-all-payment')
}

export async function getCollegeTotalPayment() {
  return apiRequest('/api/receipts/college-total-payment')
}

// 사용자 확인 후 최종 저장 — S3 업로드 + DB 저장
export async function confirmReceipt(imageFile, ocrData) {
  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append(
    'data',
    new Blob([JSON.stringify(ocrData)], { type: 'application/json' })
  )

  return apiRequest('/api/receipts/confirm', {
    method: 'POST',
    body: formData,
  })
}
