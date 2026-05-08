import { apiRequest } from './client'

export async function sendPhoneCode(phoneNumber) {
  await apiRequest('/api/auth/phone/send-code', {
    skipAuth: true,
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  })
}

export async function verifyPhoneCode(phoneNumber, code) {
  return apiRequest('/api/auth/phone/verify-code', {
    skipAuth: true,
    method: 'POST',
    body: JSON.stringify({ phoneNumber, code }),
  })
}

export async function login(username, password) {
  const data = await apiRequest('/api/auth/login', {
    skipAuth: true,
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  localStorage.setItem('accessToken', data.accessToken)
  return data
}

export async function checkUsername(username) {
  await apiRequest(`/api/auth/check-username?username=${encodeURIComponent(username)}`, {
    skipAuth: true,
  })
}

export async function logout() {
  await apiRequest('/api/auth/logout', { method: 'POST' })
  localStorage.removeItem('accessToken')
  window.location.href = '/login'
}

export async function register({ username, password, passwordConfirm, name, phoneNumber, studentNumber, departmentId, verifiedToken, studentCardImage }) {
  const formData = new FormData()

  const requestBlob = new Blob(
    [JSON.stringify({ username, password, passwordConfirm, name, phoneNumber, studentNumber, departmentId, verifiedToken })],
    { type: 'application/json' }
  )
  formData.append('request', requestBlob)
  formData.append('studentCardImage', studentCardImage)

  return apiRequest('/api/auth/register', {
    skipAuth: true,
    method: 'POST',
    body: formData,
  })
}
