const BASE_URL = 'https://api.reajoucheck.site'

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('accessToken')

  const headers = {
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Content-Type은 FormData일 때 브라우저가 자동 설정하도록 직접 지정하지 않음
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const json = await res.json()

  if (!json.success) {
    const err = new Error(json.message || '요청에 실패했습니다.')
    err.code = json.code
    throw err
  }

  return json.data
}
