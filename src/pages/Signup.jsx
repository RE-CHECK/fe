import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import arrowIcon from '../assets/icon/arrow-drop-down.svg'
import { colleges, departments } from '../data/academicData'
import CameraOverlay from '../components/CameraOverlay'

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

function Dropdown({ value, onChange, options, placeholder, disabled }) {
  const [open, setOpen] = useState(false)

  function select(opt) {
    onChange(opt)
    setOpen(false)
  }

  return (
    <div className={`su-dropdown${open ? ' su-dropdown--open' : ''}${disabled ? ' su-dropdown--disabled' : ''}`}>
      <button
        type="button"
        className="su-dropdown__trigger"
        onClick={() => !disabled && setOpen(o => !o)}
      >
        <span className={value ? 'su-dropdown__value' : 'su-dropdown__placeholder'}>
          {value ? value.name : placeholder}
        </span>
        <img
          className={`su-dropdown__arrow${open ? ' su-dropdown__arrow--up' : ''}`}
          src={arrowIcon}
          alt=""
        />
      </button>
      {open && (
        <ul className="su-dropdown__list">
          {options.map(opt => (
            <li
              key={opt.id}
              className={`su-dropdown__item${value?.id === opt.id ? ' su-dropdown__item--selected' : ''}`}
              onClick={() => select(opt)}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    phone: '',
    name: '',
    studentId: '',
    college: null,
    department: null,
    photo: null,
    agreed: false,
  })
  const fileInputRef = useRef(null)
  const [showCamera, setShowCamera] = useState(false)

  const filteredDepts = form.college
    ? departments.filter(d => d.collegeId === form.college.id)
    : []

  function handleCollegeChange(college) {
    setForm(f => ({ ...f, college, department: null }))
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0]
    if (file) setForm(f => ({ ...f, photo: file }))
  }

  function handleUploadClick() {
    if (navigator.mediaDevices?.getUserMedia) {
      setShowCamera(true)
    } else {
      fileInputRef.current.click()
    }
  }

  function handleCameraCapture(file) {
    setForm(f => ({ ...f, photo: file }))
    setShowCamera(false)
  }

  function handleGallery() {
    setShowCamera(false)
    setTimeout(() => fileInputRef.current.click(), 100)
  }

  const isValid =
    form.phone &&
    form.name &&
    form.studentId &&
    form.college &&
    form.department &&
    form.agreed

  function handleNext() {
    if (!isValid) return
    navigate('/signup2', {
      state: {
        phone: form.phone,
        name: form.name,
        studentId: form.studentId,
        departmentId: form.department.id,
        photo: form.photo,
      },
    })
  }

  return (
    <div className="signup">
      {showCamera && (
        <CameraOverlay
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
          onGallery={handleGallery}
        />
      )}

      {/* ── 헤더 ── */}
      <header className="signup__header">
        <button className="signup__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="signup__title">RE : AJOU CHECK</p>
        <p className="signup__subtitle">캠퍼스 챌린지</p>
        <hr className="signup__divider" />
        <p className="signup__step">1/2</p>
      </header>

      {/* ── 섹션 제목 ── */}
      <section className="signup__section-head">
        <p className="signup__section-title">참여 정보 입력</p>
        <p className="signup__section-desc">캠퍼스 챌린지를 위한 기본 정보를 입력해주세요</p>
      </section>

      {/* ── 폼 ── */}
      <form className="signup__form" onSubmit={e => e.preventDefault()}>

        {/* 전화번호 */}
        <div className="signup__field">
          <label className="signup__label">전화번호</label>
          <input
            className="signup__input"
            type="tel"
            placeholder="010-1234-5678"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: formatPhone(e.target.value) }))}
          />
        </div>

        {/* 이름 */}
        <div className="signup__field">
          <label className="signup__label">이름</label>
          <input
            className="signup__input"
            type="text"
            placeholder="김아주"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          />
        </div>

        {/* 학번 */}
        <div className="signup__field">
          <label className="signup__label">학번</label>
          <input
            className="signup__input"
            type="text"
            placeholder="202312345"
            value={form.studentId}
            onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))}
          />
        </div>

        {/* 소속 단과대 */}
        <div className="signup__field">
          <label className="signup__label">소속 단과대</label>
          <Dropdown
            value={form.college}
            onChange={handleCollegeChange}
            options={colleges}
            placeholder="단과대를 선택하세요"
          />
        </div>

        {/* 소속 학과 */}
        <div className="signup__field">
          <label className="signup__label">소속 학과</label>
          <Dropdown
            value={form.department}
            onChange={dept => setForm(f => ({ ...f, department: dept }))}
            options={filteredDepts}
            placeholder="소속 학과를 선택하세요"
            disabled={!form.college}
          />
        </div>

        {/* 학생증 사진 등록 */}
        <div className="signup__field">
          <label className="signup__label">학생증 사진 등록</label>
          <p className="signup__field-desc">모바일 학생증 혹은 실물 학생증 사진을 업로드 해주세요</p>
          <button
            type="button"
            className="signup__upload-btn"
            onClick={handleUploadClick}
          >
            {form.photo ? form.photo.name : '사진 등록하기'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
        </div>

        {/* 개인정보 동의 */}
        <div
          className={`signup__consent${form.agreed ? ' signup__consent--checked' : ''}`}
          onClick={() => setForm(f => ({ ...f, agreed: !f.agreed }))}
        >
          <div className="signup__consent-check">
            {form.agreed && <span className="signup__consent-checkmark">✓</span>}
          </div>
          <div className="signup__consent-text">
            <p className="signup__consent-title">개인정보 비식별 처리 안내에 동의합니다</p>
            <p className="signup__consent-desc">
              입력된 정보는 통계 목적으로만 사용되며,{'\n'}
              개인을 식별할 수 없도록 처리됩니다.
            </p>
          </div>
        </div>

        {/* 다음 버튼 */}
        <button
          id="btn-signup-step1"
          type="button"
          className={`signup__next-btn${isValid ? ' signup__next-btn--active' : ''}`}
          disabled={!isValid}
          onClick={handleNext}
        >
          다음
        </button>

      </form>
    </div>
  )
}
