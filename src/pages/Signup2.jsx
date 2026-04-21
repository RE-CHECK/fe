import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Signup2.css'
import AlertModal from '../components/AlertModal'
import SignupSuccessModal from '../components/SignupSuccessModal'
import { checkUsername, register } from '../api/auth'

export default function Signup2() {
  const navigate = useNavigate()
  const { state: step1 } = useLocation()

  const [form, setForm] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
  })
  const [idStatus, setIdStatus] = useState(null) // null | 'available' | 'duplicate'
  const [isCheckingId, setIsCheckingId] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modal, setModal] = useState(null) // { title, desc }
  const [showSuccess, setShowSuccess] = useState(false)

  function handleUserIdChange(e) {
    setForm(f => ({ ...f, userId: e.target.value }))
    setIdStatus(null)
  }

  async function handleCheckId() {
    if (!form.userId || isCheckingId) return
    setIsCheckingId(true)
    try {
      await checkUsername(form.userId)
      setIdStatus('available')
    } catch {
      setIdStatus('duplicate')
      setModal({ title: '이미 사용 중인 아이디입니다', desc: '다른 아이디를 입력해주세요' })
    } finally {
      setIsCheckingId(false)
    }
  }

  const passwordMatch =
    form.password && form.passwordConfirm && form.password === form.passwordConfirm

  const isValid = form.userId && idStatus === 'available' && form.password && passwordMatch

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isValid || isSubmitting) return
    setIsSubmitting(true)
    try {
      await register({
        username: form.userId,
        password: form.password,
        passwordConfirm: form.passwordConfirm,
        name: step1.name,
        phoneNumber: step1.phone,
        studentNumber: Number(step1.studentId),
        departmentId: step1.departmentId,
        studentCardImage: step1.photo,
      })

      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'user_auth_success', user_id: form.userId })

      setShowSuccess(true)
    } catch (err) {
      setModal({
        title: '회원가입에 실패했습니다',
        desc: (err instanceof Error ? err.message : null) || '잠시 후 다시 시도해주세요',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="s2">

      {showSuccess && <SignupSuccessModal />}

      {modal && (
        <AlertModal
          title={modal.title}
          desc={modal.desc}
          onClose={() => setModal(null)}
        />
      )}

      {/* ── 헤더 ── */}
      <header className="s2__header">
        <button className="s2__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="s2__title">RE : AJOU CHECK</p>
        <p className="s2__subtitle">캠퍼스 챌린지</p>
        <hr className="s2__divider" />
        <p className="s2__step">2/2</p>
      </header>

      {/* ── 섹션 제목 ── */}
      <section className="s2__section-head">
        <p className="s2__section-title">참여 정보 입력</p>
        <p className="s2__section-desc">캠퍼스 챌린지를 위한 기본 정보를 입력해주세요</p>
      </section>

      {/* ── 폼 ── */}
      <form className="s2__form" onSubmit={handleSubmit}>

        {/* 아이디 */}
        <div className="s2__field">
          <label className="s2__label">아이디</label>
          <div className="s2__id-row">
            <input
              className={`s2__input s2__input--id${idStatus === 'duplicate' ? ' s2__input--error' : ''}`}
              type="text"
              value={form.userId}
              onChange={handleUserIdChange}
            />
            <button
              type="button"
              className={`s2__check-btn${idStatus === 'available' ? ' s2__check-btn--done' : ''}`}
              onClick={handleCheckId}
              disabled={isCheckingId}
            >
              {idStatus === 'available' ? '확인완료' : isCheckingId ? '확인 중...' : '중복확인'}
            </button>
          </div>
          {idStatus === 'available' && (
            <p className="s2__id-available">사용 가능한 아이디입니다</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="s2__field">
          <label className="s2__label">비밀번호</label>
          <input
            className="s2__input"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="s2__field">
          <label className="s2__label">비밀번호 확인</label>
          <input
            className={`s2__input${form.passwordConfirm && !passwordMatch ? ' s2__input--error' : ''}`}
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={form.passwordConfirm}
            onChange={e => setForm(f => ({ ...f, passwordConfirm: e.target.value }))}
          />
          {form.passwordConfirm && !passwordMatch && (
            <p className="s2__error-msg">비밀번호가 일치하지 않습니다</p>
          )}
        </div>

        {/* 완료 버튼 */}
        <button
          id="btn-signup-finish"
          type="submit"
          className={`s2__submit-btn${isValid ? ' s2__submit-btn--active' : ''}`}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? '처리 중...' : '완료'}
        </button>

      </form>
    </div>
  )
}
