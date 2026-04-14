import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import AlertModal from '../components/AlertModal'

// TODO: 실제 API 연동 시 교체하세요
function verifyLogin(userId, password) {
  return userId === 'wndyd2425' && password === '1234' // 사용자 정보 하드 코딩 
}

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ userId: '', password: '' })
  const [showModal, setShowModal] = useState(false)

  const isValid = form.userId && form.password

  function handleSubmit(e) {
    e.preventDefault()
    if (!isValid) return
    if (verifyLogin(form.userId, form.password)) {
      navigate('/main')
    } else {
      setShowModal(true)
    }
  }

  return (
    <div className="login">

      {showModal && (
        <AlertModal
          title="로그인 정보가 올바르지 않습니다"
          desc="아이디 또는 비밀번호를 확인해주세요"
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ── 헤더 ── */}
      <header className="login__header">
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
          disabled={!isValid}
        >
          확인
        </button>

      </form>
    </div>
  )
}
