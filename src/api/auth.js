import { apiRequest } from './client'

export async function login(username, password) {
  const data = await apiRequest('/api/auth/login', {
    skipAuth: true,
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)
  return data
}

export async function checkUsername(username) {
  await apiRequest(`/api/auth/check-username?username=${encodeURIComponent(username)}`, {
    skipAuth: true,
  })
}

export async function register({ username, password, passwordConfirm, name, phoneNumber, studentNumber, departmentId, studentCardImage }) {
  const formData = new FormData()

  const requestBlob = new Blob(
    [JSON.stringify({ username, password, passwordConfirm, name, phoneNumber, studentNumber, departmentId })],
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
