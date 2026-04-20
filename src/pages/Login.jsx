import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import AlertModal from '../components/AlertModal'
import { login } from '../api/auth'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ userId: '', password: '' })
  const [showModal, setShowModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isValid = form.userId && form.password

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValid || isLoading) return

    setIsLoading(true)
    try {
      await login(form.userId, form.password)

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'user_auth_success', user_id: form.userId })

      // 관리자 계정은 /admin, 일반 유저는 /main
      if (form.userId === 'admin') {
        navigate('/admin')
      } else {
        navigate('/main')
      }
    } catch (err) {
      setErrorMsg(err.message || '아이디 또는 비밀번호를 확인해주세요')
      setShowModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login">

      {showModal && (
        <AlertModal
          title="로그인 정보가 올바르지 않습니다"
          desc={errorMsg}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ── 헤더 ── */}
      <header className="login__header">
        <button className="login__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="login__title">RE : AJOU CHECK</p>
        <p className="login__subtitle">캠퍼스 챌린지</p>
      </header>

      {/* ── 로그인 타이틀 ── */}
      <p className="login__page-title">로그인</p>

      {/* ── 폼 ── */}
      <form className="login__form" onSubmit={handleSubmit}>

        <div className="login__field">
          <label className="login__label">아이디</label>
          <input
            className="login__input"
            type="text"
            value={form.userId}
            onChange={e => setForm(f => ({ ...f, userId: e.target.value }))}
          />
        </div>

        <div className="login__field">
          <label className="login__label">비밀번호</label>
          <input
            className="login__input"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          className={`login__submit-btn${isValid ? ' login__submit-btn--active' : ''}`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? '로그인 중...' : '확인'}
        </button>

      </form>
    </div>
  )
}
