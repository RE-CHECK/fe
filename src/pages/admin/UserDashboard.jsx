import { useNavigate } from 'react-router-dom'
import './UserDashboard.css'

// TODO: API 연동 시 아래 더미 데이터를 교체하세요
const DUMMY_DATA = {
  todayCount: 23,
  totalCount: 100,
}

export default function UserDashboard() {
  const navigate = useNavigate()

  // TODO: API 연동 시 useEffect + fetch/axios로 데이터 불러오기
  const { todayCount, totalCount } = DUMMY_DATA

  function handleCsvDownload() {
    // TODO: CSV 다운로드 API 연동
  }

  return (
    <div className="user-dashboard">

      {/* ── 헤더 ── */}
      <div className="user-dashboard__header">
        <button className="user-dashboard__back" onClick={() => navigate(-1)} aria-label="뒤로가기">
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 1.5L1.5 10L9.5 18.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <hr className="user-dashboard__divider" />

      {/* ── 타이틀 ── */}
      <p className="user-dashboard__title">유저 대시보드</p>

      {/* ── 통계 영역 ── */}
      <div className="user-dashboard__stats">

        <div className="user-dashboard__stat">
          <p className="user-dashboard__stat-label">오늘 가입자 수</p>
          <div className="user-dashboard__stat-box">
            <span className="user-dashboard__stat-value">{todayCount}명</span>
          </div>
        </div>

        <div className="user-dashboard__stat">
          <p className="user-dashboard__stat-label">누적 가입자 수</p>
          <div className="user-dashboard__stat-box">
            <span className="user-dashboard__stat-value">{totalCount}명</span>
          </div>
        </div>

      </div>

      {/* ── CSV 다운로드 버튼 ── */}
      <div className="user-dashboard__csv-wrap">
        <button className="user-dashboard__csv-btn" onClick={handleCsvDownload}>
          CSV 다운
        </button>
      </div>

    </div>
  )
}
