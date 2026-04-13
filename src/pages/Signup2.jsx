import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup2.css'
import warningIcon from '../assets/icon/warning.png'

// TODO: 실제 API 연동 시 아래 함수를 교체하세요
function checkIdDuplicate(userId) {
  const DUPLICATE_IDS = ['test', 'admin', 'user']
  return DUPLICATE_IDS.includes(userId.toLowerCase())
}

function DuplicateModal({ onClose }) {
  return (
    <div className="s2-modal-overlay" onClick={onClose}>
      <div className="s2-modal" onClick={e => e.stopPropagation()}>
        <img className="s2-modal__icon" src={warningIcon} alt="경고" />
        <p className="s2-modal__title">이미 사용 중인 아이디입니다</p>
        <p className="s2-modal__desc">다른 아이디를 입력해주세요</p>
        <button className="s2-modal__btn" onClick={onClose}>확인</button>
      </div>
    </div>
  )
}

export default function Signup2() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
  })
  const [idStatus, setIdStatus] = useState(null) // null | 'available' | 'duplicate'
  const [showModal, setShowModal] = useState(false)

  function handleUserIdChange(e) {
    setForm(f => ({ ...f, userId: e.target.value }))
    setIdStatus(null)
  }

  function handleCheckId() {
    if (!form.userId) return
    if (checkIdDuplicate(form.userId)) {
      setIdStatus('duplicate')
      setShowModal(true)
    } else {
      setIdStatus('available')
    }
  }

  const passwordMatch =
    form.password && form.passwordConfirm && form.password === form.passwordConfirm

  const isValid = form.userId && idStatus === 'available' && form.password && passwordMatch

  return (
    <div className="s2">

      {/* ── 중복 모달 ── */}
      {showModal && <DuplicateModal onClose={() => setShowModal(false)} />}

      {/* ── 헤더 ── */}
      <header className="s2__header">
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
      <form className="s2__form" onSubmit={e => e.preventDefault()}>

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
            >
              {idStatus === 'available' ? '확인완료' : '중복확인'}
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
          type="submit"
          className={`s2__submit-btn${isValid ? ' s2__submit-btn--active' : ''}`}
          disabled={!isValid}
          onClick={() => isValid && navigate('/')}
        >
          완료
        </button>

      </form>
    </div>
  )
}
