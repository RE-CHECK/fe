import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../../components/ConfirmModal'
import AlertModal from '../../components/AlertModal'
import { getCurrentWeek, activateWeek, deactivateWeek } from '../../api/weeks'
import './WeeklyActivation.css'

const WEEKS = [
  { id: 1, label: '1주차 활성화' },
  { id: 2, label: '2주차 활성화' },
  { id: 3, label: '3주차 활성화' },
]

export default function WeeklyActivation() {
  const navigate = useNavigate()
  const [activeWeek, setActiveWeek] = useState(null)
  const [pendingWeek, setPendingWeek] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getCurrentWeek()
      .then(data => setActiveWeek(data.weekNumber))
      .catch(() => {})
  }, [])

  async function handleConfirm() {
    try {
      const data = await activateWeek(pendingWeek)
      setActiveWeek(data.weekNumber)
    } catch (e) {
      setErrorMsg(e.message)
    } finally {
      setPendingWeek(null)
    }
  }

  async function handleConfirmAll() {
    try {
      const data = await deactivateWeek()
      setActiveWeek(data.weekNumber)
    } catch (e) {
      setErrorMsg(e.message)
    } finally {
      setPendingWeek(null)
    }
  }

  const pendingLabel = WEEKS.find(w => w.id === pendingWeek)?.label ?? ''

  return (
    <div className="weekly">

      {pendingWeek !== null && (
        <ConfirmModal
          message={pendingWeek === 'all' ? '전체 비활성화 하시겠습니까?' : `${pendingLabel}로 바꾸시겠습니까?`}
          onConfirm={pendingWeek === 'all' ? handleConfirmAll : handleConfirm}
          onCancel={() => setPendingWeek(null)}
        />
      )}

      {errorMsg && (
        <AlertModal title="오류" desc={errorMsg} onClose={() => setErrorMsg('')} />
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

      <p className="weekly__title">주차별 활성화 버튼</p>

      <div className="weekly__menu">
        {WEEKS.map(({ id, label }) => (
          <button
            key={id}
            className={`weekly__btn${activeWeek === id ? ' weekly__btn--active' : ''}`}
            onClick={() => setPendingWeek(id)}
          >
            {label}
          </button>
        ))}

        <button className="weekly__btn" onClick={() => setPendingWeek('all')}>
          전체 비활성화
        </button>
      </div>

    </div>
  )
}
