import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertModal from '../../components/AlertModal'
import { getUserStats, downloadUsersCsv } from '../../api/admin'
import './UserDashboard.css'

export default function UserDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({ todayCount: '-', totalCount: '-' })
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getUserStats()
      .then(data => setStats(data))
      .catch(e => setErrorMsg(e.message))
  }, [])

  async function handleCsvDownload() {
    try {
      await downloadUsersCsv()
    } catch (e) {
      setErrorMsg(e.message)
    }
  }

  return (
    <div className="user-dashboard">

      {errorMsg && (
        <AlertModal title="오류" desc={errorMsg} onClose={() => setErrorMsg('')} />
      )}

      {/* ── 헤더 ── */}
      <div className="user-dashboard__header">
        <button className="user-dashboard__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <hr className="user-dashboard__divider" />

      <p className="user-dashboard__title">유저 대시보드</p>

      <div className="user-dashboard__stats">

        <div className="user-dashboard__stat">
          <p className="user-dashboard__stat-label">오늘 가입자 수</p>
          <div className="user-dashboard__stat-box">
            <span className="user-dashboard__stat-value">{stats.todayCount}명</span>
          </div>
        </div>

        <div className="user-dashboard__stat">
          <p className="user-dashboard__stat-label">누적 가입자 수</p>
          <div className="user-dashboard__stat-box">
            <span className="user-dashboard__stat-value">{stats.totalCount}명</span>
          </div>
        </div>

      </div>

      <div className="user-dashboard__csv-wrap">
        <button className="user-dashboard__csv-btn" onClick={handleCsvDownload}>
          CSV 다운
        </button>
      </div>

    </div>
  )
}
