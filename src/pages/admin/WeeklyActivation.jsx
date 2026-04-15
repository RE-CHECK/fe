import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../../components/ConfirmModal'
import './WeeklyActivation.css'

const WEEKS = [
  { id: 2, label: '2주차 활성화' },
  { id: 3, label: '3주차 활성화' },
]

export default function WeeklyActivation() {
  const navigate = useNavigate()
  // 현재 활성화된 주차 (null이면 전체 비활성화)
  const [activeWeek, setActiveWeek] = useState(null)
  // 모달에서 확인 대기 중인 주차
  const [pendingWeek, setPendingWeek] = useState(null)

  function handleWeekClick(weekId) {
    setPendingWeek(weekId)
  }

  function handleConfirm() {
    setActiveWeek(pendingWeek)
    setPendingWeek(null)
  }

  function handleCancel() {
    setPendingWeek(null)
  }

  function handleDeactivateAll() {
    setPendingWeek('all')
  }

  function handleConfirmAll() {
    setActiveWeek(null)
    setPendingWeek(null)
  }

  const pendingLabel = WEEKS.find(w => w.id === pendingWeek)?.label ?? ''

  return (
    <div className="weekly">

      {/* ── 확인 모달 ── */}
      {pendingWeek !== null && (
        <ConfirmModal
          message={pendingWeek === 'all' ? '전체 비활성화 하시겠습니까?' : `${pendingLabel}로 바꾸시겠습니까?`}
          onConfirm={pendingWeek === 'all' ? handleConfirmAll : handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* ── 헤더 ── */}
      <div className="weekly__header">
        <button className="weekly__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <hr className="weekly__divider" />

      {/* ── 타이틀 ── */}
      <p className="weekly__title">주차별 활성화 버튼</p>

      {/* ── 버튼 목록 ── */}
      <div className="weekly__menu">
        {WEEKS.map(({ id, label }) => (
          <button
            key={id}
            className={`weekly__btn${activeWeek === id ? ' weekly__btn--active' : ''}`}
            onClick={() => handleWeekClick(id)}
          >
            {label}
          </button>
        ))}

        <button className="weekly__btn" onClick={handleDeactivateAll}>
          전체 비활성화
        </button>
      </div>

    </div>
  )
}
