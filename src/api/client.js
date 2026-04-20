const BASE_URL = 'https://api.reajoucheck.site'

export async function apiRequest(path, options = {}) {
  const { skipAuth = false, ...fetchOptions } = options
  const token = localStorage.getItem('accessToken')

  const headers = { ...fetchOptions.headers }

  if (token && !skipAuth) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Content-Type은 FormData일 때 브라우저가 자동 설정하도록 직접 지정하지 않음
  if (!(fetchOptions.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers,
    credentials: 'include', // httpOnly 쿠키(refreshToken) 전송
  })

  // 서버가 새 액세스 토큰을 발급한 경우 응답 헤더에서 저장
  const newToken = res.headers.get('Authorization')
  if (newToken) {
    localStorage.setItem('accessToken', newToken.replace('Bearer ', ''))
  }

  // 401: 리프레시 토큰도 만료 → 로그인 페이지로 이동
  if (res.status === 401 && !skipAuth) {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
    return
  }

  let json
  try {
    json = await res.json()
  } catch {
    throw new Error('서버 응답을 처리할 수 없습니다.')
  }

  if (!json.success) {
    const err = new Error(json.message || '요청에 실패했습니다.')
    err.code = json.code
    throw err
  }

  return json.data
}
